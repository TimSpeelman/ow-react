import { AxiosInstance } from "axios";
import { IState } from "../../types/State";

/**
 * Gateway to talk to the localhost
 */
export class LocalAPI {

    constructor(private axios: AxiosInstance) { }

    getState(): Promise<IState> {
        return this.axios.get("/state").then((d) => d.data)
        // return Promise.resolve(JSON.parse(localStorage.getItem("state") || "{}"));
    }

    putState(state: IState) {
        return this.axios.put("/state", state)
        // return Promise.resolve(localStorage.setItem("state", JSON.stringify(state)));
    }

}
