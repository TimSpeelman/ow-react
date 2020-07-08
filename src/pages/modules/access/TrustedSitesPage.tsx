import React from 'react';
import { CredentialCard } from "../../../components/CredentialCard";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { useServices } from "../../../hooks/useServices";
import { getTrustedLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";

export const ModuleTrustedSitesPage: React.FC = () => {

    const sites = useAMSelector(getTrustedLocations);
    const { services } = useServices();
    const contactService = services!.contactService;
    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Trusted Sites"}
                backUrl={"/module/1/roots"}
            />

            <main>
                <h1>Trusted Locations ({sites.length})</h1>
                <p>These are the sites and managers you trust to control them.
                     To add one, ask a manager to share a site with you.</p>

                {sites.map(loc => (
                    <CredentialCard
                        issuerName={`Trusted Manager: ${contactService.getNameString(loc.rootMid)}`}
                        title={loc.name} />
                ))}

            </main>

        </div>
    )
}
