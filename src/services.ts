import { AttestationClientFactory, IPv8API } from "@tsow/ow-attest";
import axios from "axios";
import { AttributeQuery } from "./services/AttributeQuery";
import { AttributesService } from "./services/AttributeService";
import { LocalAPI } from "./services/local/LocalAPI";
import { LocalState } from "./services/local/LocalState";
import { ProviderService } from "./services/ProviderService";
import { ReferenceService } from "./services/ReferenceService";
import { OpenWalletService } from "./shared/openwallet.service";
import { AttributeShareRequest } from "./shared/tasks.service";
import { Dict } from "./types/Dict";

const localhostBase = 'http://localhost:8124';

const localhost = axios.create({
    baseURL: localhostBase + '/api',
});

export const localAPI = new LocalAPI(localhost);
export const localState = new LocalState(localAPI);

export const ipv8API = new IPv8API(localhostBase);
export const attributeService = new AttributesService(localState);
export const attributeQuery = new AttributeQuery(ipv8API, localState);


export const callbackService = new ReferenceService<PeerCallback>({ destroyWhenNoReferences: true, millisToExpire: 20000 });
export type PeerCallback = (memberId: string) => any;

// @ts-ignore
window.peercalls = (memberId: string, refId: string) => {
    const handle = callbackService.resolveReference({ id: refId });
    if (handle) {
        console.log("Peer called. Handle found!");
        handle.value(memberId);
    } else {
        console.log("Peer called. Could not find handle..");
    }
}

export let providersService: ProviderService | null = null;
export let owService: OpenWalletService | null = null;

localAPI.getMyMID().then(mid => {
    console.log("TCL: mid", mid)

    const config = { ipv8_url: 'http://localhost:8124', mid_b64: mid, };
    const factory = new AttestationClientFactory(config);
    const owClient = factory.create();
    providersService = new ProviderService(localState, owClient);
    owService = new OpenWalletService(providersService, localState, owClient);
});

export const reqs: Dict<AttributeShareRequest> = {};
