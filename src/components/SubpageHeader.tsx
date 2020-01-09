
import React from "react";
import { Link } from "react-router-dom";

export const SubpageHeader: React.FC<Props> = (p: Props) => (
    <div>
        <header>
            <div className="content">
                <div className="back-arrow">
                    <Link to={p.backUrl}><span className="fas fa-chevron-left"></span></Link>
                </div>
                <div className="page-title">{p.pageTitle}</div>
                <div className="burger-menu" onClick={() => p.toggleMenu()}>
                    <span className="fas fa-bars"></span>
                </div>
            </div>

            <div className="background"></div>
        </header>

        <div className="after-header"> </div>
    </div>
)

interface Props {
    backUrl: string;
    pageTitle: string;
    toggleMenu: () => any;
}
