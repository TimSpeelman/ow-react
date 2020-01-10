import React from 'react';
import { Icon } from "../components/Icon";
import { SubpageHeader } from "../components/SubpageHeader";

export class ContactIndexPage extends React.Component<{}, State> {

    render() {
        const providers: any = [];
        const provider: any = { title: {} };
        const attribute: any = { title: {} };
        const lang = "";
        const loading = false;
        const peopleCount = 23;

        return (
            <div className="subpage nav-compact">
                <SubpageHeader
                    pageTitle={"Contacts"}
                    backUrl={"/"}
                />

                <main>
                    <h1>People ({peopleCount})</h1>
                    <h1>Organisations ({providers.length})</h1>
                    <a className="card-item clickable" >
                        <div className="row">
                            <div className="logo-box">
                                <img src="{{ provider.logo_url }}" />
                            </div>
                            <div className="text-box">
                                <div className="primary">{provider.title[lang]}</div>
                            </div>
                            <div className="tool">
                                <div className="clickable">
                                    <Icon info-circle />
                                </div>
                            </div>
                        </div>
                    </a>
                    <h1>Add By URL</h1>
                    <div className="col-xs-12">
                        <input type="url" className="text-input" placeholder="Enter the URL of the provider" required />
                        <br />
                        <br />
                        <button onClick={() => this.addContact()} className="btn btn primary" type="submit" disabled={loading}>Add Contact</button>
                    </div>
                </main>

            </div>
        )
    }

    addContact() {

    }

}

interface State {

}