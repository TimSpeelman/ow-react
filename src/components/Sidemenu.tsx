import classNames from "classnames";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import { usePromised } from "../hooks/usePromised";
import { useServices } from "../hooks/useServices";
import { fallbackBool } from "../util/fallbackBool";
import { Icon } from "./Icon";


export const Sidemenu: React.FC = () => {
    const { open, setOpen } = useMenu();

    return <SidemenuNo toggleMenu={(v) => setOpen(fallbackBool(v, open))} isOpen={open} />
}

export const SidemenuNo: React.FC<Props> = ({ toggleMenu, isOpen }: Props) => {
    const { services, path } = useServices();
    const myMid = usePromised(() => services!.ipv8Service.api.getMyId().catch(e => console.error(e)));

    const [peers, setPeers] = useState<string[]>([])

    useEffect(() => {
        const i = setInterval(() => setPeers(services!.ipv8Service.observer.peerPoller.cache), 300)
        return () => clearInterval(i);
    })

    return (
        <div className={classNames({ "side-menu-open": isOpen })}>
            <div className="side-menu-close" onClick={() => toggleMenu(false)}>
                <Icon times />
            </div>

            <div className="side-menu-backdrop" onClick={() => toggleMenu(false)}></div>

            <div className="side-menu">
                <ul>
                    <li>
                        <Link to="/badge" onClick={() => toggleMenu(false)}>
                            <Icon id-badge /><span>My Badge</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/attestations" onClick={() => toggleMenu(false)}>
                            <Icon wallet /><span>Credentials</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacts" onClick={() => toggleMenu(false)}>
                            <Icon users /><span>Contacts</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/module/1" onClick={() => toggleMenu(false)}>
                            <Icon cubes /><span>Module 'Site Access'</span>
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
                    <p><strong>Debug Information:</strong></p>
                    <p>Using agent: {path}</p>
                    <p>Using mid: {myMid}</p>
                    <p>Known peers: {peers.length} ({peers.map(p => p.substr(0, 5)).join(", ")})</p>
                </ul>
            </div>

        </div>
    )
}

interface Props {
    toggleMenu: (v?: boolean) => any,
    isOpen: boolean,
}