import { IPv8, OpenWallet, Recipe } from "@tsow/ow-ssi";
import { IPv8Service } from "@tsow/ow-ssi/dist/types/modules/browser/ipv8";
import axios from "axios";
import { AccessModuleService } from "./access-module/AccessModuleService";
import { AccessModuleState } from "./access-module/State";
import { AttributesService } from "./AttributeService";
import { LocalAPI } from "./local/LocalAPI";
import { LocalState } from "./local/LocalState";
import { OpenWalletService } from "./OpenWalletService";
import { ProviderService } from "./ProviderService";
import { ReferenceService } from "./ReferenceService";

export type PeerCallback = (memberId: string) => any;

/** Wrapper for all services */
export class Wallet {

    localhostBase: string;
    localAPI: LocalAPI;
    localState: LocalState;
    accessState: AccessModuleState;
    attributeService: AttributesService;
    ipv8Service: IPv8Service;
    callbackService: ReferenceService<PeerCallback>;

    providersService?: ProviderService;
    owService?: OpenWalletService;
    accessModuleService?: AccessModuleService;

    constructor(protected port: number) {

        this.localhostBase = `http://localhost:${port}`;

        const localhost = axios.create({
            baseURL: this.localhostBase,
        });

        this.localAPI = new LocalAPI(localhost);
        this.localState = new LocalState(this.localAPI);
        this.accessState = new AccessModuleState(this.localState);

        this.attributeService = new AttributesService(this.localState);

        this.ipv8Service = new IPv8.IPv8Service(this.localhostBase, 1000);
        this.ipv8Service.start();

        this.callbackService = new ReferenceService<PeerCallback>({ destroyWhenNoReferences: true, millisToExpire: 20000 });

    }

    async initServices() {
        const mid = await this.ipv8Service.api.getMyId();
        console.log("TCL: mid", mid);
        this.providersService = new ProviderService(this.localState);
        const owVerifiee = new OpenWallet.OWVerifiee(this.ipv8Service.verifieeService);
        const owAttestee = new OpenWallet.OWAttestee(this.ipv8Service.attesteeService);
        const recipeClient = new Recipe.RecipeClient(mid, owVerifiee, owAttestee);
        this.owService = new OpenWalletService(
            this.providersService,
            this.localState,
            this.ipv8Service,
            recipeClient);
        this.accessModuleService = new AccessModuleService(this.accessState);
        return {
            localAPI: this.localAPI,
            localState: this.localState,
            ipv8Service: this.ipv8Service,
            attributeService: this.attributeService,
            callbackService: this.callbackService,
            providersService: this.providersService,
            owService: this.owService,
            accessModuleService: this.accessModuleService,
        };

    }
}
