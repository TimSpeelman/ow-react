import React from 'react';
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";

export class ReceiveAttributesPage extends React.Component<{}, State> {

    render() {
        const provider: any = { title: {} };
        const attribute: any = { title: {} };
        const lang = "";

        const loading = false;
        return (
            <div className="subpage nav-compact">

                <SubpageHeader
                    pageTitle={"Receive Credentials"}
                    backUrl={"/"}
                    toggleMenu={() => { }}
                />

                <main className="text-center" >
                    <h1>Step 2: Save New Credentials</h1>
                    <p>{provider.title[lang]} offers you the following credentials:</p>

                    <CredentialCard
                        title={"Age"}
                        issuerName={"Staat der Nederlanden"}
                        imageUrl={""}
                        value={"28"}
                        showDetails={true}
                        showMeta={true}
                        metadata={[
                            { key: "Signed by", value: "Kamer van Koophandel" },
                            { key: "Created at", value: "2018-09-01 13:20:00 CET" },
                            { key: "Valid until", value: "2020-09-01 13:20:00 CET" },
                        ]} />

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

interface State { }