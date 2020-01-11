
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { MenuContext } from "./MenuCtx";


export const SubpageHeader: React.FC<Omit<Props, "openMenu">> = (p) => {
    const { setOpen } = useContext(MenuContext);

    return <SubpageHeaderNo openMenu={() => setOpen(true)} {...p} />
}

export const SubpageHeaderNo: React.FC<Props> = (p: Props) => (
    <div>
        <header>
            <div className="content">
                <div className="back-arrow">
                    <Link to={p.backUrl}><Icon chevron-left /></Link>
                </div>
                <div className="page-title">{p.pageTitle}</div>

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
    backUrl: string;
    pageTitle: string;
    openMenu: () => any;
}
