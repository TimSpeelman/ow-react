import { Contact } from "../types/State";
import { LocalState } from "./local/LocalState";

/**
 * The ContactService keeps track of known contacts.
 */
export class ContactService {

    constructor(
        private state: LocalState) { }

    get contacts() {
        return this.state.contacts;
    }

    public add(name: string, mid: string): Promise<void> {
        const s = this.state;
        return this.state.store({
            contacts: [...s.contacts, { name, mid }]
        }).then(() => { });
    }

    public findByMid(mid: string): Contact | undefined {
        return this.state.contacts.find(c => c.mid === mid);
    }

}
