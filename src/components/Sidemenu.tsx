import classNames from "classnames";
import React from 'react';
import { Link } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import { fallbackBool } from "../util/fallbackBool";
import { Icon } from "./Icon";


export const Sidemenu: React.FC = () => {
    const { open, setOpen } = useMenu();

    return <SidemenuNo toggleMenu={(v) => setOpen(fallbackBool(v, open))} isOpen={open} />
}

export const SidemenuNo: React.FC<Props> = ({ toggleMenu, isOpen }: Props) => (
    <div className={classNames({ "side-menu-open": isOpen })}>
        <div className="side-menu-close" onClick={() => toggleMenu(false)}>
            <Icon times />
        </div>

        <div className="side-menu-backdrop" onClick={() => toggleMenu(false)}></div>

        <div className="side-menu">
            <ul>
                <li>
                    <Link to="/attestations" onClick={() => toggleMenu(false)}>
                        <Icon id-card /><span>Credentials</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contacts" onClick={() => toggleMenu(false)}>
                        <Icon users /><span>Contacts</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={() => toggleMenu(false)} className="disabled">
                        <Icon info-circle /><span>About</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={() => toggleMenu(false)} className="disabled">
                        <Icon cog /><span>Settings</span>
                    </Link>
                </li>
            </ul>
        </div>

    </div>
)

interface Props {
    toggleMenu: (v?: boolean) => any,
    isOpen: boolean,
}