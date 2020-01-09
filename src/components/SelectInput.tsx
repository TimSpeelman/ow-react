import React, { ReactElement } from "react";

export const SelectInput: React.FC<Props> = (p: Props) => (
    <select value={p.value} onChange={(e) => p.onChange(e.target.value)}>
        {!p.emptyMessage ? "" : <option disabled selected hidden>{p.emptyMessage}</option>}
        {p.options.map(o => (
            <option value={o.value}>{o.label}</option>
        ))}
    </select>
)

interface Props {
    value: any;
    onChange: (newVal: any) => any;
    options: Array<{ value: any, label: ReactElement | string }>;
    emptyMessage?: ReactElement | string;
}
