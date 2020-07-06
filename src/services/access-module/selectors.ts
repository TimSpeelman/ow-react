import { IState } from "../../types/State";
import { ExtendedState, IMyLocation } from "./State";

export function getRoot(state: IState & ExtendedState) {
    return state.accessModule || {
        trustedSites: [],
        mySites: [],
    };
}


export function getLocations(state: IState & ExtendedState): Array<IMyLocation> {
    return getRoot(state).mySites;
}
