import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useParams } from "react-router-dom";
import './assets/css/font-awesome.min.css';
import './assets/css/index.css';
import { Sidemenu } from "./components/Sidemenu";
import { DemoPage } from "./demo";
import { CredentialCreateFlow } from "./flows/CredentialCreateFlow";
import { CredentialVerifyFlow } from "./flows/CredentialVerifyFlow";
import { useServices } from "./hooks/useServices";
import { DecodeStatus } from "./modules/QR/GenericDecoding";
import { BadgePage } from "./pages/BadgePage";
import { ConfirmContactPage } from "./pages/ConfirmContactPage";
import { ConfirmIncomingVerificationPage } from "./pages/ConfirmIncomingVerificationPage";
import { ContactDetailPage } from "./pages/ContactDetailPage";
import { ContactIndexPage } from "./pages/ContactIndexPage";
import { CredentialDetailPage } from "./pages/CredentialDetailPage";
import { CredentialIndexPage } from "./pages/CredentialIndexPage";
import { DebugPage } from "./pages/DebugPage";
import { ModuleCreateSitePage } from "./pages/modules/access/CreateSitePage";
import { ModuleGrantAccessPage } from "./pages/modules/access/GrantAccessPage";
import { ModuleManageSitePage } from "./pages/modules/access/ManageSitePage";
import { ModuleManageSitesPage } from "./pages/modules/access/ManageSitesPage";
import { ModuleMyAccessPage } from "./pages/modules/access/MyAccessPage";
import { ModuleStartPage } from "./pages/modules/access/StartPage";
import { ModuleTrustedSitesPage } from "./pages/modules/access/TrustedSitesPage";
import { ModuleAccessVerifyPage } from "./pages/modules/access/VerifyPage";
import { ModuleAccessVerifyResultPage } from "./pages/modules/access/VerifyResultPage";
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
                <Route path="/module/1/create"><ModuleCreateSitePage /></Route>
                <Route path="/module/1/grant"><ModuleGrantAccessPage /></Route>
                <Route path="/module/1/my"><ModuleMyAccessPage /></Route>
                <Route path="/module/1/manage-site/:siteId"><SpecificManageSitePage /></Route>
                <Route path="/module/1/manage"><ModuleManageSitesPage /></Route>
                <Route path="/module/1/trusted-sites"><ModuleTrustedSitesPage /></Route>
                <Route path="/module/1/verify/result"><ModuleAccessVerifyResultPage /></Route>
                <Route path="/module/1/verify"><ModuleAccessVerifyPage /></Route>
                <Route path="/module/1"><ModuleStartPage /></Route>
                <Route path="/debug"><DebugPage /></Route>
                <Route path="/badge"><BadgePage /></Route>
                <Route path="/x"><DemoPage /></Route>
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

function SpecificManageSitePage() {
    let params: any = useParams();
    return <ModuleManageSitePage siteId={params.siteId} />
}
