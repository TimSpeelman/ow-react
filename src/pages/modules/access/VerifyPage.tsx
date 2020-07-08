import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { ModalQRScan } from "../../../components/ModalQRScan";
import { SelectInput } from "../../../components/SelectInput";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { getMyLocations, getTrustedLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";

export const ModuleAccessVerifyPage: React.FC = () => {

    const myLocations = useAMSelector(getMyLocations);
    const trustedLocations = useAMSelector(getTrustedLocations);
    const options = [
        ...myLocations.map(l => ({ value: l.id, label: l.name + ` (me)` })),
        ...trustedLocations.map(l => ({ value: l.id, label: l.name + ` (${l.rootMid.substr(0, 5)})` }))
    ]

    const [selectedSite, setSite] = useState("");
    const [qr, setQR] = useState("");

    const [qrOpen, setQrOpen] = useState(false);

    const handleScan = (code: string)  => {
        setQrOpen(false);

        try {
            const d = JSON.parse(code);
            if(d.mid) {
                window.location.assign(`#/module/1/verify/${selectedSite}/${d.mid}`)
            }
        } catch (e) {

        }        
    }

    return (
        <div className="subpage nav-compact">

            <ModalQRScan onRequestClose={() => setQrOpen(false)} onScanQR={handleScan} open={qrOpen} />

            <SubpageHeader
                pageTitle={"Verify Site Access"}
                backUrl={"/module/1"}
            />

            <main>
                <p>To which site do you wish to verify someone's access:</p>


                <SelectInput
                    options={options}
                    value={selectedSite}
                    onChange={(v) => setSite(v)}
                    emptyMessage={"Select a site please"}
                />

                <br />
                <br />

                {(selectedSite !== "") && (
                    <Button primary onClick={() => setQrOpen(true)}><Icon id-badge /> Scan Visitor's Badge</Button>
                )}

                <Link to="/module/1/trusted-sites">
                    <Button><Icon plus /> Add a different site</Button>
                </Link> <br />

                <p>{qr}</p>

            </main>

        </div>
    )
}
