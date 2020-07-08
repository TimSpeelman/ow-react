import React, { useState } from 'react';
import { Button } from "../../../components/Button";
import { CredentialCard } from "../../../components/CredentialCard";
import { Icon } from "../../../components/Icon";
import { ModalContactPick } from "../../../components/ModalContactPick";
import { ModalQRScan } from "../../../components/ModalQRScan";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { getMyLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";
import { theWallet } from "../../../services/services";

export const ModuleGrantAccessPage: React.FC<Props> = ({ siteId }) => {

    const locations = useAMSelector(getMyLocations);
    const site = locations.find(l => l.id === siteId);

    const [modalOpen, setModalOpen] = useState(false);
    const [attestPending, setPending] = useState(false);
    const onSubmitPickContact = async (mid: string) => {
        console.log("Grantig access to mid", mid, "for loc", siteId)
        setPending(true);
        const ok = await theWallet.accessModuleService?.grantAccess(mid, siteId);
        setPending(false);
        setModalOpen(false);
    }

    const [qrOpen, setQROpen] = useState(false);
    const handleQRScan = () => { }

    return !site ? <div>...</div> : (
        <div className="subpage nav-compact">

            <ModalContactPick
                title="Grant access to a Contact"
                description={`Pick a contact who you want to grant access to ${site.name}`}
                submitText={`Grant Access`}
                onRequestClose={() => setModalOpen(false)}
                open={modalOpen}
                onSubmit={onSubmitPickContact}
                pending={false}
            />

            <ModalQRScan
                open={qrOpen}
                onRequestClose={() => setQROpen(false)}
                onScanQR={handleQRScan}
            />

            <SubpageHeader
                pageTitle={"Grant Location Access"}
                backUrl={"/module/1/my-locs/" + siteId}
            />

            <main>
                <h1>Grant Access</h1>
                <p>You are about to grant someone access to the following location:</p>

                <CredentialCard
                    issuerName={`${site.grants.length} people have access`}
                    title={site.name} />

                <p>How would you like to share this access?</p>

                <Button onClick={() => setModalOpen(true)}><Icon users /> Share with a Contact</Button>

                <Button onClick={() => setQROpen(true)}><Icon id-badge /> Scan a Badge</Button>

                <Button><Icon share-alt /> Share a Link</Button>

            </main>

        </div>
    )
}

export interface Props {
    siteId: string;
}
