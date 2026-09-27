export function reverseWords(s: string): string {
    const words: string[] = [];
    let i = s.length - 1;

    // Scan from the right, so words are collected already in reverse order
    while (i >= 0) {
        while (i >= 0 && s[i] === " ") i--; // skip spaces
        if (i < 0) break;
        const end = i;
        while (i >= 0 && s[i] !== " ") i--; // move to the start of the word
        words.push(s.slice(i + 1, end + 1));
    }

    return words.join(" ");
};
