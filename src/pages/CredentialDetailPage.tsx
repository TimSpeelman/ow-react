
import React, { useContext, useEffect, useState } from 'react';
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { I18nContext } from "../components/I18nContext";
import { SubpageHeader } from "../components/SubpageHeader";
import { attributeQuery } from "../services";
import { LocalAttr } from "../types/types";

export const CredentialDetailPage: React.FC<Props> = ({ id }) => {


    const [attributes, setAtt] = useState<LocalAttr[]>([]);

    const { langCode } = useContext(I18nContext);

    useEffect(() => {
        attributeQuery.listAttributes().then((a) => setAtt(a))
            .catch(e => console.error(e))
    }, []);


    const attr = attributes.find(a => a.hash === id);
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
                        title={attr.title[langCode]}
                        issuerName={attr.provider.title[langCode]}
                        imageUrl={""}
                        showQR
                        qrValue={qrValue}
                        value={attr.value} showDetails={true} showMeta={true}
                        metadata={[
                            { key: "Signed by", value: attr.provider.title[langCode] },
                            { key: "Created at", value: `${attr.time}` },
                            { key: "Valid until", value: "2020-09-01 13:20:00 CET" },
                        ]} />
                )}
            </main>

            <BottomTools showQR />

        </div>
    );
}

interface Props {
    id: string;
}