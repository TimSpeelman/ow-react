import { OWAttestedAttr } from "@tsow/ow-ssi/dist/types/modules/browser/ow";
import React, { useEffect, useMemo, useState } from 'react';
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useClock } from "../hooks/useClock";
import { useInternationalization } from "../hooks/useInternationalization";
import { useCallbackReference } from "../hooks/useQR";
import { useSelector } from "../hooks/useSelector";
import { useServices } from "../hooks/useServices";
import { getContactByMid, getProviderByMid } from "../services/local/selectors";
import { makeEncoder, VerificationOfferCodec } from "../services/QRService";
import { theWallet } from "../services/services";

const encodeVerifOffer = makeEncoder(new VerificationOfferCodec());

export const CredentialDetailPage: React.FC<Props> = ({ id, useReferenceQR }) => {

    const { services } = useServices();
    const { fromLanguageDict } = useInternationalization();
    const [attr, setAttr] = useState<OWAttestedAttr | undefined>(undefined);
    useEffect(() => {
        theWallet.agent.repo.all()
            .then(attributes => setAttr(attributes.find(x => x.hash === id)))
    }, [id]);
    const myMid = theWallet.agent.mid;

    const provider = useSelector(useMemo(() => getProviderByMid(attr ? attr.signer_mid_b64 : ""), [id]));
    const knownContact = useSelector(useMemo(() => getContactByMid(attr ? attr.signer_mid_b64 : ""), [id]));
    const displayContact = knownContact ? knownContact : { name: `Anonymous<${attr?.signer_mid_b64.substr(0, 10)}...>`, mid: attr?.signer_mid_b64 }

    // The user may pick either the QR from the credential or from the attribute
    const [selectedQR, setSelectedQR] = useState<string>("");
    const toggleQR = (name: string) => setSelectedQR(selectedQR === name ? "" : name);

    // Once a peer scans the QR and calls us with the reference, it will invoke the onPeerScan callback.
    const onPeerScan = (callbackId: string) => console.log("Peer called to verify " + attr?.name, callbackId)
    const onPeerScanMemoized = useMemo(() => onPeerScan, [myMid, attr, selectedQR, onPeerScan]);
    const referenceForPeer = useCallbackReference(onPeerScanMemoized, { refreshIntervalMillis: 1000 });

    let qrValue = (!myMid || !selectedQR) ? "" : myMid + "|" + referenceForPeer;

    const time = useClock(1000);


    if (!useReferenceQR && myMid && attr) {
        const expirationInSeconds = 10;
        const verificationOffer = {
            mid: myMid!,
            attribute_hash: attr!.hash,
            attribute_value: attr!.value,
            attribute_name: attr!.name,
            expiresAt: time + (expirationInSeconds * 1000),
        }
        qrValue = (!myMid || !selectedQR) ? "" : encodeVerifOffer(verificationOffer);
    }

    return (
        <div className="subpage nav-compact main-over-nav">

            <SubpageHeader
                pageTitle={"Credential"}
                backUrl={"/"}
            />

            <main>
                {!attr ? "Credential Unknown.." :
                    !!provider ? (
                        <CredentialCard
                            title={fromLanguageDict(attr.title)}
                            issuerName={fromLanguageDict(provider.title)}
                            imageUrl={provider.logo_url}
                            withQRs
                            onDisplayQR={toggleQR}
                            qrValue={qrValue}
                            value={attr.value}
                            showDetails={true}
                            showMeta={true}
                            metadata={[
                                { key: "Signed by", value: fromLanguageDict(provider.title) },
                                { key: "Created at", value: `${attr.time}` },
                                { key: "Valid until", value: "2020-09-01 13:20:00 CET" },
                            ]} />
                    ) : (
                            <CredentialCard
                                title={attr.name}
                                issuerName={displayContact.name}
                                withQRs
                                onDisplayQR={toggleQR}
                                qrValue={qrValue}
                                value={attr.value}
                                showDetails={true}
                                showMeta={true}
                                metadata={[
                                    { key: "Signed by", value: displayContact.name },
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
    /** If set to true, will use ReferenceQRs (callback system) instead of data-QRs */
    useReferenceQR?: boolean;
}
