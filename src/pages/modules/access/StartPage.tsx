import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { SubpageHeader } from "../../../components/SubpageHeader";

export const ModuleStartPage: React.FC = () => {

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Module Site Access"}
                backUrl={"/"}
            />

            <main>
                <div style={{ textAlign: "center" }}>
                    <p>This module allows you to manage and check someone's
                    access to construction sites.</p>

                    <Link to="/module/1/my">
                        <Button><Icon wallet /> My Access</Button>
                    </Link> <br />

                    <Link to="/module/1/verify">
                        <Button><Icon shield-alt /> Verify Access</Button>
                    </Link> <br />

                    <Link to="/module/1/manage">
                        <Button><Icon tasks /> Manage Access</Button>
                    </Link> <br />


                </div>
            </main>

        </div>
    )
}
