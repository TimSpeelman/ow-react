import { Attestation, InboundAttestationRequest, InboundVerificationRequest, VerificationOutputPair } from "@tsow/ow-ssi/dist/types/src/ipv8/api/types";
import QRCode from "qrcode.react";
import { default as React } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import { SubpageHeader } from "../components/SubpageHeader";

export const BadgePage: React.FC = () => {

    const qrValue = "";

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"My Badge"}
                backUrl={"/"}
            />

            <main>
                <h1>Badge</h1>
                <p>Show your badge with mate</p>

                <div className="qr-code">
                    <CopyToClipboard text={qrValue}>
                        <QRCode value={qrValue} size={256} level={"M"} />
                    </CopyToClipboard>
                </div>
            </main>

        </div>
    )
}

interface PollState {
    attReqs: InboundAttestationRequest[],
    atts: Attestation[],
    verifReqs: InboundVerificationRequest[],
    verifs: VerificationOutputPair[],
    peers: string[],
}
