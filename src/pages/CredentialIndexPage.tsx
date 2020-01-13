import React from 'react';
import { Link } from "react-router-dom";
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { HomepageHeader } from "../components/HomepageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { getAttributes } from "../services/local/selectors";
import { LocalAttr } from "../types/types";

export const CredentialIndexPage: React.FC = () => {

    const attributes = useSelector(getAttributes);
    const { fromLanguageDict } = useInternationalization();

    return (
        <div>
            <HomepageHeader />

            <main>
                <h1>Credentials</h1>
                {attributes.map(c =>
                    <Link to={`/detail/${encodeURIComponent(c.hash)}`} key={c.hash}>
                        <CredentialCard
                            imageUrl={c.provider.logo_url}
                            title={fromLanguageDict(c.title)}
                            issuerName={fromLanguageDict(c.provider.title)}
                        />
                    </Link>
                )}
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
