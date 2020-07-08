import { IPv8, OpenWallet, Recipe } from "@tsow/ow-ssi";
import axios from "axios";
import { ServiceList } from "../hooks/useServices";
import { AccessModuleService } from "./access-module/AccessModuleService";
import { AccessModuleState } from "./access-module/State";
import { ContactService } from "./ContactService";
import { LocalAPI } from "./local/LocalAPI";
import { LocalState } from "./local/LocalState";
import { OpenWalletService } from "./OpenWalletService";
import { PromptService } from "./PromptService";
import { ProviderService } from "./ProviderService";
import { ReferenceService } from "./ReferenceService";

export type PeerCallback = (memberId: string) => any;

/** Wrapper for all services */
export class Wallet {

    agent: OpenWallet.OWAgent;

    prompt: PromptService;
    localhostBase: string;
    localAPI: LocalAPI;
    localState: LocalState;
    accessState: AccessModuleState;
    ipv8Service: IPv8.IPv8Service;
    callbackService: ReferenceService<PeerCallback>;
    contactService: ContactService;

    providersService?: ProviderService;
    owService?: OpenWalletService;
    accessModuleService?: AccessModuleService;

    constructor(protected port: number) {

        this.localhostBase = `http://localhost:${port}`;

        const localhost = axios.create({
            baseURL: this.localhostBase,
        });

        const pollIntervalInMillis = 2000;
        this.prompt = new PromptService();
        this.agent = new OpenWallet.OWAgent(this.localhostBase, pollIntervalInMillis)
        this.localAPI = new LocalAPI(localhost);
        this.localState = new LocalState(this.localAPI);
        this.accessState = new AccessModuleState(this.localState);
        this.ipv8Service = this.agent.service;
        this.callbackService = new ReferenceService<PeerCallback>({ destroyWhenNoReferences: true, millisToExpire: 10 * 60 * 1000 });
        this.contactService = new ContactService(this.localState);


        this.agent.verifyRequestHandler = (s, r) => {
            return this.prompt.prompt({ type: "Share", text: "Someone is asking you to share" })
                .then((ok) => ok ? r.response! : false)
        }

        this.agent.attestOfferHandler = async (s) => {
            if (s.offer.overlay === "AccessModule") {
                const ok = await this.accessModuleService!.handleOffer(s.offer);
                console.log("Prompt returned", ok)
                return ok;
            } else {
                console.log("Rejecting because..", s);
                this.prompt.prompt({ type: "Warn", text: "Unknown attest offer came in" })
                return false;
            }
        }
    }

    async initServices(): Promise<ServiceList> {
        const secondsToWaitForPeers = 20;
        await this.agent.start(secondsToWaitForPeers * 1000);

        const mid = this.agent.mid;

        this.providersService = new ProviderService(this.localState);

        const recipeClient = new Recipe.RecipeClient(mid, this.agent.verifiee, this.agent.attestee);

        this.owService = new OpenWalletService(
            this.providersService,
            this.localState,
            this.ipv8Service,
            recipeClient);

        this.accessModuleService = new AccessModuleService(this.agent, this.contactService, this.prompt, this.accessState);
        this.agent.dispatch.addHandler((m: any) => this.accessModuleService!.handleMessage(m))

        return {
            localAPI: this.localAPI,
            localState: this.localState,
            ipv8Service: this.ipv8Service,
            contactService: this.contactService,
            callbackService: this.callbackService,
            providersService: this.providersService,
            owService: this.owService,
            accessModuleService: this.accessModuleService,
        };

    }
}
