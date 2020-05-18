import { OWVerifyRequest, ResolutionResult } from "@tsow/ow-ssi/dist/types/modules/browser/ow";

export interface InformedVerifyRequest {
    request: OWVerifyRequest;
    resolve: ResolutionResult;
}
