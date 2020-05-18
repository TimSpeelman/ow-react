
import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import { Icon } from "./Icon";


export const SubpageHeader: React.FC<Omit<Props, "openMenu">> = (p) => {
    const { setOpen } = useMenu();

    return <SubpageHeaderNo openMenu={() => setOpen(true)} {...p} />
}

export const SubpageHeaderNo: React.FC<Props> = (p: Props) => (
    <div>
        <header>
            <div className="content">
                <Link className="back-arrow" to={p.backUrl}><Icon chevron-left /></Link>

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
