import { AccessModuleState, IMyLocation } from "./State";


export class AccessModuleService {

    constructor(protected state: AccessModuleState) { }

    addLocation(loc: IMyLocation) {
        const s = this.state.state;
        this.state.store({
            mySites: [...s.mySites, loc]
        })
    }

    deleteLocation(locId: string) {
        const s = this.state.state;
        this.state.store({
            mySites: s.mySites.filter(l => l.id !== locId)
        })
    }

}
