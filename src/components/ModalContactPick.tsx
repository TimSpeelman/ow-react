import React, { useState } from 'react';
import { useSelector } from "../hooks/useSelector";
import { getContacts } from "../services/local/selectors";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { SelectInput } from "./SelectInput";

export const ModalContactPick: React.FC<Props> = ({
    open,
    onRequestClose,
    onSubmit,
    title,
    description,
    submitText,
    pending,
}) => {

    const contacts = useSelector(getContacts);
    const options = contacts.map(c => ({ value: c.mid, label: c.name }))
    const [c, setC] = useState("");

    const submit = () => onSubmit(c);

    return (
        <Modal open={open} onRequestClose={onRequestClose}>
            <h1>{title}</h1>
            <p>{description}</p>

            <SelectInput
                options={options}
                value={c}
                onChange={setC}
                emptyMessage={"Select a contact"}
            />
            <br />
            <br />

            <Button primary disabled={c === ""} onClick={submit} isPending={pending}>{submitText}</Button>
            <Button onClick={onRequestClose}>Cancel</Button>

        </Modal>
    )
}

interface Props {
    open: boolean,
    onRequestClose: () => void,
    onSubmit: (mid: string) => void,
    title: string,
    description: string,
    submitText: string,
    pending?: boolean,
}
