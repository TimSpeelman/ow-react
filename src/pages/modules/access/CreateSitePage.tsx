import React, { FormEvent, useState } from 'react';
import { Link } from "react-router-dom";
import uuid from "uuid/v4";
import { Button } from "../../../components/Button";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { useServices } from "../../../hooks/useServices";
/** A manager adds the locations he controls on this page */
export const ModuleCreateSitePage: React.FC = () => {

    const [name, setName] = useState("");

    const { services } = useServices();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const id = uuid();
        services?.accessModuleService.addLocation({ name, grants: [], id })

        window.location.assign("#/module/1/manage");
    }

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"New Location"}
                backUrl={"/module/1"}
            />

            <main>
                <h1>Create a new Location</h1>
                <p>Add a location if you manage who can access it.</p>

                <form onSubmit={handleSubmit}>
                    <label>Location Name</label>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <Button type="submit" primary>Add Location</Button>

                    <Link to="/module/1/manage">
                        <Button>Cancel</Button>
                    </Link>
                </form>

            </main>

        </div>
    )
}
