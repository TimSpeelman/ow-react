import { Attestation, InboundAttestationRequest, InboundVerificationRequest, VerificationOutputPair } from "@tsow/ow-ssi/dist/types/src/ipv8/api/types";
import React, { useEffect, useState } from 'react';
import { SubpageHeader } from "../components/SubpageHeader";
import { usePromised } from "../hooks/usePromised";
import { useServices } from "../hooks/useServices";

export const DebugPage: React.FC = () => {

    const myMid = usePromised(() => services!.ipv8Service.api.getMyId().catch(e => console.error(e)));
    const { services } = useServices();

    const [polls, setPolls] = useState<PollState>({
        attReqs: [], atts: [], verifReqs: [], verifs: [], peers: [],
    })

    useEffect(() => {
        const o = services!.ipv8Service.observer;
        const i = setInterval(() => {
            setPolls({
                attReqs: o.attReqPoller.cache,
                atts: o.attPoller.cache,
                verifReqs: o.verifReqPoller.cache,
                verifs: o.verifPoller.cache,
                peers: o.peerPoller.cache,
            })
        }, 300)
        return () => clearInterval(i);
    })

    return (
        <div className="subpage nav-compact">

            <SubpageHeader
                pageTitle={"Debug Page"}
                backUrl={"/"}
            />

            <main>
                <p>My Id: {myMid}</p>
                <h1>Peers ({polls.peers.length})</h1>
                <ul>
                    {polls.peers.map(a => <li>- {a}</li>)}
                </ul>

                <h1>Attestations ({polls.atts.length})</h1>
                <ul>
                    {polls.atts.map(a => <li>
                        Hash: {a.attribute_hash}<br />
                    Name: {a.attribute_name}<br />
                    Meta: {a.metadata}<br />
                    Signer: {a.signer_mid_b64}<hr />
                    </li>)}
                </ul>

                <h1>Incoming Attestations Requests ({polls.attReqs.length})</h1>
                <ul>
                    {polls.attReqs.map(a => <li>
                        Name: {a.attribute_name}<br />
                    Meta: {a.metadata}<br />
                    Subject Mid: {a.mid_b64}
                    </li>)}
                </ul>

                <h1>Verifications ({polls.verifs.length})</h1>
                <ul>
                    {polls.verifs.map(a => <li>
                        Attribute Hash: {a.attribute_hash}<br />
                    Value Hash: {a.value_hash}<br />
                        Probability: {a.probability}
                    </li>)}
                </ul>

                <h1>Incoming Verification Requests ({polls.verifReqs.length})</h1>
                <ul>
                    {polls.verifReqs.map(a => <li>
                        Attribute Name: {a.attribute_name}<br />
                    Verifier Mid: {a.mid_b64}

                    </li>)}
                </ul>
            </main>

        </div>
    )
}

interface PollState {
    attReqs: InboundAttestationRequest[],
    atts: Attestation[],
    verifReqs: InboundVerificationRequest[],
    verifs: VerificationOutputPair[],
    peers: string[],
}
