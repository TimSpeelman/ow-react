import React from 'react';
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";

export class ConfirmIncomingVerificationPage extends React.Component<{}, State> {

    render() {
        const providers: any = [];
        const request: any = { provider: { title: {}, description: {} } };
        const attribute: any = { title: {}, provider_title: {} };
        const lang = "";
        const loading = false;
        const peopleCount = 23;

        return (
            <div className="subpage nav-compact">
                <SubpageHeader
                    pageTitle={"Verification Request"}
                    backUrl={"/"}
                    toggleMenu={() => { }} />

                <main className="text-center" >
                    <h1>Someone wishes to verify</h1>
                    <p>
                        {request.mid} wishes to verify your information:
                </p>
                    <CredentialCard
                        title={"Age"}
                        issuerName={"Staat der Nederlanden"}
                        imageUrl={""}
                        value={"28"}
                        showDetails={true}
                    />

                    <p>Do you wish to share these credentials?</p>
                    <button className="btn primary" onClick={() => this.confirmRequest()} disabled={loading}>Share and continue</button>
                    <button className="btn secondary" onClick={() => this.denyRequest()} disabled={loading}>Cancel</button>
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