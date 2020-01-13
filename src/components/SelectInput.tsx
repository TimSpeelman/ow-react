import React, { ReactElement } from "react";

export const SelectInput: React.FC<Props> = (p: Props) => (
    <select value={p.value} onChange={(e) => p.onChange(e.target.value)}>
        {!p.emptyMessage ? "" : <option value={""} disabled hidden>{p.emptyMessage}</option>}
        {p.options.map(o => (
            <option value={o.value} key={o.value}>{o.label}</option>
        ))}
    </select>
)

interface Props {
    value: any;
    onChange: (newVal: any) => any;
    options: Array<SelectOption>;
    emptyMessage?: ReactElement | string;
}

export interface SelectOption {
    value: any;
    label: ReactElement | string;
}
