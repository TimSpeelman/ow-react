import { Recipe } from "@tsow/ow-ssi";
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
