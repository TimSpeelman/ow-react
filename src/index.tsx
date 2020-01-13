import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./App";
import { I18nContextProvider } from "./hooks/useInternationalization";
import { LocalStateContextProvider } from "./hooks/useLocalState";
import { MenuContextProvider } from "./hooks/useMenu";
import { localState } from "./services";
import * as serviceWorker from './serviceWorker';

const root = (
    <MenuContextProvider>
        <I18nContextProvider fallbackLangs={["en_US", "en_UK"]}>
            <LocalStateContextProvider localState={localState}>
                <App />
            </LocalStateContextProvider>
        </I18nContextProvider>
    </MenuContextProvider>
);

ReactDOM.render(root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
