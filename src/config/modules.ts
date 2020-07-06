
export const moduleSiteAccess = {
    title: "Site Access",

    description: "This module allows you to manage and check someone's access to construction sites.",

    requestVerify: {
        title: "Check Access",
        description: "Check a persons access by asking them to show their badge. Scan their badge with the QR code.",
        // TODO VerifyRequest
    },

    requestAttest: {
        title: "Request Access",
        description: "Request access to a construction site from someone who manages its access by sending them a request.",
        type: "p2p",

        // TODO AttestRequest
    },

    issueAttest: {
        title: "Grant Access",
        description: "Grant someone access to a construction site from someone who manages its access by sending them an invite.",
        type: "p2p",

        // TODO AttestOffer
    }
}

