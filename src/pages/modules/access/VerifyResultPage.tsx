import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { SubpageHeader } from "../../../components/SubpageHeader";

export const ModuleAccessVerifyResultPage: React.FC = () => {

    const sites = [{ name: "Nijmegen" }, { name: "Delft" }, { name: "Enschede" }, { name: "Utrecht" }]
    const options = sites.map(s => ({ value: s.name, label: s.name }))

    const [selectedSite, setSite] = useState("");
    const [status, setStatus] = useState("succeeded");
    const site = sites[0];

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Verify Site Access"}
                backUrl={"/module/1"}
            />

            <main>
                {
                    status === "pending" && (
                        <div>
                            <p>Waiting for the other person to respond..</p>

                            <Link to="/module/1">
                                <Button>Cancel</Button>
                            </Link> <br />
                        </div>
                    )
                }

                {
                    status === "succeeded" && (
                        <div>
                            <p>The person was granted access to:</p>

                            <p><strong>{site.name}</strong></p>

                            <p>By your contact Tim Speelman</p>

                            <Link to="/module/1">
                                <Button>Return</Button>
                            </Link> <br />
                        </div>
                    )
                }

                {
                    status === "failed" && (
                        <div>
                            <p>This person does not have access.</p>

                            <Link to="/module/1">
                                <Button>Return</Button>
                            </Link> <br />
                        </div>
                    )
                }

            </main>

        </div>
    )
}
