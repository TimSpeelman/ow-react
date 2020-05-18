import { OWVerifiee, OWVerifyRequest } from "@tsow/ow-ssi/dist/types/modules/browser/ow";
import React, { useEffect, useState } from 'react';
import { useServices } from "../hooks/useServices";
import { ProcedureDonePage } from "../pages/ProcedureDonePage";
import { AuthServiceFlowRunner } from "../services/AuthServiceFlowRunner";

enum Step { INIT, CONFIRM, DONE };

let flow: AuthServiceFlowRunner;
export const AuthServiceFlow: React.FC<Props> = ({ verifyRequest }) => {

    const [step, setStep] = useState<Step>(Step.INIT);
    const { services } = useServices();

    useEffect(() => {
        const verifiee = new OWVerifiee(services!.ipv8Service.verifieeService);
        flow = new AuthServiceFlowRunner(verifiee);
        flow.hookStep.on(step => { console.log(step); setStep(step) });
        flow.userStartsRequest(verifyRequest)
    }, []);

    const handleConfirm = (consent: boolean) => flow.userConsentsToVerify(consent);

    switch (step) {
        case Step.INIT: return <div></div>;
        // case Step.CONFIRM: return <VerifierConsentPage onSubmitConsent={handleConfirm} verificationOffer={flow.request!} />;
        case Step.DONE: return <ProcedureDonePage pageTitle={"Verify a Credential"} messageTitle={"Verification Result"} messageBody={flow.message} />;
        default: return <div>This should not happen</div>;
    }

}

export interface Props {
    verifyRequest: OWVerifyRequest;
}

