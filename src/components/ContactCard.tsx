import React from 'react';
import { Icon } from "./Icon";

export const ContactCard: React.FC<Props> = (p) => (

    <div className="card-item">
        <div className="row">
            <div className="logo-box">
                <img src={p.logoUrl} alt="" />
            </div>
            <div className="text-box">
                <div className="primary">{p.title}</div>
            </div>
            <div className="tool">
                <div className="clickable">
                    <Icon info-circle />
                </div>
            </div>
        </div>
    </div>

);


interface Props {
    logoUrl: string;
    title: string;
}
