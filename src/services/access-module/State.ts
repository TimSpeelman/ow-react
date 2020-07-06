import { Hook } from "../../util/Hook";
import { LocalState } from "../local/LocalState";

export class AccessModuleState {

    public stateChangeHook = new Hook<IAccessModuleState>();

    protected defaultState: IAccessModuleState = {
        trustedSites: [],
        mySites: [],
    };

    public state: IAccessModuleState;

    constructor(protected localState: LocalState) {
        this.state = this.defaultState;
        localState.stateChangeHook.on((s) => {
            console.log("monitoring", s)
            // @ts-ignore
            if (!s.accessModule) {
                this.store(this.defaultState);
            } else {
                // @ts-ignore
                this.state = s.accessModule;
            }
            console.log("Resulting", this.state)
        })
    }

    store(newState: Partial<IAccessModuleState>) {
        this.state = { ...this.state, ...newState };
        this.stateChangeHook.fire(this.state);
        // @ts-ignore
        return this.localState.store({ accessModule: this.state });
    }

}

export interface ExtendedState {
    accessModule: IAccessModuleState
}

export interface IAccessModuleState {
    trustedSites: ITrustedLocation[];
    mySites: IMyLocation[];
}

export interface IMyLocation {
    name: string;
    grants: IGrant[];
    id: string;
}

export interface IGrant {
    subjectId: string;
    time: number;
    hash: string;
}

export interface ITrustedLocation {
    id: string;
    name: string;
    rootMid: string;
}   
