import { OpenWallet } from "@tsow/ow-ssi";
import { OWAttestOffer } from "@tsow/ow-ssi/dist/types/modules/browser/ow";
import { OWMessage } from "@tsow/ow-ssi/dist/types/src/ow/api/OWAPI";
import { OWVerification } from "@tsow/ow-ssi/dist/types/src/ow/protocol/OWVerification";
import uuid from "uuid/v4";
import { ContactService } from "../ContactService";
import { PromptService } from "../PromptService";
import { AccessModuleState, IMyLocation, ITrustedLocation } from "./State";

export class AccessModuleService {

    public pendingVerification = null;

    constructor(
        protected agent: OpenWallet.OWAgent,
        protected contactService: ContactService,
        protected prompt: PromptService,
        protected state: AccessModuleState) { }

    handleMessage(message: OWMessage) {
        try {
            const { overlay, type, location } = JSON.parse(message.message);
            if (overlay === "AccessModule" && type === "ShareLocation") {
                const mid = message.sender_mid_b64;
                const contact = this.contactService.findByMid(mid);
                const contactName = contact ? contact.name : `Anonymous<${mid.substr(0, 5)}>`;
                this.prompt.prompt({
                    // @ts-ignore
                    type: "AccessModule:ShareLocation",
                    text: `${contactName} claims he controls location '${location.name}'. Do you trust this?`
                }).then((ok) => {
                    if (ok) this.addTrustedLocation(location)
                })
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    shareLocation(locId: string, mid: string) {
        const loc = this.state.state.mySites.find(l => l.id === locId);
        return this.agent.api.sendMessage(mid, JSON.stringify({
            overlay: "AccessModule",
            type: "ShareLocation",
            location: {
                id: loc?.id,
                name: loc?.name,
                rootMid: this.agent.mid,
            }
        }))
    }

    addLocation(loc: IMyLocation) {
        const s = this.state.state;
        this.state.store({
            mySites: [...s.mySites, loc]
        })
    }

    addTrustedLocation(loc: ITrustedLocation) {
        const s = this.state.state;
        this.state.store({
            trustedSites: [...s.trustedSites, loc]
        })
    }

    deleteLocation(locId: string) {
        const s = this.state.state;
        this.state.store({
            mySites: s.mySites.filter(l => l.id !== locId)
        })
    }

    async verifyAccess(peerId: string, locId: string): Promise<AMVerifyResult> {
        const req: OpenWallet.OWVerifyRequest = {
            ref: uuid(),
            type: "OWVerifyRequest",
            attributes: [
                {
                    format: "id_metadata",
                    name: "access.loc:" + locId,
                    ref: "access_grant",
                    include_value: true,
                }
            ],
            verifier_id: this.agent.mid,
            subject_id: peerId,
            overlay: "AccessModule",
        }

        const location = this.getLocationById(locId);

        if (!location) {
            throw new Error(`Location with id '${locId}' unknown.`)
        }

        const acceptedMid = "grants" in location ? this.agent.mid : location.rootMid;
        const session = await this.agent.ver.verify(req);

        const result: any = session.result // FIXME

        return {
            session,
            success: session.isVerified,
            correctSigner: result.success && result.results[0].attestation.signer_mid_b64 === acceptedMid,
        }
    }

    async handleOffer(offer: OWAttestOffer): Promise<boolean> {
        const loc = offer.metadata.location;
        if (!loc) {
            throw new Error("Expected OWAttestOffer to carry location");
        } else {
            // @ts-ignore
            const consent: boolean = await this.prompt.prompt({
                text: `Someone offers you access to location "${loc.name}". Do you accept?`,
                type: 'AttestOffer',
            })

            const trustedLoc: ITrustedLocation = {
                id: loc.id,
                name: loc.name,
                rootMid: offer.attester_id,
            }
            this.addTrustedLocation(trustedLoc);
            return consent;
        }
    }

    getLocationById(id: string): IMyLocation | ITrustedLocation | undefined {
        return this.state.state.mySites.find(l => l.id === id) ||
            this.state.state.trustedSites.find(l => l.id === id)
    }

    async grantAccess(peerId: string, locId: string): Promise<boolean> {
        const location = this.getLocationById(locId);

        if (!location) {
            throw new Error(`Location with id '${locId}' unknown.`)
        }

        const offer: OpenWallet.OWAttestOffer = {
            ref: uuid(),
            type: "OWAttestOffer",
            overlay: "AccessModule",
            attributes: [
                {
                    format: "id_metadata",
                    name: "access.loc:" + locId,
                    ref: "access_grant",
                    value: "grant",
                }
            ],
            attester_id: this.agent.mid,
            subject_id: peerId,
            expiresAtTimeInMillis: Date.now() + 10000, // FIXME
            // @ts-ignore FIXME
            metadata: {
                location: {
                    id: locId,
                    name: location.name,
                }
            }
        }


        const session = await this.agent.ter.attest(offer);

        return session.isAttested;
    }

}

interface AMVerifyResult {
    session: OWVerification;
    success: boolean;
    correctSigner: boolean;
}
