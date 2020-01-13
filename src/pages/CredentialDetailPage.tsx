import React, { useMemo, useState } from 'react';
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { usePromised } from "../hooks/usePromised";
import { useCallbackReference } from "../hooks/useQR";
import { useSelector } from "../hooks/useSelector";
import { localAPI } from "../services";
import { getAttributeByHash } from "../services/local/selectors";

let ctr = 0;
let m1: any = null;
let m2: any = null;
let m3: any = null;

export const CredentialDetailPage: React.FC<Props> = ({ id }) => {

    const { fromLanguageDict } = useInternationalization();
    const attr = useSelector(useMemo(() => getAttributeByHash(id), [id]));
    const myMid = usePromised(() => localAPI.getMyMID().catch(e => console.error(e)));

    // The user may pick either the QR from the credential or from the attribute
    const [selectedQR, setSelectedQR] = useState<string>("");
    const toggleQR = (name: string) => setSelectedQR(selectedQR === name ? "" : name);

    // Once a peer scans the QR and calls us with the reference, it will invoke the onPeerScan callback.
    const onPeerScan = (callbackId: string) => console.log("Peer called to verify " + attr?.name, callbackId)
    const onPeerScanMemoized = useMemo(() => onPeerScan, [myMid, attr, selectedQR]);
    const referenceForPeer = useCallbackReference(onPeerScanMemoized, { refreshIntervalMillis: 1000 });

    const qrValue = (!myMid || !selectedQR) ? "" : myMid + "|" + referenceForPeer;

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
