import React from 'react';
import { Link } from "react-router-dom";
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { HomepageHeader } from "../components/HomepageHeader";
import dummy from "../dummy.json";
import { StateWrapper } from "../util/StateWrapper";

const attr = {};

export class CredentialIndexPage extends React.Component<{}, State> {

    state = {
        credentials: dummy.attributes
    }

    render() {
        const lang = "nl_NL";
        const { credentials } = this.state;
        const sw = new StateWrapper(dummy);

        return (
            <div>
                <HomepageHeader />

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
