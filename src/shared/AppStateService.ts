import { ServerDescriptor } from '@tsow/ow-attest';
import { LocalAPI } from "./LocalAPI";
import { Dict } from './types/Dict';

/** Keep local state in sync with localhost */
export class AppState {

    private state: IState = {
        attributes: [],
        providers: {},
    };

    constructor(private localApi: LocalAPI) {
        this.fetch();
    }

    getState() {
        return this.state;
    }

    get attributes() {
        return this.state.attributes;
    }

    get providers() {
        return this.state.providers;
    }

    fetch() {
        return this.localApi.getState()
            .then(response => { this.state = response; });
    }

    save(state: IState) {
        this.state = state;
        return this.localApi.putState(this.state);
    }

}

export interface IState {
    attributes: LocalAttribute[];
    providers: Dict<ServerDescriptor>;
}

export interface LocalAttribute {
    hash: string;
    name: string;
    value: string;
    time: number;
    type: string;
    title: Dict<string>;
    provider_title: Dict<string>;
}
