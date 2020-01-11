import QRCode from "qrcode.react";
import React, { ReactElement } from 'react';

export const CredentialCard: React.FC<Props> = (p) => (

    <div className="card-item clickable">
        <div className="row">
            <div className="logo-box">
                <img style={{ width: "80%" }} src={p.imageUrl} alt="" />
            </div>
            <div className="text-box">
                <div className="primary">{p.title}</div>
                <div className="secondary">{p.issuerName}</div>
            </div>
            <div className="tool">
            </div>
        </div>

        {!p.showDetails ? "" : (
            <div className="credential-details">
                <div className="row">
                    <div className="text-box">
                        <div className="primary">{p.title}</div>
                        <div className="secondary">{p.value}</div>
                    </div>
                </div>
            </div>
        )}

        {!p.showQR || !p.qrValue ? "" : (

            <div className="qr-code">
                <QRCode value={p.qrValue} size={256} level={"M"} />
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
    imageUrl: string;
    title: string;
    issuerName: string;
    value?: string;
    showQR?: boolean;
    showDetails?: boolean;
    showMeta?: boolean;
    qrValue?: string;
    metadata?: Array<{ key: string | ReactElement, value: string | ReactElement }>
}
