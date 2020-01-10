import React from 'react';
import { Button } from "../components/Button";
import { SubpageHeader } from "../components/SubpageHeader";

export class ConfirmContactPage extends React.Component<{}, State> {

    render() {
        const request: any = { provider: { title: {}, description: {} } };
        const lang = "";
        const loading = false;

        return (
            <div className="subpage nav-compact">

                <SubpageHeader
                    pageTitle={"Add Contact (QR)"}
                    backUrl={"/contacts"}
                />

                <main>
                    <p>Do you trust the following organization?</p>

                    <img src="{ request.provider.logo_url }" style={{ width: "20% " }} />
                    <h1>{request.provider.title[lang]}</h1>
                    <p>{request.provider.description[lang]}</p>
                    <table>
                        <tr>
                            <th>ID</th>
                            <td>{request.provider.mid_b64}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>{request.provider.website}</td>
                        </tr>
                        <tr>
                            <th>Attestation Server URL</th>
                            <td>{request.provider.url}</td>
                        </tr>
                    </table>

                    <Button primary onClick={() => this.confirmRequest()} disabled={loading}>Trust and add to contacts</Button>
                    <Button onClick={() => this.denyRequest()} disabled={loading}>Cancel</Button>


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