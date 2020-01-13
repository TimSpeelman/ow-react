import QRCode from "qrcode.react";
import React, { useState } from 'react';
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { SubpageHeader } from "../components/SubpageHeader";

export const QrReaderPage: React.FC<Props> = ({ onScanQR }) => {

    const [lastScan, setLastScan] = useState<string>("");
    const handleScan = (data: string | null) => {
        if (data) {
            setLastScan(data);
        }
    }

    const handleError = (err: any) => {
        console.error(err)
    }

    const [manualInput, setManualInput] = useState<string>("");
    const [showManual, setShowManual] = useState<boolean>(false);

    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Scan QR"}
                backUrl={"/"}
            />

            <main className={"text-center"}>
                <h1>Scan a QR</h1>

                {!showManual ? (
                    !lastScan ? (
                        <div>
                            <p>Find or draw a <Icon qrcode /> and scan it.</p>
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                            <p className="clickable" onClick={() => setShowManual(true)}>Or try entering manually</p>
                        </div>
                    ) : (
                            <div>
                                <p>I got this:</p>
                                <QRCode value={lastScan} size={256} level={"M"} />
                                <p>Meaning: <code>{lastScan}</code></p>
                                <Button primary onClick={() => onScanQR(lastScan)}>Submit</Button>
                                <Button onClick={() => setLastScan("")}>Try again</Button>
                            </div>
                        )
                ) : (
                        <form onSubmit={() => onScanQR(manualInput)}>
                            <div className="col-xs-12">
                                <input type="text" className="text-input" placeholder="Enter the QR value"
                                    required value={manualInput} onChange={(e) => setManualInput(e.target.value)} />
                                <br />
                                <br />
                                <Button type={"submit"} primary>Submit</Button>
                                <Button onClick={() => setShowManual(false)}>Cancel</Button>

                            </div>
                        </form>
                    )}

                <br /><br />
                <Link to={"/"}><Button>Never mind</Button></Link>

            </main>
        </div>
    )
}

interface Props {
    onScanQR: (qr: string) => any;
}
