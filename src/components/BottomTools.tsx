import React from "react";
import { Link } from "react-router-dom";

export const BottomTools: React.FC<Props> = (p: Props) => (
    <div className="bottom-tools">
        {!p.showQR ? "" :
            <a className="fab-btn primary bottom-center" style={{ fontSize: "3em" }}>
                <img src={require("../assets/images/qr-scan.svg")} alt="" style={{ width: "50%" }} />
            </a>
        }
        {!p.showPlus ? "" :
            <Link className="fab-btn secondary bottom-right" style={{ fontSize: "2em" }}
                to="/create">
                <span className="fas fa-plus"></span>
            </Link>
        }
    </div>
)

interface Props {
    showQR?: boolean;
    showPlus?: boolean;
}
