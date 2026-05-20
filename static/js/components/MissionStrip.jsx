import { useEffect, useState } from "react";
import { fetchSpcxStats, fmtUsd } from "../lib/dexscreener";

const STATIC_ITEMS = [
    { label: "TICKER", value: "$SPCX" },
    { label: "LISTING", value: "NASDAQ-CODED" },
    { label: "STAGE", value: "PUMP.FUN" },
    { label: "CHAIN", value: "SOLANA" },
];

export default function MissionStrip() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        let alive = true;
        fetchSpcxStats().then((s) => alive && setStats(s));
        const id = setInterval(
            () => fetchSpcxStats().then((s) => alive && setStats(s)),
            30000,
        );
        return () => {
            alive = false;
            clearInterval(id);
        };
    }, []);

    const items = [
        ...STATIC_ITEMS,
        {
            label: "TX 24H",
            value: stats ? `${stats.txns24h.toLocaleString()}` : "—",
        },
        {
            label: "LIQUIDITY",
            value: stats ? fmtUsd(stats.liquidityUsd) : "—",
        },
    ];

    return (
        <section
            className="relative bg-black border-y border-white/5 py-6 md:py-10"
            data-testid="mission-strip"
        >
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
                {items.map((it) => (
                    <div
                        key={it.label}
                        className="bg-black px-4 md:px-6 py-4 md:py-6 flex flex-col gap-1.5 md:gap-2"
                    >
                        <span className="hud-label text-[9px] md:text-[10px]">{it.label}</span>
                        <span className="font-display text-base md:text-xl font-bold text-white tracking-wider">
                            {it.value}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
