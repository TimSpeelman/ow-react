import React from 'react';
import { HashRouter as Router, Route, Switch, useParams } from "react-router-dom";
import './assets/css/font-awesome.min.css';
import './assets/css/index.css';
import { ConfirmContactPage } from "./pages/ConfirmContactPage";
import { ConfirmIncomingVerificationPage } from "./pages/ConfirmIncomingVerificationPage";
import { ContactDetailPage } from "./pages/ContactDetailPage";
import { ContactIndexPage } from "./pages/ContactIndexPage";
import { CreateCredentialPage } from "./pages/CreateCredentialPage";
import { CredentialDetailPage } from "./pages/CredentialDetailPage";
import { CredentialIndexPage } from "./pages/CredentialIndexPage";
import { ReceiveAttributesPage } from "./pages/ReceiveAttributesPage";
import { ShareRequestPage } from "./pages/ShareRequestPage";

const App: React.FC = () => {
    return (
        <Router>
            <div className="sside-menu-open">
                <div className="side-menu-close" >
                    <span className="fas fa-times"></span>
                </div>
                <div className="side-menu-backdrop" ></div>
                <div className="side-menu">
                    <ul>
                        <li>
                            <a href="/attestations" >
                                <span className="fas fa-id-card"></span>
                                <span>Credentials</span>
                            </a>
                        </li>
                        <li>
                            <a href="/contacts" >
                                <span className="fas fa-users"></span>
                                <span>Contacts</span>
                            </a>
                        </li>
                        <li>
                            <a className="disabled">
                                <span className="fas fa-info-circle"></span>
                                <span>About</span>
                            </a>
                        </li>
                        <li>
                            <a className="disabled">
                                <span className="fas fa-cog"></span>
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <Switch>
                    <Route path="/create">
                        <CreateCredentialPage />
                    </Route>
                    <Route path="/detail/:id">
                        <SpecificCredentialDetailPage />
                    </Route>
                    <Route path="/receive">
                        <ReceiveAttributesPage />
                    </Route>
                    <Route path="/share">
                        <ShareRequestPage />
                    </Route>
                    <Route path="/contacts">
                        <ContactIndexPage />
                    </Route>
                    <Route path="/contact">
                        <ContactDetailPage />
                    </Route>
                    <Route path="/confirm-contact">
                        <ConfirmContactPage />
                    </Route>
                    <Route path="/confirm-verify">
                        <ConfirmIncomingVerificationPage />
                    </Route>
                    <Route path="/">
                        <CredentialIndexPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

function SpecificCredentialDetailPage() {
    let params: any = useParams();
    return <CredentialDetailPage id={decodeURIComponent(params.id)} />
}
