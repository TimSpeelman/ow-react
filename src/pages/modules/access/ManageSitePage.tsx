import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { CredentialCard } from "../../../components/CredentialCard";
import { Icon } from "../../../components/Icon";
import { Modal } from "../../../components/Modal";
import { ModalContactPick } from "../../../components/ModalContactPick";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { useServices } from "../../../hooks/useServices";
import { getMyLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";
import { theWallet } from "../../../services/services";

export const ModuleManageSitePage: React.FC<Props> = ({ siteId }) => {

    const { services } = useServices();
    const acModule = services?.accessModuleService!;

    const locations = useAMSelector(getMyLocations);
    const location = locations.find(l => l.id === siteId)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const showDeleteModal = () => setDeleteModalOpen(true);
    const deleteLocation = () => {
        acModule.deleteLocation(siteId);
        window.location.assign("#/module/1/my-locs")
    }

    const [shareModalOpen, setShareModalOpen] = useState(false);
    const shareLocation = async (mid: string) => {
        const sent = await theWallet.accessModuleService!.shareLocation(siteId, mid);
        if (!sent) {
            alert("Location could not be sent")
        }
        setShareModalOpen(false);
    }

    return !location ? <div></div> : (
        <div className="subpage nav-compact">

            <Modal open={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                <div>
                    <h1>Delete Location "{location.name}"</h1>
                    <p>Are you sure you wish to delete this location?</p>

                    <Button primary onClick={deleteLocation}>Delete</Button>
                    <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                </div>
            </Modal>

            <ModalContactPick
                open={shareModalOpen}
                onRequestClose={() => setShareModalOpen(false)}
                onSubmit={shareLocation}
                title={`Share Location "${location.name}"`}
                description={`With whom would you like to share this location? The receiver will be able to verify someone's access to the location.`}
                submitText={"Share"}
            />

            <SubpageHeader
                pageTitle={"Manage Location Access"}
                backUrl={"/module/1/my-locs"}
            />

            <main>
                <h1>Location "{location.name}"</h1>
                <p>Share this location with the gate keepers.</p>

                <Button onClick={() => setShareModalOpen(true)}>
                    <Icon shield-alt /> Share with Gate Keepers
                </Button>

                <Link to={`/module/1/my-locs/${siteId}/grant`}>
                    <Button><Icon user-plus /> Grant Access</Button>
                </Link>

                <h1>{location.grants.length} people have access</h1>
                {location.grants.length === 0
                    ? <p>No people have access yet.</p>
                    : <p>You have granted access to the following people:</p>}

                {location.grants.map(g => (
                    <CredentialCard
                        issuerName={""}
                        title={services ? services.contactService.getNameString(g.subjectId) : g.subjectId} />

                ))}

                <h1>Delete Location</h1>
                <p>After deleting this location you are no longer able to manage its access.</p>

                <Button onClick={showDeleteModal}><Icon trash /> Delete Location</Button>
            </main>

        </div>
    )
}

interface Props {
    siteId: string
}
