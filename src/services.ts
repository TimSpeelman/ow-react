import { IPv8API } from "@tsow/ow-attest";
import axios from "axios";
import { AttributeQuery } from "./services/AttributeQuery";
import { AppState } from "./shared/AppStateService";
import { LocalAPI } from "./shared/LocalAPI";

const localhostBase = 'http://localhost:8124';

const localhost = axios.create({
    baseURL: localhostBase + '/api',
});

const localAPI = new LocalAPI(localhost);

export const appState = new AppState(localAPI);
export const ipv8API = new IPv8API(localhostBase);
// export const attributeService = new AttributesService(appState, ipv8API);
export const attributeQuery = new AttributeQuery(ipv8API, appState);
