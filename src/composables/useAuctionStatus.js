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
        setStatus = "To Acknowledge";
    } else if(status === 1) {
        setStatus = "Acknowledged";
    } else {
        setStatus = "COMPLETED";
    }

    return setStatus;
}