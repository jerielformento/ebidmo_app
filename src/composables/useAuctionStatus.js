export function useAuctionStatus(status) {
    let setStatus = "";

    if(status === 1) {
        setStatus = "LIVE";
    } else if(status === 2) {
        setStatus = "WAITING";
    } else if(status === 3) {
        setStatus = "CANCELLED";
    } else {
        setStatus = "COMPLETED";
    }

    return setStatus;
}

export function useAcknowledgementStatus(status) {
    let setStatus = "";

    if(status === 0) {
        setStatus = "To Pay";
    } else if(status === 1) {
        setStatus = "Paid";
    } else if(status === 2) {
        setStatus = "To Ship";
    } else if(status === 3) {
        setStatus = "Completed";
    }

    return setStatus;
}

export function useExpirationStatus(status) {
    let setStatus = "";

    if(status === 0) {
        setStatus = "Active";
    } else {
        setStatus = "Expired";
    }

    return setStatus;
}