export function lengthOfLastWord(s: string): number {
    let i = s.length - 1;
    // Skip trailing spaces
    while (i >= 0 && s[i] === " ") i--;

    // Count the characters of the last word
    let length = 0;
    while (i >= 0 && s[i] !== " ") {
        length++;
        i--;
    }
    return length;
};
