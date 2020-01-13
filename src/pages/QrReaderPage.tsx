import QRCode from "qrcode.react";
import React, { useState } from 'react';
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { SubpageHeader } from "../components/SubpageHeader";

export const QrReaderPage: React.FC<Props> = ({ }) => {

    const [lastScan, setLastScan] = useState<string>("");
    const handleScan = (data: string | null) => {
        if (data) {
            setLastScan(data);
        }
    }



    const handleError = (err: any) => {
        console.error(err)
    }

    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Scan QR"}
                backUrl={"/"}
            />

            <main className={"text-center"}>
                <h1>Scan a QR</h1>

                {!lastScan ? (
                    <div>
                        <p>Find or draw a <Icon qrcode /> and scan it.</p>
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />
                    </div>
                ) : (
                        <div>
                            <p>I got this:</p>
                            <QRCode value={lastScan} size={256} level={"M"} />
                            <p>Meaning: <code>{lastScan}</code></p>
                            <Button onClick={() => setLastScan("")}>Try again</Button>
                        </div>
                    )}
                <br />
                <br />

                <Link to={"/"}><Button>Never mind</Button></Link>
            </main>
        </div>
    )
}

interface Props {
}