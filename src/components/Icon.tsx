import React from 'react';

export const Icon: React.FC<any> = ({ children, ...props }) => (
    <span className={`fas fa-${Object.keys(props)[0]}`}></span>
)

interface Props {
    children: string;
}