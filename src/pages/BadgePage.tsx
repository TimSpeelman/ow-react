import { Attestation, InboundAttestationRequest, InboundVerificationRequest, VerificationOutputPair } from "@tsow/ow-ssi/dist/types/src/ipv8/api/types";
import QRCode from "qrcode.react";
import { default as React } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import { SubpageHeader } from "../components/SubpageHeader";
import { theWallet } from "../services/services";

export const BadgePage: React.FC = () => {

    const mid = theWallet.agent.mid
    const qrValue = JSON.stringify({ mid });

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"My Badge"}
                backUrl={"/"}
            />

            <main className="flex-center">
                <div className="card-item" style={{ padding: 16 }}>
                    <h1>My Badge</h1>
                    <p>By scanning a badge, people can connect their Wallets. This may be
                        necessary when proving who you are.</p>

                    <div className="qr-code">
                        <CopyToClipboard text={qrValue}>
                            <QRCode value={qrValue} size={256} level={"M"} />
                        </CopyToClipboard>
                    </div>
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
