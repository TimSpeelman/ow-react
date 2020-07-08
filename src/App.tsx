import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useParams } from "react-router-dom";
import './assets/css/font-awesome.min.css';
import './assets/css/index.css';
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { Sidemenu } from "./components/Sidemenu";
import { DemoPage } from "./demo";
import { CredentialCreateFlow } from "./flows/CredentialCreateFlow";
import { CredentialVerifyFlow } from "./flows/CredentialVerifyFlow";
import { useServices } from "./hooks/useServices";
import { DecodeStatus } from "./modules/QR/GenericDecoding";
import { BadgePage } from "./pages/BadgePage";
import { ConfirmContactPage } from "./pages/ConfirmContactPage";
import { ConfirmIncomingVerificationPage } from "./pages/ConfirmIncomingVerificationPage";
import { ContactAddPage } from "./pages/ContactAddPage";
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
import { PromptType } from "./services/PromptService";
import { qrDecoder } from "./services/QRService";
import { theWallet } from "./services/services";

export const App: React.FC = () => <Router><AppBody /></Router>

// @ts-ignore
window.promptme = theWallet.prompt.prompt.bind(theWallet.prompt);

export const Prompter: React.FC = () => {
    const [p, setP] = useState<PromptType>();
    const [open, setOpen] = useState(false);

    const onPrompt = (p: PromptType) => {
        setP(p);
        setOpen(true);
    }

    const onSubmit = (a: any) => {
        theWallet.prompt.answer(a);
        setOpen(false);
    }

    useEffect(() => { theWallet.prompt.promptHandler = onPrompt; }, [])

    return <Modal
        onRequestClose={() => { }} // ignore
        open={open}
    >
        <p>{p?.text}</p>
        {p?.type === "Info" ? (
            <Button onClick={() => onSubmit(false)}>Ok</Button>
        ) : (
                <div>
                    <Button onClick={() => onSubmit(true)}>Yes</Button>
                    <Button onClick={() => onSubmit(false)}>No</Button>
                </div>
            )}
    </Modal>
}

export const AppBody: React.FC = () => {

    const { ready, error } = useServices();

    if (error) { console.log(error) }

    const history = useHistory();
    const onScanQR = (val: string) => {
        const res = qrDecoder.decode(val);
        if (res.status === DecodeStatus.Succeeded) {
            history.push("/verify/" + encodeURIComponent(JSON.stringify(res.result)));
        }
    }

    return !ready ? (
        <div className="subpage nav-compact">
            <main className="flex-center">
                {(error ? <p>Oops! An error occurred: {error.message}</p> : <p>Connecting to services..</p>)}
            </main>
        </div>
    ) : (
            <div>
                <Prompter />

                <Sidemenu />

                <Switch>
                    <Route path="/module/1/create"><ModuleCreateSitePage /></Route>
                    <Route path="/module/1/my-locs/:siteId/grant"><SpecificGrantAccessPage /></Route>
                    <Route path="/module/1/my-locs/:siteId"><SpecificManageSitePage /></Route>
                    <Route path="/module/1/my-locs"><ModuleManageSitesPage /></Route>
                    <Route path="/module/1/my"><ModuleMyAccessPage /></Route>
                    <Route path="/module/1/trusted-sites"><ModuleTrustedSitesPage /></Route>
                    <Route path="/module/1/verify/:siteId/:mid/"><SpecificAccessVerifyResultPage /></Route>
                    <Route path="/module/1/verify"><ModuleAccessVerifyPage /></Route>
                    <Route path="/module/1"><ModuleStartPage /></Route>
                    <Route path="/debug"><DebugPage /></Route>
                    <Route path="/badge"><BadgePage /></Route>
                    <Route path="/x"><DemoPage /></Route>
                    <Route path="/create"><CredentialCreateFlow /></Route>
                    <Route path="/verify/:offer"><SpecificCredentialVerifyFlow /></Route>
                    <Route path="/detail/:id"><SpecificCredentialDetailPage /></Route>
                    <Route path="/contacts/add"><ContactAddPage /></Route>
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

function SpecificGrantAccessPage() {
    let params: any = useParams();
    return <ModuleGrantAccessPage siteId={params.siteId} />
}

function SpecificAccessVerifyResultPage() {
    let params: any = useParams();
    return <ModuleAccessVerifyResultPage siteId={params.siteId} mid={params.mid} />
}
