import { IPv8API } from "@tsow/ow-attest";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PeerCallback } from "../services";
import { AttributeQuery } from "../services/AttributeQuery";
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
    ipv8API: IPv8API;
    attributeService: AttributesService;
    attributeQuery: AttributeQuery;
    callbackService: ReferenceService<PeerCallback>;
    providersService: ProviderService;
    owService: OpenWalletService;
}

export interface ServicesContext {
    ready: boolean;
    services: ServiceList | null;
}


// Create a react context with dummy default value
const Context = createContext<ServicesContext>({} as ServicesContext);

export const ServicesContextProvider: React.FC<Props> = ({ children, initServices }) => {
    const [services, setContext] = useState<ServiceList | null>(null);

    useEffect(() => {
        initServices().then(s => setContext(s));
    }, []);

    const context = {
        ready: !!services,
        services,
    }

    return <Context.Provider value={context}>{children}</Context.Provider>
}

export const useServices = () => {
    return useContext(Context);
};

interface Props {
    initServices: () => Promise<ServiceList>
}