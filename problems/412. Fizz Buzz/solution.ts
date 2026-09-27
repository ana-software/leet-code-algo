export function fizzBuzz(n: number): string[] {
    const answer: string[] = [];
    for (let i = 1; i <= n; i++) {
        // Concatenation yields "FizzBuzz" for multiples of 15 without a special case
        let s = "";
        if (i % 3 === 0) s += "Fizz";
        if (i % 5 === 0) s += "Buzz";
        answer.push(s || String(i));
    }
    return answer;
};
