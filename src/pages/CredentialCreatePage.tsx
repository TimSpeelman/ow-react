import { ServerDescriptor } from "@tsow/ow-attest";
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SelectInput, SelectOption } from "../components/SelectInput";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useLocalState } from "../hooks/useLocalState";
import { Dict } from "../types/Dict";

export const CredentialCreatePage: React.FC<Props> = ({ onSubmitRequest }) => {

    const { langCode } = useInternationalization();
    const { state } = useLocalState();

    const [provider, setProvider] = useState<string>("");
    const [procedure, setProcedure] = useState<string>("");
    const [provOnline] = useState<null | boolean>(true);
    const [pending, setPending] = useState(false);

    // Clear the chosen procedure once user changes the provider
    useEffect(() => setProcedure(""), [provider]);

    const providers = useMemo(() => formatProviders(state.providers, langCode), [state.providers, langCode]);
    const procedures = useMemo(() => formatProcedures(state.providers, provider, langCode), [state.providers, provider, langCode]);

    const handleSubmit = () => {
        setPending(true);
        onSubmitRequest(provider, procedure);
    }

    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Request Credential"}
                backUrl={"/"}
            />
            <main className="text-center">
                <h1>Request new credentials</h1>


                {providers.length === 0 ? (
                    <div>
                        <p>You don't know any providers yet.. Please add one to your
                        contacts first.</p>

                        <Link to="/contacts"><Button primary>Go to contacts</Button></Link>
                    </div>
                ) : (
                        <div>
                            <p>Please pick a provider and the credential you wish to obtain.</p>

                            <SelectInput
                                options={providers}
                                value={provider}
                                onChange={setProvider}
                                emptyMessage={"Select a provider please"}
                            />
                        </div>
                    )}

                {!provider ? "" :
                    <SelectInput
                        options={procedures}
                        value={procedure}
                        onChange={setProcedure}
                        emptyMessage={"Select your attribute"}
                    />
                }

                <br />
                <br />

                {provOnline === false ? <p>This provider seems to be offline..</p> : ""}

                {!provider || !procedure ? "" : <Button onClick={handleSubmit} isPending={pending} disabled={!provOnline || !provider || !procedure}>
                    Request Attribute</Button>}
            </main>
        </div>

    )

}


function formatProviders(providers: Dict<ServerDescriptor>, langCode: string): SelectOption[] {
    return Object.keys(providers).map(key =>
        ({
            value: providers[key].id,
            label: providers[key].title[langCode],
        })).sort((a, b) => a.label > b.label ? -1 : 1);
}

function formatProcedures(providers: Dict<ServerDescriptor>, provId: string, langCode: string): SelectOption[] {
    const prov = providers[provId];
    if (!prov) return [];
    const procs = Object.values(prov.procedures);
    return procs.map(proc =>
        ({
            value: proc.procedure_name,
            label: proc.title[langCode],
        })).sort((a, b) => a.label > b.label ? -1 : 1);
}

interface Props {
    onSubmitRequest: (providerId: string, procedureId: string) => any;
}