import { LocalAttribute } from "../types/State";
import { LocalState } from "./local/LocalState";

export class AttributesService {

    constructor(private state: LocalState) { }

    get attributes() {
        return this.state.attributes;
    }

    public storeAttribute(attr: LocalAttribute) {
        const s = this.state;
        this.state.store({
            attributes: [...s.attributes, attr],
        });
    }

}
