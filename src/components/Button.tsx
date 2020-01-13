import classnames from "classnames";
import React, { ReactElement } from "react";

export const Button: React.FC<Props> = ({ onClick, isPending, primary, children, ...props }: Props) => (
    <button  {...props} onClick={onClick} className={classnames(["btn", { pending: isPending, primary: primary, secondary: !primary }])}>
        <span>{children}</span>
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
    primary?: boolean;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
}
