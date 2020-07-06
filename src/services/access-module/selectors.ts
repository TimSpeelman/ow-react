import { IState } from "../../types/State";
import { ExtendedState, IMyLocation, ITrustedLocation } from "./State";

export function getRoot(state: IState & ExtendedState) {
    return state.accessModule || {
        trustedSites: [],
        mySites: [],
    };
}


export function getMyLocations(state: IState & ExtendedState): Array<IMyLocation> {
    return getRoot(state).mySites;
}

export function getTrustedLocations(state: IState & ExtendedState): Array<ITrustedLocation> {
    return getRoot(state).trustedSites;
}
