import React from 'react';
import { Button } from "../../../components/Button";
import { CredentialCard } from "../../../components/CredentialCard";
import { Icon } from "../../../components/Icon";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { getMyLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";

export const ModuleGrantAccessPage: React.FC<Props> = ({ siteId }) => {

    const locations = useAMSelector(getMyLocations);
    const site = locations.find(l => l.id === siteId);

    return !site ? <div>...</div> : (
        <div className="subpage nav-compact">

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

                <Button><Icon users /> Share with a Contact</Button>

                <Button><Icon id-badge /> Scan a Badge</Button>

                <Button><Icon share-alt /> Share a Link</Button>

            </main>

        </div>
    )
}

export interface Props {
    siteId: string;
}
