import { OWAttestOffer } from "@tsow/ow-ssi/dist/types/modules/browser/ow";
import uuid from "uuid/v4";
import { Wallet } from "../src/services/Wallet";
import { describe, expect, it } from "./setup";

const alicePort = 10001;
const bobPort = 10002;
const recipeServerPort = 9100;

// THIS REQUIRES EXTERNAL SETUP (FIXME):
// - ow-ssi must run the BRP example server.
describe("Headless test", function () {


    it("can get attestations from a recipe", async () => {
        const walletAlice = new Wallet(alicePort);
        const services = await walletAlice.initServices();

        // Load the recipes
        const recipeServerUrl = `http://localhost:${recipeServerPort}`;
        await services.providersService.addByURL(recipeServerUrl);

        const providerId = "brp";
        const procedureId = "p_bsn";
        const onConsentStore = () => Promise.resolve(true);

        const x = await services.owService.requestOWAttestSharingApproved(providerId, procedureId, onConsentStore);

        expect(x).to.have.length(1);
        expect(x[0].name).to.equal("bsn");
    })

    it("can verify someone's access", async () => {
        const walletAlice = new Wallet(alicePort);
        const servicesAlice = await walletAlice.initServices();
        const sessionId = uuid();

        const locationId = `someloc(${sessionId})`;
        const attributeName = "access.loc:" + locationId;

        // Alice accepts
        walletAlice.agent.verifyRequestHandler = async (session, result) => {
            if (session.request.attributes.find(a => a.name === attributeName)) {

                expect(result.status).to.equal("success");

                // And accepts the request with that response.
                return result.response!;
            } else {
                console.log(`Skipping session ${session.request.ref}`)
                return false;
            }
        }

        const walletBob = new Wallet(bobPort);
        const servicesBob = await walletBob.initServices();

        // Bob must first store the location
        await walletBob.accessModuleService!.addLocation({
            id: locationId,
            name: "Testlocation",
            grants: [],
            rootMid: walletBob.agent.mid
        })

        const offer: OWAttestOffer = {
            attester_id: walletBob.agent.mid,
            subject_id: walletAlice.agent.mid,
            attributes: [
                { format: "id_metadata", name: attributeName, value: "grant" }
            ],
            expiresAtTimeInMillis: Date.now() + 10000
        }

        const [atts, _] = await Promise.all([
            walletAlice.agent.attestee.requestAttestationByOffer(offer),
            walletBob.agent.attester.attestByOffer(offer),
        ]);

        console.log("Attestation complete");

        await Promise.all(atts.map(a => walletAlice.agent.repo.put(a)));

        console.log("Attributes stored");

        const result = await walletBob.accessModuleService!.verifyAccess(walletAlice.agent.mid, locationId);

        expect(result).to.have.property("success", true);
        expect(result).to.have.property("correctSigner", true);
    })

});


