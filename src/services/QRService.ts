import { decodeFailed, decodeSucceded, decodeUnmatched, MultiQRDecoder, QRDecodeError, QRDecodeResult, QRDomainDecoder, QRDomainEncoder, QRStringDecoder, QRStringEncoder, QRX } from "../modules/QR/QREncoding";

export class SimpleQRStringCodec implements QRStringDecoder, QRStringEncoder {

    encode(qrx: QRX<any>): string {
        return qrx.type + "|" + qrx.payload;
    }

    decode(str: string): QRDecodeResult<string> {
        const [type, payload] = str.split("|");
        if (!type || !payload) {
            return decodeFailed(QRDecodeError.INVALID_FORMAT);
        } else {
            return decodeSucceded(new QRX(type, payload));
        }
    }
}

export class VerificationOfferCodec implements QRDomainDecoder<VerificationOffer>, QRDomainEncoder<VerificationOffer> {
    private TYPE = "VerifyOffer";

    encode(payload: VerificationOffer): QRX<string> {
        return new QRX(this.TYPE, JSON.stringify(payload));
    }

    decode(qrx: QRX<string>): QRDecodeResult<VerificationOffer> {
        if (qrx.type !== this.TYPE) {
            return decodeUnmatched();
        }
        try {
            const d = JSON.parse(qrx.payload);
            if (!d.mid || !d.attribute_hash || !d.attribute_value) {
                return decodeFailed(QRDecodeError.INVALID_PAYLOAD);
            } else {
                return decodeSucceded(d);
            }
        } catch (e) {
            return decodeFailed(QRDecodeError.INVALID_FORMAT);
        }
    }
}

export interface VerificationOffer {
    mid: string;
    attribute_name: string;
    attribute_hash: string;
    attribute_value: string;
}

export const qrDecoder = new MultiQRDecoder(new SimpleQRStringCodec(), [new VerificationOfferCodec()])

export function makeEncoder<T>(encoder: QRDomainEncoder<T>) {
    const strEncoder = new SimpleQRStringCodec();
    return (payload: T) => strEncoder.encode(encoder.encode(payload));
}
