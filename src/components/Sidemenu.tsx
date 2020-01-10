import classNames from "classnames";
import React from 'react';
import { Link } from "react-router-dom";
import { fallbackBool } from "../util/fallbackBool";
import { MenuContext } from "../util/MenuContext";
import { Icon } from "./Icon";


export const Sidemenu: React.FC = () => (
    <MenuContext.Consumer>
        {({ open, setOpen }) => <SidemenuNo toggleMenu={(v) => setOpen(fallbackBool(v, open))} isOpen={open} />}
    </MenuContext.Consumer>
)

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
                        <Icon id-card />
                        <span>Credentials</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contacts" onClick={() => toggleMenu(false)}>
                        <Icon users />
                        <span>Contacts</span>
                    </Link>
                </li>
                <li>
                    <a className="disabled">
                        <Icon info-circle />
                        <span>About</span>
                    </a>
                </li>
                <li>
                    <a className="disabled">
                        <Icon cog />
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
        </div>

    </div>
)

interface Props {
    toggleMenu: (v?: boolean) => any,
    isOpen: boolean,
}