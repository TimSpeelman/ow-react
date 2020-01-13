import { ServerDescriptor } from "@tsow/ow-attest";
import { memoizeUnary } from "../../shared/util/memoizeFn";
import { IState, LocalAttribute } from "../../types/State";

export function getAttributes(state: IState): Array<LocalAttribute & WithProvider> {
    return state.attributes.map(a => ({
        ...a,
        provider: getProviderByMid(a.signer_mid_b64)(state)!,
    }));
}

export function getAttributeByHash(hash: string) {
    return memoizeUnary((state: IState) => {
        return getAttributes(state).find(a => a.hash === hash);
    }, null);
}

export function getProviderByMid(mid: string) {
    return memoizeUnary((state: IState) => {
        const result = Object.values(state.providers).find(p => p.mid_b64 === mid);
        return result;
    }, null);
}

interface WithProvider {
    provider: ServerDescriptor
}
