import QRCode from "qrcode.react";
import React, { ReactElement } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import { Icon } from "./Icon";

export const CredentialCard: React.FC<Props> = (p) => (

    <div className="card-item">
        <div className="row">
            {!!p.imageUrl && (
                <div className="logo-box">
                    <img style={{ width: "80%" }} src={p.imageUrl} alt="" />
                </div>
            )}
            <div className="text-box">
                <div className="primary">{p.title}</div>
                <div className="secondary">{p.issuerName}</div>
            </div>
            {!p.withQRs ? "" :
                <div className="tool">
                    <span onClick={() => p.onDisplayQR && p.onDisplayQR(p.title)}><Icon qrcode /></span>
                </div>
            }
        </div>

        {!p.showDetails ? "" : (
            <div className="credential-details">
                <div className="row">
                    <div className="text-box">
                        <div className="primary">{p.title}</div>
                        <div className="secondary">{p.value}</div>
                    </div>
                    {!p.withQRs ? "" :
                        <div className="tool">
                            <span onClick={() => p.onDisplayQR && p.onDisplayQR(p.title)}><Icon qrcode /></span>
                        </div>
                    }
                </div>
            </div>
        )}

        {!p.withQRs || !p.qrValue ? "" : (

            <div className="qr-code">
                <CopyToClipboard text={p.qrValue}>
                    <QRCode value={p.qrValue} size={256} level={"M"} />
                </CopyToClipboard>
            </div>

        )}

        {!p.showMeta ? "" : (

            <div className="credential-meta">
                <table>
                    <tbody>
                        {(p.metadata || []).map(e => (
                            <tr key={e.key.toString()}>
                                <td>{e.key}</td>
                                <td>{e.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

    </div>

);


interface Props {
    imageUrl?: string;
    title: string;
    issuerName: string;
    value?: string;
    withQRs?: boolean;
    showDetails?: boolean;
    showMeta?: boolean;
    qrValue?: string;
    metadata?: Array<{ key: string | ReactElement, value: string | ReactElement }>;
    onDisplayQR?: (qr: string) => any;
}
