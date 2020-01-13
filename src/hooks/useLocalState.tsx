import React, { createContext, useContext, useEffect, useState } from "react";
import { LocalState } from "../services/local/LocalState";
import { IState } from "../types/State";

/** The Context object available to consumers */
export interface LocalStateContext {
    state: IState;
}

// Create a react context with dummy default value
const Context = createContext<LocalStateContext>({} as LocalStateContext);

export const LocalStateContextProvider: React.FC<{ localState: LocalState }> = ({ localState, children }) => {
    const [state, setState] = useState<IState>(localState.state);

    // Register to the changes to local state
    useEffect(() => {
        localState.stateChangeHook.on(setState);
    }, [localState])

    return <Context.Provider value={{ state }}>{children}</Context.Provider>
}

export const useLocalState = () => {
    return useContext(Context);
};

