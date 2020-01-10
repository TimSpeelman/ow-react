import { ServerDescriptor } from '@tsow/ow-attest';
import { Dict } from "./Dict";

export interface IState {
    attributes: LocalAttribute[];
    providers: Dict<ServerDescriptor>;
}

export interface LocalAttribute {
    hash: string;
    name: string;
    value: string;
    time: number;
    type: string;
    title: Dict<string>;
    provider_title: Dict<string>;
}
