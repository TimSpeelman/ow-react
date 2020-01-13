import React, { useEffect, useState } from 'react';
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { usePromised } from "../hooks/usePromised";
import { useSelector } from "../hooks/useSelector";
import { callbackService, localAPI } from "../services";
import { getAttributeByHash } from "../services/local/selectors";


export const CredentialDetailPage: React.FC<Props> = ({ id }) => {

    console.log("Render");

    const { fromLanguageDict } = useInternationalization();
    const attr = useSelector(getAttributeByHash(id));
    const myMid = usePromised(() => localAPI.getMyMID().catch(e => console.error(e)));


    const [qrDisp, setQRDisp] = useState<string>("");

    const [qrValue, setQR] = useState<string>("");
    useEffect(() => {
        if (myMid && attr && qrDisp) {
            const handle = callbackService.register((callbackId) => console.log("Peer called to verify " + attr?.name, callbackId));
            handle.onNewReference((ref) => setQR(myMid + "|" + ref.id));
            handle.refreshAtInterval(1000);
            return () => handle.stopRefreshing();
        } else {
            setQR("");
        }
    }, [myMid, attr, qrDisp]);

    const toggleQR = (name: string) => {
        if (qrDisp === name) {
            setQRDisp("");
        } else {
            setQRDisp(name)
        }
    }

    return (
        <div className="subpage nav-compact main-over-nav">

            <SubpageHeader
                pageTitle={"Credential"}
                backUrl={"/"}
            />

            <main>
                {!attr ? "Credential Unknown.." : (
                    <CredentialCard
                        title={fromLanguageDict(attr.title)}
                        issuerName={fromLanguageDict(attr.provider.title)}
                        imageUrl={attr.provider.logo_url}
                        withQRs
                        onDisplayQR={toggleQR}
                        qrValue={qrValue}
                        value={attr.value}
                        showDetails={true}
                        showMeta={true}
                        metadata={[
                            { key: "Signed by", value: fromLanguageDict(attr.provider.title) },
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