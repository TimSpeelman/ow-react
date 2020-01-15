import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useParams } from "react-router-dom";
import './assets/css/font-awesome.min.css';
import './assets/css/index.css';
import { Sidemenu } from "./components/Sidemenu";
import { CredentialCreateFlow } from "./flows/CredentialCreateFlow";
import { CredentialVerifyFlow } from "./flows/CredentialVerifyFlow";
import { useServices } from "./hooks/useServices";
import { DecodeStatus } from "./modules/QR/GenericDecoding";
import { ConfirmContactPage } from "./pages/ConfirmContactPage";
import { ConfirmIncomingVerificationPage } from "./pages/ConfirmIncomingVerificationPage";
import { ContactDetailPage } from "./pages/ContactDetailPage";
import { ContactIndexPage } from "./pages/ContactIndexPage";
import { CredentialDetailPage } from "./pages/CredentialDetailPage";
import { CredentialIndexPage } from "./pages/CredentialIndexPage";
import { QrReaderPage } from "./pages/QrReaderPage";
import { qrDecoder } from "./services/QRService";

export const App: React.FC = () => <Router><AppBody /></Router>

export const AppBody: React.FC = () => {

    const { ready, error } = useServices();

    const history = useHistory();
    const onScanQR = (val: string) => {
        const res = qrDecoder.decode(val);
        if (res.status === DecodeStatus.Succeeded) {
            history.push("/verify/" + encodeURIComponent(JSON.stringify(res.result)));
        }
    }

    return !ready ? (error ? <div>Oops! Is the localhost offline?</div> : <div>Connecting to services..</div>) : (
        <div>
            <Sidemenu />

            <Switch>
                <Route path="/create"><CredentialCreateFlow /></Route>
                <Route path="/verify/:offer"><SpecificCredentialVerifyFlow /></Route>
                <Route path="/detail/:id"><SpecificCredentialDetailPage /></Route>
                <Route path="/contacts/:mid"><SpecificContactDetailPage /></Route>
                <Route path="/contacts"><ContactIndexPage /></Route>
                <Route path="/confirm-contact"><ConfirmContactPage /></Route>
                <Route path="/confirm-verify"><ConfirmIncomingVerificationPage /></Route>
                <Route path="/qr"><QrReaderPage onScanQR={onScanQR} /></Route>
                <Route path="/"><CredentialIndexPage /></Route>
            </Switch>
        </div>
    );
}

function SpecificCredentialVerifyFlow() {
    let params: any = useParams();
    return <CredentialVerifyFlow verifyOffer={JSON.parse(decodeURIComponent(params.offer))} />
}

function SpecificCredentialDetailPage() {
    let params: any = useParams();
    return <CredentialDetailPage id={decodeURIComponent(params.id)} />
}

function SpecificContactDetailPage() {
    let params: any = useParams();
    return <ContactDetailPage providerMid={decodeURIComponent(params.mid)} />
}
