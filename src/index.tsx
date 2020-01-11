
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./App";
import { I18nCtxProvider } from "./components/I18nContext";
import { MenuCtxProvider } from "./components/MenuCtx";
import * as serviceWorker from './serviceWorker';


const root = (
    <MenuCtxProvider>
        <I18nCtxProvider>
            <App />
        </I18nCtxProvider>
    </MenuCtxProvider>
);

ReactDOM.render(root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
