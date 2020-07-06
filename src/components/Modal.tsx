import React, { PropsWithChildren } from 'react';

export const Modal: React.FC<PropsWithChildren<Props>> = ({ children, open, onRequestClose }) => {

    return (
        <div className={`modal ${open ? '' : 'hidden'}`}>
            <div className="background" onClick={onRequestClose}></div>
            <div className="body">
                {children}
            </div>
        </div>

    )
}

interface Props {
    open: boolean,
    onRequestClose: () => void,
}
