export function myPow(x: number, n: number): number {
    // x^-n = (1/x)^n. JS numbers hold 2^31 exactly, so negating -2^31 is safe.
    let base = n < 0 ? 1 / x : x;
    let exp = Math.abs(n);
    let result = 1;

    // Binary exponentiation: walk the bits of exp from lowest to highest.
    while (exp > 0) {
        if (exp % 2 === 1) result *= base; // this bit is set: include base^(2^k)
        base *= base;                      // base^(2^k) -> base^(2^(k+1))
        exp = Math.floor(exp / 2);
    }

    return result;
};
