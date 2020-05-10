import { Recipe } from "@tsow/ow-ssi";
import { OpenWalletService } from "../shared/openwallet.service";
import { AttributeReceiveRequest, AttributeShareRequest } from "../shared/types";
import { Hook } from "../shared/util/Hook";
import { AttributesService } from "./AttributeService";
import { ProviderService } from "./ProviderService";

export enum Step { INIT, SHARE, RECEIVE, DONE };
export enum Status { PENDING, COMPLETE, ABORTED, FAILED };

export class RequestProcedureFlowRunner {
    public step: Step = Step.INIT;
    public status: Status = Status.PENDING;
    public hookStep: Hook<Step> = new Hook();
    public hookUserConsentToReceive: Hook<boolean> = new Hook();
    public hookStatus: Hook<Status> = new Hook();

    private providerKey?: string;
    private procedureKey?: string;

    public message: string = "";

    constructor(
        private providersService: ProviderService,
        private walletService: OpenWalletService,
        private attributeService: AttributesService,
    ) { }

    get provider(): Recipe.RecipeServiceDescriptor | null {
        return this.providerKey ? this.providersService.providers[this.providerKey] : null;
    }

    get procedure() {
        return this.provider && this.procedureKey &&
            this.provider.recipes[this.procedureKey];
    }

    get requirements() {
        return this.procedure && (this.procedure.verify_request?.attributes || [])
            .map(a => a.name);
    }

    get shareRequest(): AttributeShareRequest | null {
        if (!this.requirements) return null;
        return {
            attributeNames: this.requirements,
            done: () => { },
            id: "",
            reason: "Some reason",
            receiver: this.provider!.mid_b64,
        }
    }

    public receiveRequest: AttributeReceiveRequest | null = null;

    userStartsRequest(providerKey: string, procedureKey: string) {
        this.providerKey = providerKey;
        this.procedureKey = procedureKey;
        if (this.requirements && this.requirements.length === 0) {
            this.executeProcedure();
        } else {
            this.askUserToShare();
        }
    }

    userConsentsToShare(consent: boolean) {
        if (consent) {
            this.executeProcedure();
        } else {
            this.abortProcedure();
        }
    }

    userConsentsToReceive(consent: boolean) {
        this.hookUserConsentToReceive.fire(consent);

        if (consent) {
            this.saveReceivedCredentials();
        } else {
            this.abortProcedure();
        }
    }

    protected askUserToShare() {
        this.setStep(Step.SHARE);
    }

    protected async executeProcedure() {
        const { providerKey, procedureKey } = this;
        if (!providerKey || !procedureKey) return;

        // We pass a callback to the WalletService for asking consent to receive
        const onConsent = (data: any) => {
            this.askUserToReceive(data);
            return new Promise<boolean>((resolve) => this.hookUserConsentToReceive.on(resolve));
        }

        try {
            const result = await this.walletService.requestOWAttestSharingApproved(
                providerKey, procedureKey, onConsent);


            if (result) {
                result.forEach(a => this.attributeService.storeAttribute(a));
                this.showMessage('The attributes were successfully added to your identity.');
                this.setStatus(Status.COMPLETE);
                this.done();
                return result;
            } else {
                this.showMessage('The attributes were not added to your identity.');
                this.setStatus(Status.ABORTED);
                this.done();
                return [];
            }

        } catch (e) {
            this.showMessage("Something went wrong");
            console.error("Something went wrong", e);
            this.setStatus(Status.FAILED);
        }
    }

    protected askUserToReceive(data: any) {
        console.log("Asking user", data);
        this.receiveRequest = {
            attributes: data,
            done: () => { },
            id: "",
            provider: this.provider?.mid_b64!,
            reason: "You asked for them"
        }
        this.setStep(Step.RECEIVE);
    }

    protected saveReceivedCredentials() {
        // Done in executeProcedure
    }

    protected done() {
        this.setStep(Step.DONE);
    }

    protected abortProcedure() {
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
