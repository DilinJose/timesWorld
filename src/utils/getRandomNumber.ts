export function getRandomPair(max = 50) {
    const min = 1
    const step = 3
    const maxStart = max - step; // Ensure value + 3 ≤ 200
    const count = Math.floor((maxStart - min) / step) + 1;
    const randomIndex = Math.floor(Math.random() * count);
    const value = min + randomIndex * step;
    return [value, value + step];
}