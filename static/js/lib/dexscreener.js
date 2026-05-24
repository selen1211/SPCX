const CA = "0xb4e48fa4f977162cddf612b6d76d4f9ff1d2791a";

export const SPCX_CONFIG = {
    ca: CA,
    buyUrl: `https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0xb4e48fa4f977162cddf612b6d76d4f9ff1d2791a`,
    xUrl: "https://x.com/spcx_erc",
    ticker: "SPCX",
    fullName: "SpaceExplorationTechnologiesCorp",
    displayName: "Space Exploration Technologies Corp",
    chain: "Ethereum",
};

// Back-compat alias
export const DRAGON_CONFIG = SPCX_CONFIG;

const ENDPOINT = `https://api.dexscreener.com/latest/dex/tokens/${CA}`;

export async function fetchDragonStats() {
    try {
        const res = await fetch(ENDPOINT, { cache: "no-store" });
        if (!res.ok) throw new Error("dex_fetch_failed");
        const data = await res.json();
        const pairs = data?.pairs || [];
        if (!pairs.length) return null;
        const pair = [...pairs].sort(
            (a, b) => (b?.liquidity?.usd || 0) - (a?.liquidity?.usd || 0),
        )[0];
        return {
            priceUsd: parseFloat(pair?.priceUsd || "0"),
            priceChange24h: parseFloat(pair?.priceChange?.h24 || 0),
            volume24h: parseFloat(pair?.volume?.h24 || 0),
            liquidityUsd: parseFloat(pair?.liquidity?.usd || 0),
            marketCap: parseFloat(pair?.marketCap || pair?.fdv || 0),
            fdv: parseFloat(pair?.fdv || 0),
            dexUrl: pair?.url || "",
            pairAddress: pair?.pairAddress || "",
            txns24h:
                (pair?.txns?.h24?.buys || 0) + (pair?.txns?.h24?.sells || 0),
        };
    } catch (e) {
        return null;
    }
}

export const fetchSpcxStats = fetchDragonStats;

export function fmtUsd(n) {
    if (!n && n !== 0) return "—";
    if (n >= 1_000_000_000) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1_000_000) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1e3).toFixed(2)}K`;
    if (n >= 1) return `$${n.toFixed(4)}`;
    return `$${n.toPrecision(4)}`;
}

export function fmtPct(n) {
    if (n === null || n === undefined || Number.isNaN(n)) return "—";
    const sign = n >= 0 ? "+" : "";
    return `${sign}${n.toFixed(2)}%`;
}

export function shortCA(ca) {
    if (!ca) return "";
    return `${ca.slice(0, 6)}…${ca.slice(-6)}`;
}
