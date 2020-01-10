import { IState } from "../types/State";


export class StateWrapper {
    constructor(private state: IState) { }

    providerLogoUrl(providerId: string) {
        return this.state.providers[providerId].logo_url;
    }
}