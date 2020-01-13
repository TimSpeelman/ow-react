import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SubpageHeader } from "../components/SubpageHeader";

export const ProcedureDonePage: React.FC<Props> = ({ pageTitle, messageTitle, messageBody }) => {
    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={pageTitle}
                backUrl={"/"}
            />

            <main className="text-center" >
                <h1>{messageTitle}</h1>
                <p>{messageBody}</p>

                <Link to="/"><Button>OK</Button></Link>
            </main>
        </div>
    )
}

interface Props {
    pageTitle: string;
    messageTitle: string;
    messageBody: string;
}