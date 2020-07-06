import React, { useState } from 'react';
import { CredentialCard } from "../../../components/CredentialCard";
import { SubpageHeader } from "../../../components/SubpageHeader";

export const ModuleMyAccessPage: React.FC = () => {

    const sites = [{ name: "Nijmegen" }, { name: "Delft" }, { name: "Enschede" }, { name: "Utrecht" }]
    const options = sites.map(s => ({ value: s.name, label: s.name }))

    const [selectedSite, setSite] = useState("");
    const [status, setStatus] = useState("succeeded");
    const site = sites[0];

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"My Access"}
                backUrl={"/module/1"}
            />

            <main>
                <h1>My Access</h1>
                <p>These are the sites that you have access to.</p>

                <CredentialCard
                    issuerName={"Helga J"}
                    title={"Nijmegen Construction"} />

                <CredentialCard
                    issuerName={"Tim S"}
                    title={"Delft Campus"} />
            </main>

        </div>
    )
}
