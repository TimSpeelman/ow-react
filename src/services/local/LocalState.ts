import { IState } from "../../types/State";
import { Hook } from "../../util/Hook";
import { LocalAPI } from "./LocalAPI";

/**
 * The LocalState is simply stored in a JSON file by the
 * OpenWallet Python service running on localhost. This
 * differs from the state stored by the IPv8 service.
 * 
 * This class keeps a copy in memory and synchronises with
 * the python service.
 */
export class LocalState {

    public stateChangeHook: Hook<IState> = new Hook();

    private defaultState: IState = {
        attributes: [],
        providers: {},
        contacts: [],
    };

    private _state: IState = this.defaultState;

    get state() {
        return this._state;
    }

    get attributes() {
        return this._state.attributes;
    }

    get providers() {
        return this._state.providers;
    }

    get contacts() {
        return this._state.contacts;
    }

    constructor(private localApi: LocalAPI) {

        this.fetch();
    }

    fetch() {
        return this.localApi.getState()
            .then(response => {
                if (!response) {
                    // console.log("Local state is empty, creating default");
                    this.store(this.defaultState);
                } else {
                    this.updateState(response)
                }
            });
    }

    store(state: Partial<IState>) {
        this.updateState(state);
        return this.localApi.putState(this.state);
    }

    protected updateState(newState: Partial<IState>) {
        this._state = { ...this.state, ...newState };
        // console.log("UPDATED LOCAL STATE", this._state);
        this.stateChangeHook.fire(this.state);
    }

}
