import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { SelectInput } from "../../../components/SelectInput";
import { SubpageHeader } from "../../../components/SubpageHeader";

export const ModuleAccessVerifyPage: React.FC = () => {

    const sites = [{ name: "Nijmegen" }, { name: "Delft" }, { name: "Enschede" }, { name: "Utrecht" }]
    const options = sites.map(s => ({ value: s.name, label: s.name }))

    const [selectedSite, setSite] = useState("");

    return (
        <div className="subpage nav-compact">

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

                <Link to="/module/1/trusted-sites">
                    <Button><Icon plus /> Add a different site</Button>
                </Link> <br />

                {(selectedSite !== "") && (
                    <Link to="/qr">
                        <Button primary><Icon id-badge /> Scan Visitor's Badge</Button>
                    </Link>
                )}
            </main>

        </div>
    )
}
