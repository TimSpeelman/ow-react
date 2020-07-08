import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BottomTools } from "../components/BottomTools";
import { Button } from "../components/Button";
import { ContactCard } from "../components/ContactCard";
import { Icon } from "../components/Icon";
import { SubpageHeader } from "../components/SubpageHeader";
import { useInternationalization } from "../hooks/useInternationalization";
import { useSelector } from "../hooks/useSelector";
import { useServices } from "../hooks/useServices";
import { getContacts, getProviders } from "../services/local/selectors";
import { theWallet } from "../services/services";

export const ContactIndexPage: React.FC = () => {

    const { fromLanguageDict } = useInternationalization();
    const { services } = useServices();

    const providers = useSelector(getProviders);
    const contacts = useSelector(getContacts);


    const defaultContactUrl = "http://localhost"
    const [contactUrl, setContactUrl] = useState(defaultContactUrl);
    const [pending, setPending] = useState(false);
    const saveContact = (url: string) => {
        setPending(true);
        services!.providersService?.addByURL(url).then(() => {
            setContactUrl(defaultContactUrl);
        }).catch((e) => {
            alert("Failed to add that provider");
        }).finally(() => setPending(false));
    }

    const isEmpty = contacts.length === 0 && providers.length === 0;

    const isConnected = (mid: string) => false;
    const connect = (mid: string) => theWallet.agent.api.connectPeer(mid)
        .then((r) => theWallet.prompt.prompt({
            type: "Info",
            text: `Attempt to connect to ${mid} resulted in ${r.length} peers: ${JSON.stringify(r)}`
        }))
        .catch((e) => theWallet.prompt.prompt({
            type: "Info",
            text: `Attempt to connect to ${mid} gave error: ${e.message}.`
        }))

    return (
        <div className="subpage nav-compact">
            <SubpageHeader
                pageTitle={"Contacts"}
                backUrl={"/"}
            />

            {isEmpty ? (
                <main style={{ textAlign: "center" }} className={"flex-center"}>
                    <div>
                        <p>You have no contacts yet. By adding contacts your Wallet
                        can trust other Wallets.</p>

                        <Link to="/contacts/add">
                            <Button primary><Icon user-plus /> Add Contact</Button>
                        </Link>
                    </div>
                </main>
            ) : (
                    <main>

                        <h1>People ({contacts.length})</h1>

                        {contacts.length === 0 ? <small>No people yet..</small> :
                            contacts.map(contact => (
                                // <Link to={`/contacts/${encodeURIComponent(contact.mid)}`} key={contact.mid}>
                                <ContactCard title={contact.name} sub={contact.mid} onClickConnect={() => connect(contact.mid)}
                                    online={isConnected(contact.mid)} />
                                // </Link>
                            ))}

                        <h1>Organisations ({providers.length})</h1>
                        {providers.map(provider => (
                            // <Link to={`/contacts/${encodeURIComponent(provider.mid_b64)}`} key={provider.mid_b64}>
                            <ContactCard
                                logoUrl={provider.logo_url}
                                title={fromLanguageDict(provider.title)}
                                onClickConnect={() => connect(provider.mid_b64)}
                                online={isConnected(provider.mid_b64)}
                            />
                            // </Link>
                        ))}

                        <BottomTools>
                            <Link className="fab-btn secondary bottom-right" style={{ fontSize: "2em" }}
                                to="/contacts/add">
                                <Icon plus />
                            </Link>
                        </BottomTools>

                        {/* <hr /> */}

                        {/* <h1>Add By URL</h1>
                <form onSubmit={() => saveContact(contactUrl)}>
                    <div className="col-xs-12">
                        <input type="url" className="text-input" placeholder="Enter the URL of the provider"
                            required value={contactUrl} onChange={(e) => setContactUrl(e.target.value)} />
                        <br />
                        <br />
                        <Button type={"submit"} primary isPending={pending}>Add Contact</Button>
                    </div>
                </form> */}
                    </main>
                )}
        </div>
    )

}
