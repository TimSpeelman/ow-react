import React, { useState } from "react";

export interface I18nContextObject {
    setLanguage: (lang: string) => void;
    translate: (key: string) => string;
    langCode: string;
}

const initialState = {
    langCode: "nl_NL",
    translate: (key: string) => key,
    setLanguage: (code: string) => { },
};

export const I18nContext = React.createContext<I18nContextObject>(initialState);

export const I18nCtxProvider: React.FC = ({ children }) => {

    const [lang, setLanguage] = useState<string>("nl_NL");

    const ctx = {
        langCode: lang,
        translate: (key: string) => key,
        setLanguage,
    };

    return <I18nContext.Provider value={ctx}>{children}</I18nContext.Provider>;
};
