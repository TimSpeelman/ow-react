import React, { useState } from 'react';
import { Button } from "../../../components/Button";
import { CredentialCard } from "../../../components/CredentialCard";
import { Icon } from "../../../components/Icon";
import { SubpageHeader } from "../../../components/SubpageHeader";

export const ModuleGrantAccessPage: React.FC = () => {

    const sites = [{ name: "Nijmegen" }, { name: "Delft" }, { name: "Enschede" }, { name: "Utrecht" }]
    const options = sites.map(s => ({ value: s.name, label: s.name }))

    const [selectedSite, setSite] = useState("");
    const [status, setStatus] = useState("succeeded");
    const site = sites[0];

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Grant Location Access"}
                backUrl={"/module/1/manage-site"}
            />

            <main>
                <h1>Grant Access</h1>
                <p>You are about to grant someone access to the following location:</p>

                <CredentialCard
                    issuerName={"2 people have access"}
                    title={"Nijmegen Construction"} />

                <p>How would you like to share this access?</p>

                <Button><Icon users /> Share with a Contact</Button>

                <Button><Icon id-badge /> Scan a Badge</Button>

                <Button><Icon share-alt /> Share a Link</Button>

            </main>

        </div>
    )
}
