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

export function getAllLocations(state: IState & ExtendedState): Array<ITrustedLocation | IMyLocation> {
    return [...getMyLocations(state), ...getTrustedLocations(state)];
}

export function getLocationById(id: string) {
    return (state: IState & ExtendedState): ITrustedLocation | IMyLocation | undefined =>
        getAllLocations(state).find(l => l.id === id);
}
