import { OfferedAttribute } from './openwallet.service';

export interface AttributeShareRequest {
    id: string;
    receiver: string;
    attributeNames: string[];
    reason: string;
    done: (consent: boolean) => void;
}

export interface AttributeNV {
    attribute_name: string;
    attribute_value: string;
}

export interface AttributeReceiveRequest {
    id: string;
    provider: string;
    attributes: OfferedAttribute[];
    reason: string;
    done: (consent: boolean) => void;
}
