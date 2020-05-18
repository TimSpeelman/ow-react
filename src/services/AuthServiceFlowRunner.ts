import { OWVerifiee, OWVerifyRequest } from "@tsow/ow-ssi/dist/types/modules/browser/ow";
import { Hook } from "../util/Hook";

export enum Step { INIT, CONFIRM, DONE };
export enum Status { PENDING, COMPLETE, ABORTED, FAILED };

export class AuthServiceFlowRunner {
    public step: Step = Step.INIT;
    public status: Status = Status.PENDING;
    public hookStep: Hook<Step> = new Hook();
    public hookUserConsentToVerify: Hook<boolean> = new Hook();
    public hookStatus: Hook<Status> = new Hook();

    public request: OWVerifyRequest | undefined;

    public message: string = "";

    constructor(
        private owVerifiee: OWVerifiee,
    ) { }

    userStartsRequest(verifyRequest: OWVerifyRequest) {
        this.request = verifyRequest;
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
        this.owVerifiee.allowVerification(
            this.request!,
            Date.now() + 10000,
            // { maxAgeInSeconds: 3600 * 24 * 365 }
        ).then((result) => {
            this.showMessage("Allowed..");
            this.done();
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
