import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { BottomTools } from "../components/BottomTools";
import { CredentialCard } from "../components/CredentialCard";
import { HomepageHeader } from "../components/HomepageHeader";
import { attributeQuery } from "../services";
import { LocalAttr } from "../types/types";

export const CredentialIndexPage: React.FC = () => {

    const [attributes, setAtt] = useState<LocalAttr[]>([]);

    useEffect(() => {
        attributeQuery.listAttributes().then((a) => setAtt(a))
            .catch(e => console.error(e))
    }, []);

    const lang = "nl_NL";

    console.log("Render");

    return (
        <div>
            <HomepageHeader />

            <main>
                <h1>Credentials</h1>
                {attributes.map(c =>
                    <Link to={`/detail/${encodeURIComponent(c.hash)}`} key={c.hash}>
                        <CredentialCard
                            imageUrl={c.provider.logo_url}
                            title={c.title[lang]}
                            issuerName={c.provider.title[lang]}
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
