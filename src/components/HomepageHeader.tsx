
import React from "react";
import { MenuContext } from "../util/MenuContext";
import { Icon } from "./Icon";


export const HomepageHeader: React.FC<Omit<Props, "openMenu">> = (p) => (
    <MenuContext.Consumer>
        {({ open, setOpen }) => <HomepageHeaderNo openMenu={() => setOpen(true)} {...p} />}
    </MenuContext.Consumer>
)

export const HomepageHeaderNo: React.FC<Props> = (p: Props) => (
    <div>
        <header>
            <div className="content">
                <div className="avatar">
                    <img src="./assets/images/user-colored.svg" alt="" />
                </div>
                <div className="text">
                    <div className="primary">Tim Speelman</div>
                    <div className="secondary">Self-Sovereign Identity</div>
                </div>
                <div className="burger-menu" onClick={p.openMenu}>
                    <Icon bars />
                </div>
            </div>

            <div className="background"></div>
        </header>

        <div className="after-header"> </div>
    </div>
)

interface Props {
    openMenu: () => any;
}
