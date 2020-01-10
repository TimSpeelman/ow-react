import React, { ReactNode, useState } from "react";
import { MenuContext } from "../util/MenuContext";

export const MenuProvider = (p: { children?: ReactNode }) => {
    const [open, setOpen] = useState(false);

    return <MenuContext.Provider value={{ open, setOpen }}>{p.children}</MenuContext.Provider>
}
