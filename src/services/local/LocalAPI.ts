import { AxiosInstance } from "axios";
import { IState } from "../../types/State";

/**
 * Gateway to talk to the localhost
 */
export class LocalAPI {

    constructor(private axios: AxiosInstance) { }

    getMyMID(): Promise<string> {
        return this.axios.get(`/me`).then(response => response.data.mid_b64);
    }

    getState() {
        return this.axios.get('/state').then(response => response.data);
    }

    putState(state: IState) {
        return this.axios.put('/state', state);
    }

}