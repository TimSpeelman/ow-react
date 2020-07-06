import { Wallet } from "../src/services/Wallet";
import { describe, expect, it } from "./setup";

const backendPort = 10001;
const recipeServerPort = 9100;

// THIS REQUIRES EXTERNAL SETUP (FIXME):
// - ow-ssi must run the BRP example server.
describe("Headless test", function () {


    it("can get attestations from a recipe", async () => {
        const wallet = new Wallet(backendPort);
        const services = await wallet.initServices();

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

});


