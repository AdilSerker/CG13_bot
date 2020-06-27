export function formatTimeStringToSeconds(timeString: string): number {
    console.log('IN TIME_STRING', timeString)
    const [min, sec, ms] = timeString.split(':');

    console.log('OUT IN SECONDS', Number(min) * 60 + Number(sec) + Number(ms) / 1000);
    return Number(min) * 60 + Number(sec) + Number(ms) / 1000;
}

export function formatSecondsToTimeString(seconds: number): string {
    console.log('IN SECONDS');
    const min = Math.floor(seconds/60);
    console.log('MIN', min);
    const sec = Math.floor(seconds%60);
    console.log('SEC', Math.floor(seconds%60));
    const ms = Math.floor(seconds%60).toString().split(',')[1].slice(0,2);
    console.log('MS', Math.floor(seconds%60).toString());

    return `${min}:${sec}:${ms}`;
}