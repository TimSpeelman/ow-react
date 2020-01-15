import React, { useState } from 'react';
import { Button } from "../components/Button";
import { SubpageHeader } from "../components/SubpageHeader";
import { VerificationOffer } from "../services/QRService";

export const VerifierConsentPage: React.FC<Props> = ({ verificationOffer, onSubmitConsent }) => {
    const [pending, setPending] = useState(false);

    const handleSubmit = (consent: boolean) => {
        setPending(true);
        onSubmitConsent(consent);
    }

    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Verify a Credential"}
                backUrl={"/"}
            />

            <main className="text-center">
                <h1>Verifying by QR</h1>
                <p>Do you wish to verify the following?</p>

                <table>
                    <tbody>
                        <tr>
                            <td>Member ID</td>
                            <td>{verificationOffer.mid}</td>
                        </tr>
                        <tr>
                            <td>Attribute Name</td>
                            <td>{verificationOffer.attribute_name}</td>
                        </tr>
                        <tr>
                            <td>Attribute Hash</td>
                            <td>{verificationOffer.attribute_hash}</td>
                        </tr>
                        <tr>
                            <td>Attribute Value</td>
                            <td>{verificationOffer.attribute_value}</td>
                        </tr>
                    </tbody>
                </table>

                <Button onClick={() => handleSubmit(true)} isPending={pending} primary >Verify</Button>
                <Button onClick={() => handleSubmit(false)} disabled={pending} >Cancel</Button>
            </main>

        </div>
    )
}

interface Props {
    verificationOffer: VerificationOffer,
    onSubmitConsent: (consent: boolean) => any
}
