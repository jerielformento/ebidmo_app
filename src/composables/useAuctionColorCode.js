export function useAuctionColorCode(status) {
    let setColor = "";

    if(status === 1) {
        setColor = "bg-red-500 animate-pulse";
    } else if(status === 2) {
        setColor = "bg-gray-500";
    } else if(status === 3) {
        setColor = "bg-amber-500";
    } else {
        setColor = "bg-green-500";
    }

    return setColor;
}

export function useAcknowledgementColorCode(status) {
    let setColor = "";

    if(status === 1) {
        setColor = "bg-green-500";
    } else if(status === 2) {
        setColor = "bg-amber-500";
    } else if(status === 3) {
        setColor = "bg-green-500";
    } else {
        setColor = "bg-sky-400";
    }

    return setColor;
}

export function useExpirationColorCode(status) {
    let setColor = "";

    if(status === 0) {
        setColor = "bg-green-500";
    } else {
        setColor = "bg-gray-500";
    }

    return setColor;
}