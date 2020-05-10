import { IPv8 } from "@tsow/ow-ssi";
import { OpenWalletService } from "../shared/openwallet.service";
import { Hook } from "../shared/util/Hook";
import { VerificationOffer } from "./QRService";

export enum Step { INIT, CONFIRM, DONE };
export enum Status { PENDING, COMPLETE, ABORTED, FAILED };

export class CredentialVerifyFlowRunner {
    public step: Step = Step.INIT;
    public status: Status = Status.PENDING;
    public hookStep: Hook<Step> = new Hook();
    // public hookUserConsentToVerify: Hook<boolean> = new Hook();
    public hookStatus: Hook<Status> = new Hook();
    public offer: VerificationOffer | undefined;

    public message: string = "";

    constructor(
        private walletService: OpenWalletService,
        private verifierService: IPv8.VerifierService,
    ) { }

    userStartsRequest(verifyOffer: VerificationOffer) {
        this.offer = verifyOffer;
        this.setStep(Step.CONFIRM);
    }

    userConsentsToVerify(consent: boolean) {
        if (consent) {
            this.executeProcedure();
        } else {
            this.abortProcedure();
        }
    }

    protected async executeProcedure() {
        // setTimeout(() => this.showVerificationResult(), 1000);
        this.verifierService.verify(
            this.offer!.mid,
            [{
                attribute_hash: this.offer!.attribute_hash,
                attribute_value: this.offer!.attribute_value,
                attribute_name: this.offer!.attribute_name,
            }],
            // { maxAgeInSeconds: 3600 * 24 * 365 }
        ).then((result) => {
            this.showVerificationResult(result);
        })
    }

    protected showVerificationResult(result: boolean) {
        this.showMessage("The result was: " + (result ? "verified!" : "unverified.."));
        this.done();
    }

    protected done() {
        this.setStep(Step.DONE);
    }

    protected abortProcedure() {
        this.showMessage("We have not verified the credential.");
        this.setStatus(Status.ABORTED);
        this.setStep(Step.DONE);
    }

    protected showMessage(msg: string) {
        this.message = msg;
    }

    protected setStep(step: Step) {
        this.step = step;
        this.hookStep.fire(step);
    }

    protected setStatus(status: Status) {
        this.status = status;
        this.hookStatus.fire(status);
    }

}
