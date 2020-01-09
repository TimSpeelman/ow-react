import React from 'react';
import { Button } from "../components/Button";
import { SelectInput } from "../components/SelectInput";
import { SubpageHeader } from "../components/SubpageHeader";

export class CreateCredentialPage extends React.Component<{}, State> {

    state = {
        selectedProvider: 2,
        selectedAttribute: 2,
        providerOnline: false,
        pending: false,
    }

    toggleMenu() {
        // globals.menuOpen = true
    }

    requestAttestation() {
        //
    }

    render() {
        return (
            <div className="subpage nav-compact">
                <SubpageHeader
                    pageTitle={"Request Credential"}
                    backUrl={"/"}
                    toggleMenu={() => { }}
                />
                <main className="text-center">
                    <h1>Request new credentials</h1>
                    <p>Please pick a provider and the credential you wish to obtain.</p>

                    <SelectInput
                        options={[{ value: 1, label: "Hoi" }, { value: 2, label: "Yo" }]}
                        value={this.state.selectedProvider}
                        onChange={(v) => alert(v)}
                        emptyMessage={"Select a provider please"}
                    />

                    <SelectInput
                        options={[{ value: 1, label: "Hoi" }, { value: 2, label: "Yo" }]}
                        value={this.state.selectedAttribute}
                        onChange={(v) => alert(v)}
                        emptyMessage={"Select your attribute"}
                    />
                    <br />
                    <br />

                    {this.state.providerOnline ? "" : <p>This provider seems to be offline..</p>}

                    <Button onClick={() => this.togglePending()} isPending={this.state.pending}>Request Attribute</Button>
                </main>
            </div>

        )
    }

    togglePending() {
        this.setState(s => ({
            pending: !s.pending,
        }))
    }

}

interface State {
    selectedProvider: any,
    selectedAttribute: any,
    providerOnline: boolean,
    pending: boolean,
}