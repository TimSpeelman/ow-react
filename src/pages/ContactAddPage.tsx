import React, { FormEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { ModalQRScan } from "../components/ModalQRScan";
import { SubpageHeader } from "../components/SubpageHeader";
import { useServices } from "../hooks/useServices";

export const ContactAddPage: React.FC = () => {

    const { services } = useServices();

    const [mid, setMid] = useState("");
    const [name, setName] = useState("");

    const [qrOpen, setQrOpen] = useState(false);

    const handleScan = (code: string) => {
        setQrOpen(false);

        try {
            const d = JSON.parse(code);
            if (d.mid) {
                setMid(d.mid);
            }
        } catch (e) {
            console.error("Cannot parse QR", code)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await services?.contactService.add(name, mid)
        window.location.assign("#/contacts")
    }

    return (

        <div className="subpage nav-compact">
            <ModalQRScan onRequestClose={() => setQrOpen(false)} onScanQR={handleScan} open={qrOpen} />

            <SubpageHeader
                pageTitle={"Add Contact"}
                backUrl={"/contacts"}
            />

            {mid === ""
                ? (
                    <main className="flex-center">
                        <div>
                            <h1>Add a Contact</h1>
                            <p>Add a contact by scanning their badge.</p>

                            <Button primary onClick={() => setQrOpen(true)}><Icon id-badge /> Scan a Badge</Button><br />
                            <Link to="/contacts"><Button>Cancel</Button></Link>
                        </div>
                    </main>

                ) : (
                    <main>
                        <h1>Add a Contact</h1>
                        <p>You have scanned a badge with id <strong>{mid}</strong>. Enter a (nick)name for this person:</p>

                        <form onSubmit={handleSubmit}>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <Button primary type="submit">Add Contact</Button>
                            <Link to="/contacts"><Button>Cancel</Button></Link>
                        </form>

                    </main>
                )}

        </div>
    )
}
