import { Recipe } from "@tsow/ow-ssi";
import { OfferedAttribute } from "../services/OpenWalletService";
import { Dict } from '../types/Dict';

export interface LocalAttr {
    hash: string;

    name: string;
    value: string;

    /** Like id_metadata */
    type: string;

    /** A title for every language */
    title: Dict<string>;

    time: number;
    signer_mid_b64: string;

    provider: Recipe.RecipeServiceDescriptor;
}

export interface AttributeShareRequest {
    id: string;
    receiver: string;
    attributeNames: string[];
    reason: string;
    done: (consent: boolean) => void;
}

export interface AttributeReceiveRequest {
    id: string;
    provider: string;
    attributes: OfferedAttribute[];
    reason: string;
    done: (consent: boolean) => void;
}
