export function setExpirationTimer(itemExpAt) {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let timeRemaining = new Date(itemExpAt);
    let currDate = new Date();
    let endTime = timeRemaining - currDate;
    seconds = parseInt(endTime / 1000);
    minutes = parseInt(seconds / 60);
    hours = parseInt(minutes / 60);
    days = parseInt(hours / 24);

    return {
        'days': days,
        'hours': (hours % 24),
        'minutes': (minutes % 60),
        'seconds': (seconds % 60)
    };
}