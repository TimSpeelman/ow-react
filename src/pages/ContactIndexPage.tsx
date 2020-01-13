import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { providersService } from "../services";
import { getProviders } from "../services/local/selectors";

export const ContactIndexPage: React.FC = () => {

    const { fromLanguageDict } = useInternationalization();

    const providers = useSelector(getProviders);

    const peopleCount = 0;

    const [contactUrl, setContactUrl] = useState("");
    const [pending, setPending] = useState(false);
    const saveContact = (url: string) => {
        setPending(true);
        providersService?.addByURL(url).then(() => {
            setContactUrl("");
        }).catch((e) => {
            alert("Failed to add that provider");
        }).finally(() => setPending(false));
    }

    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Contacts"}
                backUrl={"/"}
            />

            <main>
                <h1>People ({peopleCount})</h1>
                <h1>Organisations ({providers.length})</h1>
                {providers.map(provider => (
                    <Link to={`/contacts/${encodeURIComponent(provider.mid_b64)}`}>
                        <div className="card-item clickable">
                            <div className="row">
                                <div className="logo-box">
                                    <img src={provider.logo_url} alt="" />
                                </div>
                                <div className="text-box">
                                    <div className="primary">{fromLanguageDict(provider.title)}</div>
                                </div>
                                <div className="tool">
                                    <div className="clickable">
                                        <Icon info-circle />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                <h1>Add By URL</h1>
                <form onSubmit={() => saveContact(contactUrl)}>
                    <div className="col-xs-12">
                        <input type="url" className="text-input" placeholder="Enter the URL of the provider"
                            required value={contactUrl} onChange={(e) => setContactUrl(e.target.value)} />
                        <br />
                        <br />
                        <Button type={"submit"} primary isPending={pending}>Add Contact</Button>
                    </div>
                </form>
            </main>

        </div>
    )

}
