
import React, { useContext } from "react";
import { Icon } from "./Icon";
import { MenuContext } from "./MenuCtx";


export const HomepageHeader: React.FC<Omit<Props, "openMenu">> = (p) => {
    const { setOpen } = useContext(MenuContext);

    return <HomepageHeaderNo openMenu={() => setOpen(true)} {...p} />
}

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
