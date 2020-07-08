import React from 'react';
import { Icon } from "./Icon";

export const ContactCard: React.FC<Props> = (p) => (

    <div className="card-item">
        <div className="row">
            {p.logoUrl && (
                <div className="logo-box">
                    <img src={p.logoUrl} alt="" />
                </div>
            )}
            <div className="text-box">
                <div className="primary">{p.title}</div>
                {p.sub && <div className="secondary">{p.sub}</div>}
            </div>
            <div className="tool">
                <div className="clickable" onClick={p.onClickConnect}>
                    <Icon signal style={{ textColor: p.online ? "green" : "black" }} />
                </div>
            </div>
        </div>
    </div>

);


interface Props {
    logoUrl?: string;
    title: string;
    sub?: string;
    online?: boolean;
    onClickConnect: () => void;
}
