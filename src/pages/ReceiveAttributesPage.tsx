import React, { useState } from 'react';
import { Button } from "../components/Button";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { getProviderByMid } from "../services/local/selectors";
import { AttributeReceiveRequest } from "../shared/tasks.service";

export const ReceiveAttributesPage: React.FC<Props> = ({ receiveRequest, onSubmitConsent }) => {
    const { fromLanguageDict } = useInternationalization();

    const provider = useSelector(getProviderByMid(receiveRequest.provider));

    const [pending, setPending] = useState(false);

    const attributesToReceive = receiveRequest.attributes;


    const handleSubmit = (consent: boolean) => {
        setPending(true);
        onSubmitConsent(consent);
    }

    return !receiveRequest ? <div>...ReceiveAttributesPage...</div> : (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Receive Credentials"}
                backUrl={"/"}
            />

            <main className="text-center" >
                <h1>Step 2: Save New Credentials</h1>
                <p>{fromLanguageDict(provider!.title)} offers you the following credentials:</p>

                {attributesToReceive.map(attribute => (
                    <CredentialCard
                        key={attribute.name}
                        title={fromLanguageDict(attribute.title)}
                        issuerName={fromLanguageDict(provider!.title)}
                        imageUrl={provider!.logo_url}
                        value={attribute.value}
                        showDetails={true}
                        showMeta={true}
                        metadata={[
                            { key: "Signed by", value: fromLanguageDict(provider!.title) },
                            { key: "Created at", value: "2018-09-01 13:20:00 CET" },
                            { key: "Valid until", value: "2020-09-01 13:20:00 CET" },
                        ]} />
                ))}

                <p>Do you wish to save these credentials?</p>
                <Button onClick={() => handleSubmit(true)} primary isPending={pending}>Save these credentials</Button>
                <Button onClick={() => handleSubmit(false)} disabled={pending}>Do not save</Button>
            </main>
        </div>
    )
}

interface Props {
    receiveRequest: AttributeReceiveRequest;
    onSubmitConsent: (consent: boolean) => any;
}