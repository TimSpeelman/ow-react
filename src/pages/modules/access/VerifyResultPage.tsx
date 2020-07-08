import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { SubpageHeader } from "../../../components/SubpageHeader";
import { useSelector } from "../../../hooks/useSelector";
import { getLocationById } from "../../../services/access-module/selectors";
import { useAMSelector } from "../../../services/access-module/useSelector";
import { getContacts } from "../../../services/local/selectors";
import { theWallet } from "../../../services/services";

export const ModuleAccessVerifyResultPage: React.FC<Props> = ({ siteId, mid }) => {

    const location = useAMSelector(getLocationById(siteId));

    const [status, setStatus] = useState("pending")
    const [error, setError] = useState("")
    const contacts = useSelector(getContacts);
    const contact = contacts.find(p => p.mid === mid)
    const contactName = contact ? contact.name : `Anonymous<${mid.substr(0, 5)}>`

    useEffect(() => {
        theWallet.accessModuleService!.verifyAccess(mid, siteId)
            .then((result) => {
                if (result.success && result.correctSigner) {
                    setStatus("succeeded")
                } else {
                    setStatus("failed")
                }
            })
            .catch((error) => {
                setStatus("error");
                setError(error.message);
            })
    }, [])

    return !location ? <div>...</div> : (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Verify Site Access"}
                backUrl={"/module/1"}
            />

            <main>
                {
                    status === "pending" && (
                        <div>
                            <p>Waiting for the other person to respond..</p>

                            <Link to="/module/1">
                                <Button>Cancel</Button>
                            </Link> <br />
                        </div>
                    )
                }

                {
                    status === "succeeded" && (
                        <div>
                            <p>The person was granted access to:</p>

                            <p><strong>{location.name}</strong></p>

                            {"grants" in location
                                ? <p>By you.</p>
                                : contact
                                    ? <p>By your contact {contactName}.</p>
                                    : <p>By {contactName}.</p>
                            }

                            <Link to="/module/1">
                                <Button>Return</Button>
                            </Link> <br />
                        </div>
                    )
                }

                {
                    status === "failed" && (
                        <div>
                            <p>This person does not have access.</p>

                            <Link to="/module/1">
                                <Button>Return</Button>
                            </Link> <br />
                        </div>
                    )
                }

                {
                    status === "error" && (
                        <div>
                            <p>Something went wrong: {error}.</p>

                            <Link to="/module/1">
                                <Button>Return</Button>
                            </Link> <br />
                        </div>
                    )
                }

            </main>

        </div>
    )
}

export interface Props {
    mid: string;
    siteId: string;
}
