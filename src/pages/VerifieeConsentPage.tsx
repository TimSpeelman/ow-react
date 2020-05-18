import React, { useState } from 'react';
import { Button } from "../components/Button";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { InformedVerifyRequest } from "../types/InformedVerifyRequest";

export const VerifieeConsentPage: React.FC<Props> = ({ request, onSubmitConsent }) => {
    const { fromLanguageDict } = useInternationalization();

    const [pending, setPending] = useState(false);

    const handleSubmit = (consent: boolean) => {
        setPending(true);
        onSubmitConsent(consent);
    }

    const attrs = {
        success: request.resolve.attributes.filter(a => a.status === "success").map(a => a.results[0]),
        ambiguous: request.resolve.attributes.filter(a => a.status === "ambiguous"),
        missing: request.resolve.attributes.filter(a => a.status === "missing"),
    }

    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Consent to Share"}
                backUrl={"/"}
            />

            <main className="text-center">
                <h1>Do you wish to share?</h1>
                {attrs.missing.length > 0 && (
                    <div>
                        <p>You are missing the following attributes:</p>
                        <ul>
                            {attrs.missing.map(attribute =>
                                <li>{attribute.request.name}</li>
                            )}
                        </ul>
                    </div>
                )}

                {/* TODO AMBIGUOUS */}

                <p>X requires the following information:</p>

                {attrs.success.map(attribute =>
                    <CredentialCard
                        key={attribute.hash}
                        title={attribute.name}
                        issuerName={attribute.signer_mid_b64}
                        imageUrl={""}
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
    request: InformedVerifyRequest,
    onSubmitConsent: (consent: boolean) => any
}
