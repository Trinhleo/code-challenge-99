
/** O(n) time, O(1) space - iterative loop */
export function SumToNLoop(n: number): number {
    if (!Number.isFinite(n)) {
        throw new Error('n must be finite');
    }

    n = Math.floor(n);
    if (n <= 0) {
        return 0;
    }

    let s = 0;
    for (let i = 1; i <= n; i++) {
        s += i;
    }

    return s;
}

/**
 * O(n) time, O(n) space - Sum using Array.reduce
 * Returns the sum of all integers from 1 to n (inclusive).
 * If n <= 0, returns 0.
 */
export function sumToNReduce(n: number): number {
    if (!Number.isFinite(n)) {
        throw new Error('n must be finite');
    }
    n = Math.floor(n);
    if (n <= 0) return 0;
    return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
}

/** O(1) time, O(1) space - Gauss formula n*(n+1)/2 */
export function sumToNFormula(n: number): number {
    if (!Number.isFinite(n)) {
        throw new Error('n must be finite');
    }

    n = Math.floor(n);
    if (n <= 0) { return 0 };

    return n % 2 === 0 ? (n / 2) * (n + 1) : ((n + 1) / 2) * n;
}

/** O(log n) time, O(1) space - Bit-count decomposition
 */
export function sumToNBitwise(n: number): number {
    if (!Number.isFinite(n)) {
        throw new Error('n must be finite');
    }

    n = Math.floor(n);
    if (n <= 0) {
        return 0;
    }

    let res = 0;
    for (let k = 0; k < 53; k++) {
        const pow2k = 2 ** k;
        if (pow2k > n) break;
        const cycle = pow2k * 2;
        const fullCycles = Math.floor((n + 1) / cycle);
        const onesInFull = fullCycles * pow2k;
        const remainder = (n + 1) % cycle;
        const onesInPartial = Math.max(0, remainder - pow2k);
        const ones = onesInFull + onesInPartial;
        res += ones * pow2k;
    }

    return res;
}
