
import React from 'react';
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import dummy from "../dummy.json";

export class CredentialDetailPage extends React.Component<Props, State> {

    state: State = {
    }

    showQR() {
        // showQR();scrollDelayed(target, 500)
    }

    render() {
        const { id } = this.props;
        const attr = dummy.attributes.find(a => a.hash === id);
        const lang = "nl_NL";
        const qrValue = JSON.stringify(
            {
                mid: "FIXME",
                attribute_hash: attr ? attr.hash : "",
                attribute_value: attr ? attr.value : "",
            }
        );
        return (
            <div className="subpage nav-compact main-over-nav">

                <SubpageHeader
                    pageTitle={"Credential"}
                    backUrl={"/"}
                />

                <main>
                    {!attr ? "Credential Unknown.." : (
                        <CredentialCard
                            title={attr.title[lang]}
                            issuerName={attr.provider_title[lang]}
                            imageUrl={""}
                            showQR
                            qrValue={qrValue}
                            value={attr.value} showDetails={true} showMeta={true}
                            metadata={[
                                { key: "Signed by", value: attr.provider_title[lang] },
                                { key: "Created at", value: `${attr.time}` },
                                { key: "Valid until", value: "2020-09-01 13:20:00 CET" },
                            ]} />
                    )}
                </main>

                <BottomTools showQR />

            </div>
        );
    }
}

interface State {
}

interface Props {
    id: string;
}