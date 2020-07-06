import { useSelector } from "../../hooks/useSelector";
import { IState } from "../../types/State";
import { ExtendedState } from "./State";

export const useAMSelector = <T>(selector: (state: ExtendedState & IState) => T) =>
    // @ts-ignore
    useSelector(selector)