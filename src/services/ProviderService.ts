import { AttestationClient, ServerDescriptor } from '@tsow/ow-attest';
import { Dict } from '@tsow/ow-attest/dist/types/ipv8/types/Dict';
import { timer } from '../shared/util/timer';
import { LocalState } from "./local/LocalState";

export enum OnlineStatus {
    ONLINE, PENDING, OFFLINE
}

/**
 * The ProvidersService keeps track of known providers,
 * checks them for updates and allows us to add new ones
 * by providing a URL.
 */
export class ProviderService {

    private online: Dict<OnlineStatus> = {};

    constructor(
        private state: LocalState,
        private owClient: AttestationClient) { }

    get providers() {
        return this.state.providers;
    }

    public checkIsOnline(id: string) {
        if (!(id in this.online)) {
            this.pingForOnline(id);
            return false;
        }
        return this.online[id] === OnlineStatus.ONLINE;
    }

    public pingForOnline(id: string) {
        this.online[id] = OnlineStatus.PENDING;
        return Promise.race([
            this.getByURL(this.state.providers[id].url).then(() => true).catch(() => false),
            timer(1000).then(() => false),
        ]).then(isOnline => {
            this.online[id] = isOnline ? OnlineStatus.ONLINE : OnlineStatus.OFFLINE;
        });
    }

    public getByURL(url: string) {
        return this.owClient.getServerDetails(url);
    }

    public addByURL(url: string) {
        return this.getByURL(url)
            .then((details) => { this.addOrUpdate(details); return details; });
    }

    protected addOrUpdate(details: ServerDescriptor) {
        const s = this.state;
        return this.state.store({
            providers: {
                ...s.providers,
                [details.id]: details,
            }
        });
    }

}
