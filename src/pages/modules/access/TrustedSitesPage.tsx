import React, { useState } from 'react';
import { CredentialCard } from "../../../components/CredentialCard";
import { SubpageHeader } from "../../../components/SubpageHeader";

export const ModuleTrustedSitesPage: React.FC = () => {

    const sites = [{ name: "Nijmegen" }, { name: "Delft" }, { name: "Enschede" }, { name: "Utrecht" }]
    const options = sites.map(s => ({ value: s.name, label: s.name }))

    const [selectedSite, setSite] = useState("");
    const [status, setStatus] = useState("succeeded");
    const site = sites[0];

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Trusted Sites"}
                backUrl={"/module/1/roots"}
            />

            <main>
                <h1>Trusted Parties</h1>
                <p>These are the sites and managers you trust to control them.
                     To add one, ask a manager to share a site with you.</p>

                <CredentialCard
                    issuerName={"Trusted Manager: Helga J"}
                    title={"Nijmegen Construction"} />

                <CredentialCard
                    issuerName={"Trusted Manager: Tim S"}
                    title={"Delft Campus"} />
            </main>

        </div>
    )
}
