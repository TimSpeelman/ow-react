import React, { ReactElement } from "react";

export const Button: React.FC<Props> = (p: Props) => (
    <button onClick={p.onClick} className={"btn primary " + (p.isPending ? "pending" : "")}>
        <span>{p.children}</span>
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </button>
)

interface Props {
    onClick?: (newVal: any) => any;
    isPending?: boolean;
    children?: string | ReactElement;
}
