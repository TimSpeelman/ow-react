import { Recipe } from "@tsow/ow-ssi";
import { Dict } from "./Dict";

export interface IState {
    attributes: LocalAttribute[];
    providers: Dict<Recipe.RecipeServiceDescriptor>;
    contacts: Contact[];
}

export interface LocalAttribute {
    hash: string;
    name: string;
    value: string;
    time: number;
    type: string;
    title: Dict<string>;
    provider_title: Dict<string>;
    signer_mid_b64: string;
    metadata: any;
}

export interface Contact {
    mid: string;
    name: string;
}
