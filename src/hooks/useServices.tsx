import { IPv8 } from "@tsow/ow-ssi";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PeerCallback } from "../services";
import { AttributesService } from "../services/AttributeService";
import { LocalAPI } from "../services/local/LocalAPI";
import { LocalState } from "../services/local/LocalState";
import { ProviderService } from "../services/ProviderService";
import { ReferenceService } from "../services/ReferenceService";
import { OpenWalletService } from "../shared/openwallet.service";

/** The Context object available to consumers */
export interface ServiceList {
    localAPI: LocalAPI;
    localState: LocalState;
    ipv8API: IPv8.IPv8API;
    attributeService: AttributesService;
    callbackService: ReferenceService<PeerCallback>;
    providersService: ProviderService;
    owService: OpenWalletService;
    verifierService: IPv8.VerifierService;
}

export interface ServicesContext {
    ready: boolean;
    error: boolean;
    services: ServiceList | null;
    path: string;
}


// Create a react context with dummy default value
const Context = createContext<ServicesContext>({} as ServicesContext);

export const ServicesContextProvider: React.FC<Props> = ({ children, initServices, path }) => {
    const [services, setContext] = useState<ServiceList | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        initServices().then(s => setContext(s)).catch(setError);
    }, []);

    const context = {
        ready: !!services,
        error,
        services,
        path
    }

    return <Context.Provider value={context}>{children}</Context.Provider>
}

export const useServices = () => {
    return useContext(Context);
};

interface Props {
    initServices: () => Promise<ServiceList>
    path: string;
}