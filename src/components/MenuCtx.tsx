import React, { createContext, useState } from "react";

/** The Context object available to consumers */
export interface MenuContext {
    open: boolean;
    setOpen: (to: boolean) => void;
}

// Create a react context with dummy default value
export const MenuContext = createContext<MenuContext>({
    open: false,
    setOpen: () => { }
});

export const MenuCtxProvider: React.FC = ({ children }) => {
    const [open, setOpen] = useState(false);

    const ctx = {
        open,
        setOpen,
    }

    return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>
}
