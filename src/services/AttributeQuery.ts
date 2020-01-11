import { IPv8API } from "@tsow/ow-attest";
import _ from "lodash";
import { AppState } from "../shared/AppStateService";
import { LocalAttr } from "../types/types";

export interface IAttributeQuery {

    /** 
     * List all attributes stored inside this Wallet. This is a combination
     * of the attestations stored on chain and the attribute values stored
     * locally.
     */
    listAttributes(): Promise<LocalAttr[]>

}

export class AttributeQuery implements IAttributeQuery {

    constructor(
        private ipv8API: IPv8API,
        private state: AppState
    ) { }

    async listAttributes(): Promise<LocalAttr[]> {

        try {
            const attestationsByHash = await this.ipv8API.listAttestations().then(a => _.keyBy(a, "attribute_hash"));
            const attributes = await this.state.getState().attributes;

            const providers = await this.state.getState().providers;
            const getProvider = (mid: string) => Object.values(providers).find(p => p.mid_b64 === mid)!;

            return attributes.filter(a => a.hash in attestationsByHash)
                .map(a => ({
                    name: a.name,
                    value: a.value,
                    hash: a.hash,
                    metadata: attestationsByHash[a.hash].metadata,
                    signer_mid_b64: attestationsByHash[a.hash].signer_mid_64,
                    time: a.time,
                    title: a.title,
                    type: a.type,
                    provider_title: a.provider_title,
                    provider: getProvider(attestationsByHash[a.hash].signer_mid_64)
                }));

        } catch (e) {
            console.error("Could not connect to services.");
            return [];
        }

    }
}
