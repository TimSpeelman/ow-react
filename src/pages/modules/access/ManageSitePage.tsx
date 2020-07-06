import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { CredentialCard } from "../../../components/CredentialCard";
import { Icon } from "../../../components/Icon";
import { Modal } from "../../../components/Modal";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { useServices } from "../../../hooks/useServices";
import { getLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";

export const ModuleManageSitePage: React.FC<Props> = ({ siteId }) => {

    const { services } = useServices();
    const acModule = services?.accessModuleService!;

    const locations = useAMSelector(getLocations);
    const location = locations.find(l => l.id === siteId)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const showDeleteModal = () => setDeleteModalOpen(true);
    const deleteLocation = () => {
        acModule.deleteLocation(siteId);
        window.location.assign("#/module/1/manage")
    }

    const [grantModalOpen, setGrantModalOpen] = useState(false);

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

            <Modal open={grantModalOpen} onRequestClose={() => setGrantModalOpen(false)}>
                <div>
                    <h1>Delete Location "{location.name}"</h1>
                    <p>Are you sure you wish to delete this location?</p>

                    <Button primary onClick={deleteLocation}>Delete</Button>
                    <Button onClick={() => setGrantModalOpen(false)}>Cancel</Button>
                </div>
            </Modal>

            <SubpageHeader
                pageTitle={"Manage Location Access"}
                backUrl={"/module/1/manage"}
            />

            <main>
                <h1>Location "{location.name}"</h1>
                <p>Share this location with the gate keepers.</p>

                <Button>
                    <Icon shield-alt /> Share with Gate Keepers
                </Button>

                <Link to="/module/1/grant">
                    <Button><Icon user-plus /> Grant Access</Button>
                </Link>

                <h1>{location.grants.length} people have access</h1>
                {location.grants.length === 0
                    ? <p>No people have access yet.</p>
                    : <p>You have granted access to the following people:</p>}

                {location.grants.map(g => (
                    <CredentialCard
                        issuerName={"x days ago"}
                        title={g.subjectId} />

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
