import React from 'react';
import { HashRouter as Router, Route, Switch, useParams } from "react-router-dom";
import './assets/css/font-awesome.min.css';
import './assets/css/index.css';
import { Sidemenu } from "./components/Sidemenu";
import { CredentialCreateFlow } from "./flows/CredentialCreateFlow";
import { ConfirmContactPage } from "./pages/ConfirmContactPage";
import { ConfirmIncomingVerificationPage } from "./pages/ConfirmIncomingVerificationPage";
import { ContactDetailPage } from "./pages/ContactDetailPage";
import { ContactIndexPage } from "./pages/ContactIndexPage";
import { CredentialDetailPage } from "./pages/CredentialDetailPage";
import { CredentialIndexPage } from "./pages/CredentialIndexPage";

export const App: React.FC = () => {

    return (
        <Router>
            <div>
                <Sidemenu />

                <Switch>
                    <Route path="/create"><CredentialCreateFlow /></Route>
                    <Route path="/detail/:id"><SpecificCredentialDetailPage /></Route>
                    <Route path="/contacts/:mid"><SpecificContactDetailPage /></Route>
                    <Route path="/contacts"><ContactIndexPage /></Route>
                    <Route path="/confirm-contact"><ConfirmContactPage /></Route>
                    <Route path="/confirm-verify"><ConfirmIncomingVerificationPage /></Route>
                    <Route path="/"><CredentialIndexPage /></Route>
                </Switch>
            </div>
        </Router>
    );
}

function SpecificCredentialDetailPage() {
    let params: any = useParams();
    return <CredentialDetailPage id={decodeURIComponent(params.id)} />
}

function SpecificContactDetailPage() {
    let params: any = useParams();
    return <ContactDetailPage providerMid={decodeURIComponent(params.mid)} />
}
