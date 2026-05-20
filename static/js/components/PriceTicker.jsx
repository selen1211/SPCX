import { useEffect, useState } from "react";
import { fetchDragonStats, fmtUsd, fmtPct } from "../lib/dexscreener";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function PriceTicker({ compact = false }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        let alive = true;
        const load = async () => {
            const s = await fetchDragonStats();
            if (!alive) return;
            setStats(s);
            setLoading(false);
            setPulse(true);
            setTimeout(() => setPulse(false), 600);
        };
        load();
        const id = setInterval(load, 20000);
        return () => {
            alive = false;
            clearInterval(id);
        };
    }, []);

    const up = stats && stats.priceChange24h >= 0;

    if (compact) {
        return (
            <div
                className="flex items-center gap-3 font-mono text-[11px] text-frost/80"
                data-testid="price-ticker-compact"
            >
                <span className="hud-label">PRICE</span>
                <span className="text-white font-medium">
                    {loading
                        ? "…"
                        : stats
                          ? fmtUsd(stats.priceUsd)
                          : "—"}
                </span>
                {stats && (
                    <span
                        className={
                            up ? "text-emerald-400" : "text-red-400"
                        }
                    >
                        {fmtPct(stats.priceChange24h)}
                    </span>
                )}
            </div>
        );
    }

    const Item = ({ label, value, accent }) => (
        <div className="flex flex-col gap-1 px-4 md:px-5 py-3 md:py-4 md:min-w-[140px] w-1/2 sm:w-auto border-r border-b sm:border-b-0 border-white/5 last:border-r-0">
            <span className="hud-label text-[9px] md:text-[10px]">{label}</span>
            <span
                className={`font-display font-bold text-base md:text-lg tracking-wider ${accent || "text-white"}`}
            >
                {value}
            </span>
        </div>
    );

    return (
        <div
            className={`glass relative flex flex-wrap sm:flex-nowrap sm:inline-flex sm:items-stretch max-w-full ${pulse ? "ring-1 ring-amber-500/30" : ""}`}
            data-testid="price-ticker"
        >
            <div className="corner-ticks">
                <span /><span /><span /><span />
            </div>
            <Item
                label="$SPCX"
                value={loading ? "—" : stats ? fmtUsd(stats.priceUsd) : "—"}
            />
            <Item
                label="24h"
                value={
                    loading ? "—" : stats ? (
                        <span className={`inline-flex items-center gap-1 ${up ? "text-emerald-400" : "text-red-400"}`}>
                            {up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            {fmtPct(stats.priceChange24h)}
                        </span>
                    ) : "—"
                }
            />
            <Item
                label="MARKET CAP"
                value={loading ? "—" : stats ? fmtUsd(stats.marketCap || stats.fdv) : "—"}
            />
            <Item
                label="VOLUME 24H"
                value={loading ? "—" : stats ? fmtUsd(stats.volume24h) : "—"}
            />
        </div>
    );
}
