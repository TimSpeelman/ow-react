import { OWAttestedAttr } from "@tsow/ow-ssi/dist/types/modules/browser/ow";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { HomepageHeader } from "../components/HomepageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { getContacts, getProviders } from "../services/local/selectors";
import { theWallet } from "../services/services";
import { LocalAttr } from "../types/types";

export const CredentialIndexPage: React.FC = () => {

    const providers = useSelector(getProviders);
    const contacts = useSelector(getContacts);
    const [attributes, setAttrs] = useState<OWAttestedAttr[]>([]);
    useEffect(() => {
        theWallet.agent.repo.all().then(setAttrs);
    }, [])

    const { fromLanguageDict } = useInternationalization();
    const getProviderByMid = (mid: string) => providers.find(p => p.mid_b64 === mid);
    const getContactByMid = (mid: string) => contacts.find(p => p.mid === mid);

    return (
        <div>
            <HomepageHeader />

            <main>
                <h1>Credentials</h1>
                {attributes.map(c => {
                    const provider = getProviderByMid(c.signer_mid_b64);
                    const contact = getContactByMid(c.signer_mid_b64);

                    return provider ? (
                        <Link to={`/detail/${encodeURIComponent(c.hash)}`} key={c.hash}>
                            <CredentialCard
                                imageUrl={getProviderByMid(c.signer_mid_b64)?.logo_url}
                                title={fromLanguageDict(c.title)}
                                issuerName={fromLanguageDict(getProviderByMid(c.signer_mid_b64)?.title || {})}
                            />
                        </Link>
                    ) : (
                            <Link to={`/detail/${encodeURIComponent(c.hash)}`} key={c.hash}>
                                <CredentialCard
                                    title={c.name}
                                    issuerName={contact ? contact.name : `Anonymous<${c.signer_mid_b64.substr(0, 10)}...>`}
                                />
                            </Link>
                        )
                })}
            </main>

            <BottomTools showQR={true} showPlus={true} />
        </div>
    )
}


// export class CredentialIndexPage extends React.Component<{}, State> {

//     state: State = {
//         attributes: []
//     }

//     componentDidMount() {
//         this.loadAttributes();
//     }

//     async loadAttributes() {
//         const attributes = await attributeQuery.listAttributes();
//         this.setState({ attributes });
//     }

//     render() {
//         const lang = "nl_NL";
//         const { attributes } = this.state;

//         return (
//             <div>
//                 <HomepageHeader />

//                 <main>
//                     <h1>Credentials</h1>
//                     {attributes.map(c =>
//                         <Link to={`/detail/${encodeURIComponent(c.hash)}`} key={c.hash}>
//                             <CredentialCard
//                                 imageUrl={c.provider.logo_url}
//                                 title={c.title[lang]}
//                                 issuerName={c.provider.title[lang]}
//                             />
//                         </Link>
//                     )}
//                 </main>

//                 <BottomTools showQR={true} showPlus={true} />

//             </div>
//         )

//     }
// }

interface State {
    attributes: LocalAttr[];
}
