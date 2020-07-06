import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { CredentialCard } from "../../../components/CredentialCard";
import { Icon } from "../../../components/Icon";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { getMyLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";

export const ModuleManageSitesPage: React.FC = () => {

    const sites = [{ name: "Nijmegen" }, { name: "Delft" }, { name: "Enschede" }, { name: "Utrecht" }]
    const options = sites.map(s => ({ value: s.name, label: s.name }))

    const locations = useAMSelector(getMyLocations);

    const [selectedSite, setSite] = useState("");
    const [status, setStatus] = useState("succeeded");
    const site = sites[0];

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Manage Location Access"}
                backUrl={"/module/1"}
            />

            <main>
                <h1>My Locations ({locations.length})</h1>
                <p>These are the locations of which you manage access. Click them to manage the people.</p>

                <Link to="/module/1/create">
                    <Button><Icon plus /> Add Location</Button>
                </Link>

                {locations.map(loc => (

                    <Link to={`/module/1/my-locs/${loc.id}`}>
                        <CredentialCard
                            issuerName={`${loc.grants.length} people have access`}
                            title={loc.name} />
                    </Link>

                ))}
            </main>

        </div>
    )
}
