import React from 'react';
import './assets/css/font-awesome.min.css';
import './assets/css/index.css';
import { VerifieeConsentPage } from "./pages/VerifieeConsentPage";
import { InformedVerifyRequest } from "./types/InformedVerifyRequest";

export const DemoPage: React.FC = () => {

    const request: InformedVerifyRequest = {
        request: {
            attributes: [],
            verifier_id: "VRFID",
        },
        resolve: {
            status: "success",
            attributes: [
                {
                    status: "success",
                    ref: "a",
                    request: { name: "name", format: "id_metadata", ref: "a" },
                    results: [
                        { hash: "xsd", value: "Tim Speelman", format: "id_metadata", name: "name", signer_mid_b64: "xyz", metadata: 1 }
                    ],
                    responses: [{ hash: "xsd", ref: "a", }],
                },
                {
                    status: "success",
                    ref: "a",
                    request: { name: "age", format: "id_metadata", ref: "a" },
                    results: [
                        { hash: "xsd", value: "28", format: "id_metadata", name: "age", signer_mid_b64: "xyz", metadata: 1 }
                    ],
                    responses: [{ hash: "xsd", ref: "a", }],
                }
            ]
        },
    }
    return (
        <VerifieeConsentPage onSubmitConsent={() => { }} request={request} />
    )
}
