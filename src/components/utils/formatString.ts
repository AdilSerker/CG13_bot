export function formatTimeStringToSeconds(timeString: string): number {
    const [min, sec, ms] = timeString.split(':');

    return Number(min) * 60 + Number(sec) + Number(ms) / 1000;
}

export function formatSecondsToTimeString(seconds: number): string {
    console.log('IN SECONDS', seconds);
    const min = Math.floor(seconds/60);

    const sec = Math.floor(seconds%60);

    const ms = (seconds%60).toString().split('.')[1].slice(0,2);

    console.log('OUT TIME STRING', `${min}:${sec}:${ms}`);
    return `${min}:${sec}:${ms}`;
}