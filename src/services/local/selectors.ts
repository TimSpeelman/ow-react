import { ServerDescriptor } from "@tsow/ow-attest";
import { IState, LocalAttribute } from "../../types/State";

export function getAttributes(state: IState): Array<LocalAttribute & WithProvider> {
    return state.attributes.map(a => ({
        ...a,
        provider: getProviderByMid(a.signer_mid_b64)(state)!,
    }));
}

export function getAttributeByHash(hash: string) {
    return (state: IState) => getAttributes(state).find(a => a.hash === hash);
}

export function getProviderByMid(mid: string) {
    return (state: IState) => {
        const result = Object.values(state.providers).find(p => p.mid_b64 === mid);
        return result;
    }
}

interface WithProvider {
    provider: ServerDescriptor
}
