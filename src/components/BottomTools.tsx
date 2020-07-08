import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

export const BottomTools: React.FC<PropsWithChildren<Props>> = (p) => (
    <div className="bottom-tools">
        {!p.showQR ? "" :
            <Link to={"/qr"} >
                <div className="fab-btn primary bottom-center" style={{ fontSize: "3em" }}>
                    <img src={require("../assets/images/qr-scan.svg")} alt="" style={{ width: "50%" }} />
                </div>
            </Link>
        }
        {!p.showPlus ? "" :
            <Link className="fab-btn secondary bottom-right" style={{ fontSize: "2em" }}
                to="/create">
                <Icon plus />
            </Link>
        }
        {p.children}
    </div>
)

interface Props {
    showQR?: boolean;
    showPlus?: boolean;
}
