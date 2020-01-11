import { AttestationClient, AttestationClientFactory } from '@tsow/ow-attest';
import { LocalAPI } from "./LocalAPI";
import { Mid } from './openwallet.service';


/** Provide our Attestation Client instance */
export class OWClientProvider {

    public mid: string = "";
    private api_base = 'http://localhost:8124/api'; // FIXME
    private _client: AttestationClient | undefined;
    private listeners: Array<(client: AttestationClient) => any> = [];

    getClient() {
        return this._client ? Promise.resolve(this._client)
            : new Promise<AttestationClient>((resolve) => this.listeners.push(resolve));
    }

    constructor(private localAPI: LocalAPI) {
        this.loadMe().then(me => {
            this.mid = me.mid_b64;
            const config = { ipv8_url: 'http://localhost:8124', mid_b64: me.mid_b64, };
            const factory = new AttestationClientFactory(config);
            this._client = factory.create();

            this.listeners.forEach(l => this._client && l(this._client));
        });
    }

    protected loadMe(): Promise<Mid> {
        return this.localAPI.getMyMID();
    }

}
