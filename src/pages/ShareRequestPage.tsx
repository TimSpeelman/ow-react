import React from 'react';
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";

export const ShareRequestPage: React.FC<Props> = ({ requestId }) => {
    const { langCode } = useInternationalization();

    const provider: any = { title: {} };
    const loading = false;
    const confirmRequest = () => { };
    const denyRequest = () => { };
    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Request Credential"}
                backUrl={"/"}
            />

            <main className="text-center">
                <h1>Step 1: Share Information</h1>
                <p>{provider.title[langCode]} requires the following information:</p>

                <CredentialCard
                    title={"Age"}
                    issuerName={"Staat der Nederlanden"}
                    imageUrl={""}
                    value={"28"}
                    showDetails={true}
                />

                <p>Do you wish to share these credentials?</p>
                <button onClick={() => confirmRequest()} className="btn primary" disabled={loading}>Share these credentials</button>
                <button onClick={() => denyRequest()} className="btn secondary" disabled={loading}>Do not share</button>
            </main>

        </div>
    )
}

interface Props {
    requestId: string
}
