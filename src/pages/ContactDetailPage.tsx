import React from 'react';
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { getProviderByMid } from "../services/local/selectors";

export const ContactDetailPage: React.FC<Props> = ({ providerMid }) => {

    const { fromLanguageDict } = useInternationalization();

    const provider = useSelector(getProviderByMid(providerMid));

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
                <table>
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
                </table>

                <h2>Credentials</h2>
                <p>{fromLanguageDict(provider.title)} offers the following credentials:</p>

                {Object.values(provider.procedures).map(procedure => (
                    <div className="card-item">
                        <div className="row">
                            <div className="logo-box">
                                <img src={provider.logo_url} alt="" />
                            </div>
                            <div className="text-box">
                                <div className="primary">{fromLanguageDict(procedure.title)}</div>
                                <div className="secondary">{fromLanguageDict(provider.title)}</div>
                            </div>
                            <div className="tool">

                            </div>
                        </div>
                    </div>
                ))}
            </main>

        </div>
    )
}

interface Props {
    providerMid: string;
}