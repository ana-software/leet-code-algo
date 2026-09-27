export function maxProfit(prices: number[]): number {
    let minPrice = prices[0]; // cheapest buy seen so far
    let best = 0;

    for (let i = 1; i < prices.length; i++) {
        // Best sale today = today's price minus the cheapest earlier day
        best = Math.max(best, prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }

    return best;
};
