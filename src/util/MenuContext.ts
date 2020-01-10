import { createContext } from "react";

export interface MenuObj { open: boolean, setOpen: (to: boolean) => void }

export const MenuContext = createContext<MenuObj>({ open: false, setOpen: () => { } });
