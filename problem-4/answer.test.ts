import { describe, it, expect } from 'vitest';
import { SumToNLoop, sumToNFormula, sumToNBitwise, sumToNReduce } from './answer';

function measureTime(fn: (n: number) => number, n: number) {
    const start = performance.now();
    const result = fn(n);
    const end = performance.now();
    return { result, time: end - start };
}

describe('SumToNLoop', () => {
    it('should return correct sum for n=10', () => {
        const { result, time } = measureTime(SumToNLoop, 10);
        expect(result).toBe(55);
        console.log(`SumToNLoop(10) executed in ${time.toFixed(4)} ms`);
    });

    it('should return correct sum for n=20', () => {
        const { result, time } = measureTime(SumToNLoop, 20);
        expect(result).toBe(210);
        console.log(`SumToNLoop(20) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=0', () => {
        const { result, time } = measureTime(SumToNLoop, 0);
        expect(result).toBe(0);
        console.log(`SumToNLoop(0) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=1', () => {
        const { result, time } = measureTime(SumToNLoop, 1);
        expect(result).toBe(1);
        console.log(`SumToNLoop(1) executed in ${time.toFixed(4)} ms`);
    });
});

describe('sumToNReduce', () => {
    it('should return correct sum for n=10', () => {
        const { result, time } = measureTime(sumToNReduce, 10);
        expect(result).toBe(55);
        console.log(`sumToNReduce(10) executed in ${time.toFixed(4)} ms`);
    });

    it('should return correct sum for n=20', () => {
        const { result, time } = measureTime(sumToNReduce, 20);
        expect(result).toBe(210);
        console.log(`sumToNReduce(20) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=0', () => {
        const { result, time } = measureTime(sumToNReduce, 0);
        expect(result).toBe(0);
        console.log(`sumToNReduce(0) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=1', () => {
        const { result, time } = measureTime(sumToNReduce, 1);
        expect(result).toBe(1);
        console.log(`sumToNReduce(1) executed in ${time.toFixed(4)} ms`);
    });
});


describe('sumToNFormula', () => {
    it('should return correct sum for n=10', () => {
        const { result, time } = measureTime(sumToNFormula, 10);
        expect(result).toBe(55);
        console.log(`sumToNFormula(10) executed in ${time.toFixed(4)} ms`);
    });

    it('should return correct sum for n=20', () => {
        const { result, time } = measureTime(sumToNFormula, 20);
        expect(result).toBe(210);
        console.log(`sumToNFormula(20) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=0', () => {
        const { result, time } = measureTime(sumToNFormula, 0);
        expect(result).toBe(0);
        console.log(`sumToNFormula(0) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=1', () => {
        const { result, time } = measureTime(sumToNFormula, 1);
        expect(result).toBe(1);
        console.log(`sumToNFormula(1) executed in ${time.toFixed(4)} ms`);
    });
});

describe('sumToNBitwise', () => {
    it('should return correct sum for n=10', () => {
        const { result, time } = measureTime(sumToNBitwise, 10);
        expect(result).toBe(55);
        console.log(`sumToNBitwise(10) executed in ${time.toFixed(4)} ms`);
    });

    it('should return correct sum for n=20', () => {
        const { result, time } = measureTime(sumToNBitwise, 20);
        expect(result).toBe(210);
        console.log(`sumToNBitwise(20) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=0', () => {
        const { result, time } = measureTime(sumToNBitwise, 0);
        expect(result).toBe(0);
        console.log(`sumToNBitwise(0) executed in ${time.toFixed(4)} ms`);
    });

    it('should handle edge case n=1', () => {
        const { result, time } = measureTime(sumToNBitwise, 1);
        expect(result).toBe(1);
        console.log(`sumToNBitwise(1) executed in ${time.toFixed(4)} ms`);
    });
});
