import React from 'react';
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";

export class ShareRequestPage extends React.Component<{}, State> {

    render() {
        const provider: any = { title: {} };
        const lang = "";
        const loading = false;
        return (
            <div className="subpage nav-compact">
                <SubpageHeader
                    pageTitle={"Request Credential"}
                    backUrl={"/"}
                />

                <main className="text-center">
                    <h1>Step 1: Share Information</h1>
                    <p>{provider.title[lang]} requires the following information:</p>

                    <CredentialCard
                        title={"Age"}
                        issuerName={"Staat der Nederlanden"}
                        imageUrl={""}
                        value={"28"}
                        showDetails={true}
                    />

                    <p>Do you wish to save these credentials?</p>
                    <button onClick={() => this.confirmRequest()} className="btn primary" disabled={loading}>Save these credentials</button>
                    <button onClick={() => this.denyRequest()} className="btn secondary" disabled={loading}>Do not save</button>
                </main>

            </div>
        )
    }

    confirmRequest() {

    }

    denyRequest() {

    }
}

interface State {

}
