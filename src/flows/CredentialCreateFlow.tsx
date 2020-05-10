import React, { useEffect, useState } from 'react';
import { CredentialCreatePage } from "../pages/CredentialCreatePage";
import { ProcedureDonePage } from "../pages/ProcedureDonePage";
import { ReceiveAttributesPage } from "../pages/ReceiveAttributesPage";
import { ShareRequestPage } from "../pages/ShareRequestPage";
import { RequestProcedureFlowRunner, Status } from "../services/RequestProcedureFlowRunner";
import { attributeService, owService, providersService } from "../services/services";

enum Step { INIT, SHARE, RECEIVE, DONE };

let flow: RequestProcedureFlowRunner;
export const CredentialCreateFlow: React.FC = () => {

    const [step, setStep] = useState<Step>(Step.INIT);

    useEffect(() => {
        setTimeout(() => {
            flow = new RequestProcedureFlowRunner(providersService!, owService!, attributeService);
            flow.hookStep.on(step => { console.log(step); setStep(step) });

        }, 2000);
    }, [])

    switch (step) {
        case Step.INIT: return <CredentialCreatePage onSubmitRequest={(pv, pc) => flow.userStartsRequest(pv, pc)} />;
        case Step.SHARE: return <ShareRequestPage shareRequest={flow.shareRequest!} onSubmitConsent={(consent) => flow.userConsentsToShare(consent)} />
        case Step.RECEIVE: return <ReceiveAttributesPage receiveRequest={flow.receiveRequest!} onSubmitConsent={(consent) => flow.userConsentsToReceive(consent)} />
        case Step.DONE: return <ProcedureDonePage messageBody={flow.message} messageTitle={flow.status === Status.COMPLETE ? "Success" : "No success"} pageTitle={"Create"} />
        default: return <div>This should not happen</div>;
    }
}

