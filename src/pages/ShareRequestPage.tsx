import React, { useState } from 'react';
import { Button } from "../components/Button";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { getAttributes, getProviderByMid } from "../services/local/selectors";
import { AttributeShareRequest } from "../shared/tasks.service";

export const ShareRequestPage: React.FC<Props> = ({ shareRequest, onSubmitConsent }) => {
    const { fromLanguageDict } = useInternationalization();

    const provider = useSelector(getProviderByMid(shareRequest.receiver));
    const allAttributes = useSelector(getAttributes);
    const attributesToShare = shareRequest.attributeNames.map(name => allAttributes.find(a => a.name === name)).filter(a => !!a);


    const [pending, setPending] = useState(false);

    const handleSubmit = (consent: boolean) => {
        setPending(true);
        onSubmitConsent(consent);
    }

    return !provider ? <div>...ShareRequestPage No Provider...</div> : (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Request Credential"}
                backUrl={"/"}
            />

            <main className="text-center">
                <h1>Step 1: Share Information</h1>
                <p>{fromLanguageDict(provider.title)} requires the following information:</p>

                {attributesToShare.map(attribute => !attribute ? "" :
                    <CredentialCard
                        title={fromLanguageDict(attribute.title)}
                        issuerName={fromLanguageDict(attribute.provider.title)}
                        imageUrl={attribute.provider.logo_url}
                        value={attribute.value}
                        showDetails
                    />
                )}


                <p>Do you wish to share these credentials?</p>
                <Button onClick={() => handleSubmit(true)} isPending={pending} primary >Share these credentials</Button>
                <Button onClick={() => handleSubmit(false)} disabled={pending} >Do not share</Button>
            </main>

        </div>
    )
}

interface Props {
    shareRequest: AttributeShareRequest,
    onSubmitConsent: (consent: boolean) => any
}
