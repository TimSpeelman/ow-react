import { IPv8, OpenWallet, Recipe } from "@tsow/ow-ssi";
import axios from "axios";
import Cookies from "universal-cookie";
import { ServiceList } from "../hooks/useServices";
import { Dict } from "../types/Dict";
import { AttributeShareRequest } from "../types/types";
import { AttributesService } from "./AttributeService";
import { LocalAPI } from "./local/LocalAPI";
import { LocalState } from "./local/LocalState";
import { OpenWalletService } from "./OpenWalletService";
import { ProviderService } from "./ProviderService";
import { ReferenceService } from "./ReferenceService";


const portFromUrl = window.location.hash.match(/port=([0-9]+)/);

const cookie = new Cookies();
const port = (portFromUrl ? portFromUrl[1] : null) || cookie.get("port") || "8642";
cookie.set("port", port);

export const localhostBase = `http://localhost:${port}`;

const localhost = axios.create({
    baseURL: localhostBase,
});

export const localAPI = new LocalAPI(localhost);
export const localState = new LocalState(localAPI);

export const attributeService = new AttributesService(localState);

export const ipv8Service = new IPv8.IPv8Service(localhostBase, 1000);
ipv8Service.start();

export const callbackService = new ReferenceService<PeerCallback>({ destroyWhenNoReferences: true, millisToExpire: 20000 });
export type PeerCallback = (memberId: string) => any;

// @ts-ignore
window.peercalls = (memberId: string, refId: string) => {
    const handle = callbackService.resolveReference({ id: refId });
    if (handle) {
        console.log(`Peer '${memberId}' called. Handle found!`);
        handle.value(memberId);
    } else {
        console.log(`Peer '${memberId}' called. Could not find handle..`);
    }
}

export let providersService: ProviderService | null = null;
export let owService: OpenWalletService | null = null;

export const initServices = () => ipv8Service.api.getMyId().then((mid): ServiceList => {
    console.log("TCL: mid", mid)

    providersService = new ProviderService(localState);
    const owVerifiee = new OpenWallet.OWVerifiee(ipv8Service.verifieeService);
    const owAttestee = new OpenWallet.OWAttestee(ipv8Service.attesteeService);
    const recipeClient = new Recipe.RecipeClient(mid, owVerifiee, owAttestee);
    owService = new OpenWalletService(
        providersService,
        localState,
        ipv8Service,
        recipeClient,
    );

    return {
        localAPI,
        localState,
        ipv8Service,
        attributeService,
        callbackService,
        providersService,
        owService,
    }
});

export const reqs: Dict<AttributeShareRequest> = {};
