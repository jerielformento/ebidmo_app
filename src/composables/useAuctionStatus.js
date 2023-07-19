export function useAuctionStatus(status) {
    let setStatus = "";

    if(status === 1) {
        setStatus = "Active";
    } else if(status === 2) {
        setStatus = "Waiting";
    } else {
        setStatus = "Expired";
    }

    return setStatus;
}