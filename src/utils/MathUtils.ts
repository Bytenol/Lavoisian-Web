export function getRandomFromArray<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length - 1)];
}


export const getRandRange = (min: number, max: number) => Math.random() * (max - min + 1) + min;