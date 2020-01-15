import React, { useEffect, useState } from 'react';
import { useServices } from "../hooks/useServices";
import { ProcedureDonePage } from "../pages/ProcedureDonePage";
import { VerifierConsentPage } from "../pages/VerifierConsentPage";
import { CredentialVerifyFlowRunner } from "../services/CredentialVerifyFlowRunner";
import { VerificationOffer } from "../services/QRService";

enum Step { INIT, CONFIRM, DONE };

let flow: CredentialVerifyFlowRunner;
export const CredentialVerifyFlow: React.FC<Props> = ({ verifyOffer }) => {

    const [step, setStep] = useState<Step>(Step.INIT);
    const { services } = useServices();

    useEffect(() => {
        flow = new CredentialVerifyFlowRunner(services!.owService!);
        flow.hookStep.on(step => { console.log(step); setStep(step) });
        flow.userStartsRequest(verifyOffer)
    }, []);

    const handleConfirm = (consent: boolean) => flow.userConsentsToVerify(consent);

    switch (step) {
        case Step.INIT: return <div></div>;
        case Step.CONFIRM: return <VerifierConsentPage onSubmitConsent={handleConfirm} verificationOffer={flow.offer!} />;
        case Step.DONE: return <ProcedureDonePage pageTitle={"Verify a Credential"} messageTitle={"Verification Result"} messageBody={flow.message} />;
        default: return <div>This should not happen</div>;
    }

}

export interface Props {
    verifyOffer: VerificationOffer;
}

