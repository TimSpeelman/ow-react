import { AttestationClient, ClientProcedure } from '@tsow/ow-attest';
import { LocalState } from "../services/local/LocalState";
import { ProviderService } from '../services/ProviderService';
import { Dict } from "../types/Dict";
import { LocalAttribute } from "../types/State";
import { AttributeNV } from './types';

export class OpenWalletService {

    constructor(
        private providersService: ProviderService,
        private localState: LocalState,
        private owClient: AttestationClient) {

        this.setupVerification();
    }

    async setupVerification() {
        const client = this.owClient;
        const verif = client.verifieeService;
        verif.onNonStagedRequest(function (...args) {
            console.log('Non staged request', args);
            return Promise.resolve(true);
        });
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
        const procedure = provider.procedures[procedureId];
        const requirements = procedure.requirements;

        const dataToShare = this.localState.attributes
            .filter((a) => requirements.indexOf(a.name) >= 0)
            .reduce((c, a) => ({ ...c, [a.name]: a.value }), {});

        const clientProcedure: ClientProcedure = {
            desc: procedure,
            server: {
                http_address: provider.url,
                mid_b64: provider.mid_b64,
            }
        };

        console.log('Initiating Procedure', clientProcedure);
        console.log('With credentials', dataToShare);

        const _consentStore = (atts: AttributeNV[]) => onConsentStore(atts.map((a): OfferedAttribute => ({
            name: a.attribute_name,
            value: a.attribute_value,
            title: (procedure.attributes.find(x => x.name === a.attribute_name) || {}).title || {},
            signer_mid_b64: provider.mid_b64,
        })))
        const result = await this.owClient.execute(clientProcedure, dataToShare, _consentStore);

        console.log('Received result', result);

        if (!result) {
            return [];
        }

        const { data, attestations } = result;

        return data.map((attr): LocalAttribute => {
            const attestation = attestations.find(a => a.attribute_name === attr.attribute_name);
            const attrDesc = procedure.attributes.find((a: any) => a.name === attr.attribute_name);

            if (attestation && attrDesc) {
                return {
                    name: attr.attribute_name,
                    value: attr.attribute_value,
                    hash: attestation.attribute_hash,
                    time: Date.now(), // FIXME should come from client
                    provider_title: provider.title,
                    title: attrDesc.title,
                    type: attrDesc.type,
                    metadata: attestation.metadata,
                    signer_mid_b64: attestation.signer_mid_64,
                };
            } else {
                throw new Error("Attestation or procedure not found"); // FIXME
            }
        });
    }
}



export interface AttestationRequest {
    provider: string;
    option: string;
}

export interface AttestationResult {
    attributes: AttributeNV[];
    provider: string;
    reason: string;
}

export interface AttestationData {
    provider: string;
    attribute_name: string;
    attribute_value: string;
    attest_sig_b64: string;
    server_addr: [string, number];
}

export interface Mid {
    mid_b64: string;
}

export interface OfferedAttribute {
    name: string;
    value: string;
    title: Dict<string>;
    signer_mid_b64: string;
}
