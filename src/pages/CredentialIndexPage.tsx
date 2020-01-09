import React from 'react';
import { Link } from "react-router-dom";
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import dummy from "../dummy.json";

const attr = {};

export class CredentialIndexPage extends React.Component<{}, State> {

    state = {
        credentials: dummy.attributes
    }

    render() {
        const providers: any = [];
        const provider: any = { title: {} };
        const attribute: any = { title: {} };
        const lang = "nl_NL";
        const loading = false;
        const peopleCount = 23;
        const { credentials } = this.state;
        return (
            <div>

                <header>
                    <div className="content">
                        <div className="avatar">
                            <img src="./assets/images/user-colored.svg" alt="" />
                        </div>
                        <div className="text">
                            <div className="primary">Tim Speelman</div>
                            <div className="secondary">Self-Sovereign Identity</div>
                        </div>
                        <div className="burger-menu">
                            <span className="fas fa-bars"></span>
                        </div>
                    </div>

                    <div className="background"></div>
                </header>
                <div className="after-header"> </div>


                <main>
                    <h1>Credentials</h1>
                    {credentials.map(c =>
                        <Link to={`/detail/${encodeURIComponent(c.hash)}`}>
                            <CredentialCard
                                imageUrl={""}
                                title={c.title[lang]}
                                issuerName={c.provider_title[lang]}
                            />
                        </Link>
                    )}
                </main>

                <BottomTools showQR={true} showPlus={true} />

            </div>
        )

    }
}

interface State {
    credentials: any[];
}
