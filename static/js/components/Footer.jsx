import { SPCX_CONFIG, shortCA } from "../lib/dexscreener";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(SPCX_CONFIG.ca);
            toast.success("Contract copied");
        } catch (e) {}
    };

    return (
        <footer className="relative bg-black border-t border-white/5 py-10 md:py-14" data-testid="footer">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid md:grid-cols-3 gap-6 md:gap-10 items-center text-center md:text-left">
                <div className="space-y-2">
                    <div className="font-display font-extrabold text-xl md:text-2xl tracking-[0.22em] text-white">
                        $SPCX
                    </div>
                    <div className="hud-label">SPACE EXPLORATION TECHNOLOGIES CORP</div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleCopy}
                        className="ca-chip"
                        data-testid="footer-ca-copy-btn"
                    >
                        <span className="hud-label">CA</span>
                        <span>{shortCA(SPCX_CONFIG.ca)}</span>
                        <Copy size={14} className="text-white/50" />
                    </button>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                    <a
                        href={SPCX_CONFIG.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        data-testid="footer-buy-btn"
                    >
                        BUY ON PUMP.FUN
                    </a>
                    <a
                        href={SPCX_CONFIG.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        data-testid="footer-x-btn"
                    >
                        X · COMMUNITY
                    </a>
                </div>
            </div>

            <div className="mt-8 md:mt-10 max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col sm:flex-row items-center gap-2 sm:gap-0 justify-between text-[10px] font-mono text-white/35 text-center">
                <span>© {new Date().getFullYear()} · $SPCX // PRE-LISTING</span>
                <span>NOT AFFILIATED WITH SPACEX OR NASDAQ · COMMUNITY TOKEN</span>
            </div>
        </footer>
    );
}
