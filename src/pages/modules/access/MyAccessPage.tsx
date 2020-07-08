import { OWAttestedAttr } from "@tsow/ow-ssi/dist/types/modules/browser/ow";
import React, { useEffect, useState } from 'react';
import { CredentialCard } from "../../../components/CredentialCard";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { useSelector } from "../../../hooks/useSelector";
import { getAllLocations } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";
import { getContacts } from "../../../services/local/selectors";
import { theWallet } from "../../../services/services";

export const ModuleMyAccessPage: React.FC = () => {

    const prefix = "access."
    const [attributes, setA] = useState<OWAttestedAttr[]>([]);
    useEffect(() => {
        theWallet.agent.repo.all()
            .then(a => a.filter(x => x.name.startsWith(prefix)))
            .then(a => setA(a))
    }, [])

    const locations = useAMSelector(getAllLocations);
    const attrLocationId = (a: OWAttestedAttr) => a.name.replace(/^access\.loc:/, "")
    const attrLocationName = (a: OWAttestedAttr) => {
        const id = attrLocationId(a);
        const loc = locations.find(l => l.id === attrLocationId(a))

        return loc ? loc.name : `Unknown Location<${id}>`
    }

    const knownContacts = useSelector(getContacts);
    const displayContact = (mid: string) =>
        knownContacts.find(p => p.mid === mid) ||
        { name: `Anonymous<${mid.substr(0, 10)}...>`, mid }

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"My Access"}
                backUrl={"/module/1"}
            />

            <main>
                <h1>My Access</h1>
                <p>These are the sites that you have access to.</p>

                {attributes.map(attr => (
                    <CredentialCard
                        issuerName={`Granted by: ` + displayContact(attr.signer_mid_b64).name}
                        title={`Location: ` + attrLocationName(attr)} />
                ))}
            </main>

        </div>
    )
}
