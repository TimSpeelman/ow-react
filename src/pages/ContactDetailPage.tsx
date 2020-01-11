import React from 'react';
import { SubpageHeader } from "../components/SubpageHeader";

export class ContactDetailPage extends React.Component<{}, State> {

    render() {
        const provider: any = { title: {}, description: {} };
        const procedure: any = { title: {} };
        const lang = "";

        return (

            <div className="subpage nav-compact">
                <SubpageHeader
                    pageTitle={"Contact"}
                    backUrl={"/contacts"}
                />

                <main>
                    <img src="{ provider.logo_url }" alt={provider.title[lang]} />
                    <h1>{provider.title[lang]}</h1>
                    <p>{provider.description[lang]}</p>
                    <table>
                        <tr>
                            <th>ID</th>
                            <td>{provider.mid_b64}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>{provider.website}</td>
                        </tr>
                        <tr>
                            <th>Attestation Server URL</th>
                            <td>{provider.url}</td>
                        </tr>
                    </table>

                    <h2>Credentials</h2>
                    <p>{provider.title[lang]} offers the following credentials:</p>

                    <div className="card-item">
                        <div className="row">
                            <div className="logo-box">
                                <img src="{ provider.logo_url }" alt="" />
                            </div>
                            <div className="text-box">
                                <div className="primary">{procedure.title[lang]}</div>
                                <div className="secondary">{provider.title[lang]}</div>
                            </div>
                            <div className="tool">

                            </div>
                        </div>
                    </div>
                </main>

            </div>
        )
    }
}

interface State {

}