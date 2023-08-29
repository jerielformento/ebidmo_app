export function useAuctionColorCode(status) {
    let setColor = "";

    if(status === 1) {
        setColor = "bg-green-400";
    } else if(status === 2) {
        setColor = "bg-sky-300";
    } else {
        setColor = "bg-red-400";
    }

    return setColor;
}