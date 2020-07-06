import { IPv8, OpenWallet, Recipe } from "@tsow/ow-ssi";
import Axios from "axios";
import { Dict } from "../types/Dict";
import { LocalAttribute } from "../types/State";
import { LocalState } from "./local/LocalState";
import { ProviderService } from './ProviderService';

export class OpenWalletService {

    constructor(
        private providersService: ProviderService,
        private localState: LocalState,
        private ipv8: IPv8.IPv8Service,
        private recipeClient: Recipe.RecipeClient) {

    }

    /**
     * The Agent will request attributes according to a Procedure specified
     * by a Provider. The End User has approved sharing of the required data
     * if any. 
     * 
     * @param providerId 
     * @param procedureId 
     * @param onConsentStore 
     */
    async requestOWAttestSharingApproved(
        providerId: string,
        procedureId: string,
        onConsentStore: (data: OfferedAttribute[]) => Promise<boolean>
    ): Promise<LocalAttribute[]> {

        const provider = this.providersService.providers[providerId];
        const recipe = provider.recipes[procedureId];
        const requirements = (recipe.verify_request?.attributes || []).map(a => a.name);

        // Resolution TODO update
        const dataToShare: Dict<string> = this.localState.attributes
            .filter((a) => requirements.indexOf(a.name) >= 0)
            .reduce((c, a) => ({ ...c, [a.name]: a.value }), {});

        let vResp: OpenWallet.OWVerifyResponse;

        const process = this.recipeClient.createProcess(recipe);

        const myAtts = await this.ipv8.api.listAttestations();

        if (recipe.verify_request) {
            vResp = {
                type: "OWVerifyResponse",
                attributes: recipe.verify_request?.attributes.map((a, i) => ({
                    hash: myAtts.find(x => x.attribute_name === a.name)?.attribute_hash || "",
                    ref: a.name,
                    value: dataToShare[a.name],
                })),
                request_hash: "",
                // @ts-ignore
                subject_id: this.recipeClient.myId, // FIXME
            }
            process.allowVerification(vResp);
        }

        const recipeRequest = process.createRequest(vResp!);

        const httpResponse = await Axios.post(recipe.service_endpoint, { request: recipeRequest });
        const offer: OpenWallet.OWAttestOffer = httpResponse.data.offer;

        const data = offer.attributes.map(a => ({
            name: a.name,
            value: a.value,
            title: recipe.attributes.find(x => x.name === a.name)?.title || {},
            signer_mid_b64: offer.attester_id,
        }))

        if (!process.validateOffer(offer)) {
            console.warn("Server offer did not pass validation");
            return [];
        }

        const consent = await onConsentStore(data);

        if (!consent) {
            return [];
        }

        const attributes = await process.requestAttestation(offer);

        console.log('Received result', attributes);

        if (!attributes) {
            return [];
        }

        return attributes.map((attr): LocalAttribute => {
            const attrDesc = recipe.attributes.find((a: any) => a.name === attr.name);

            if (attr && attrDesc) {
                return {
                    name: attr.name,
                    value: attr.value,
                    hash: attr.hash,
                    time: Date.now(), // FIXME should come from client
                    provider_title: provider.title,
                    title: attrDesc.title,
                    type: attrDesc.format,
                    metadata: attr.metadata,
                    signer_mid_b64: attr.signer_mid_b64,
                };
            } else {
                throw new Error("Attestation or procedure not found"); // FIXME
            }
        });
    }
}

export interface OfferedAttribute {
    name: string;
    value: string;
    title: Dict<string>;
    signer_mid_b64: string;
}
