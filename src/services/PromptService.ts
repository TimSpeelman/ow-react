
export class PromptService {

    promptHandler: PromptHandler = () => Promise.reject("Not implemented");
    promptResolve: PromptResolve = () => Promise.reject("Not implemented");

    prompt(p: PromptType) {
        return new Promise((resolve) => {
            this.promptResolve = resolve;
            this.promptHandler(p);
        })
    }

    answer(a: any) {
        return this.promptResolve(a);
    }

}

export type PromptHandler = (p: PromptType) => void

export type PromptResolve = (a: any) => void

export type PromptType =
    PromptShare |
    PromptAttestOffer |
    PromptWarn

export interface PromptShare {
    type: "Share",
    text: string,
}

export interface PromptAttestOffer {
    type: "AttestOffer",
    text: string,
}

export interface PromptWarn {
    type: "Warn",
    text: string,
}
