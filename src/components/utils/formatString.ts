export function formatTimeStringToSeconds(timeString: string): number {
    const [min, sec, ms] = timeString.split(':');

    return Number(min) * 60 + Number(sec) + Number(ms) / 1000;
}

export function formatSecondsToTimeString(seconds: number): string {
    const min = Math.floor(seconds/60);
    const sec = Math.floor(seconds%60);
    const ms = Math.floor(seconds%60).toString().split(',')[1].slice(0,2);

    return `${min}:${sec}:${ms}`;
}