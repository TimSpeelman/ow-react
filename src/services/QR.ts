/**
 * We encode messages between Wallets in different QR codes. This file handles
 * the efficient encoding and decoding of these messages types with validation.
 * 
 * Encoding and decoding is done in two steps:
 * - All QR strings are first decoded to a QRX object
 * - The QRX object is subsequently decoded to a message object
 */

/** Facilitates the coding between QR-string and QRX object */
export interface QRXCodecx {
    encode(qrx: QRX<string>): string;
    decode(qrString: string): QRX<string> | null;
}


/** The intermediate data object */
export class QRX<T> {
    constructor(
        readonly type: string,
        readonly payload: T,
    ) { }
}

/** Facilitates the encoding between QRX and the domain messages */
export interface QRXCodec<T> {
    encode(payload: T): QRX<string>;
    decode(qrx: QRX<string>): QRX<T>;
}

export class Decoder {
    constructor(private codecs: QRXCodec<any>[]) { }

    decode(qrx: QRX<string>) {
        const codec = this.codecs.find(c => c.decode(qrx));
        return codec ? codec.decode(qrx) : null;
    }
}

export class VerificationOfferCodec implements QRXCodec<VerificationOffer> {
    private TYPE = "VerifyOffer";

    encode(payload: VerificationOffer) {
        return new QRX(this.TYPE, JSON.stringify(payload));
    }

    decode(qrx: QRX<string>) {
        if (qrx.type === this.TYPE) {
            try {
                const d = JSON.parse(qrx.payload);
                if (!d.mid || !d.attribute_hash || !d.attribute_value) {
                    return null;
                } else {
                    return d;
                }
            } catch (e) {
                return null;
            }
        }
    }
}

export interface VerificationOffer {
    mid: string;
    attribute_hash: string;
    attribute_value: string;
}

export const decoder = new Decoder([
    new VerificationOfferCodec()
])
