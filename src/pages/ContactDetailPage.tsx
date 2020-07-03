import React from 'react';
import { Button } from "../components/Button";
import { CredentialCard } from "../components/CredentialCard";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { useServices } from "../hooks/useServices";
import { getProviderByMid } from "../services/local/selectors";

export const ContactDetailPage: React.FC<Props> = ({ providerMid }) => {

    const { fromLanguageDict } = useInternationalization();
    const { services } = useServices();
    const provider = useSelector(getProviderByMid(providerMid));

    const reloadProvider = (e: any) => {
        e.preventDefault();
        services!.providersService?.addByURL(provider!.url).then(() => {
            console.log("Reloaded provider")
        }).catch()
    }

    return !provider ? <div>Oops! Provider not found</div> : (

        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Contact"}
                backUrl={"/contacts"}
            />

            <main>
                <img src={provider.logo_url} alt={fromLanguageDict(provider.title)} />
                <h1>{fromLanguageDict(provider.title)}</h1>
                <p>{fromLanguageDict(provider.description)}</p>
                <Button onClick={reloadProvider}>Reloads</Button>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{provider.mid_b64}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>{provider.website}</td>
                        </tr>
                        <tr>
                            <th>Attestation Server URL</th>
                            <td><a href={provider.url + "/about"}>{provider.url}</a></td>
                        </tr>
                    </tbody>
                </table>

                <h2>Credentials</h2>
                <p>{fromLanguageDict(provider.title)} offers the following credentials:</p>

                {Object.values(provider.recipes).map(recipe => (
                    <CredentialCard
                        imageUrl={provider.logo_url}
                        title={fromLanguageDict(recipe.title)}
                        issuerName={fromLanguageDict(provider.title)}
                        key={recipe.name}
                    />
                ))}
            </main>

        </div>
    )
}

interface Props {
    providerMid: string;
}