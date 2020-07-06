import React, { PropsWithChildren, useState } from 'react';
import QrReader from "react-qr-reader";
import { Button } from "../components/Button";

export const ModalQRScan: React.FC<PropsWithChildren<Props>> = ({ open, onRequestClose, onScanQR }) => {

    const [lastScan, setLastScan] = useState<string>("");
    const handleScan = (data: string | null) => {
        if (data) {
            setLastScan(data);
            onScanQR(data);
        }
    }

    const handleError = (err: any) => {
        console.error(err)
    }

    const [manualInput, setManualInput] = useState<string>("");
    const [showManual, setShowManual] = useState<boolean>(false);

    return (
        <div className={"qr-overlay " + (open ? "" : "hidden")}>
            <h1>Scan a Badge</h1>

            {!open ? "" : (

                !showManual ? (
                    <div>
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />
                        <p className="clickable" onClick={() => setShowManual(true)}>Or try entering manually</p>
                    </div>
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
                    )

            )}
            <br /><br />
            <Button onClick={onRequestClose}>Cancel</Button>

        </div>
    )
}

interface Props {
    open: boolean,
    onRequestClose: () => void,
    onScanQR: (qr: string) => any;

}
