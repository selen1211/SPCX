import { useState, useRef, useEffect } from "react";
import { Rocket, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { SPCX_CONFIG, shortCA } from "../lib/dexscreener";
import PriceTicker from "./PriceTicker";

const LOGO_IMG =
    "https://customer-assets.emergentagent.com/job_dragon-mascot-space/artifacts/uow1xmhv_Capture%20d%E2%80%99%C3%A9cran%202026-05-17%20215017-Photoroom.png";
const BG_IMG =
    "https://customer-assets.emergentagent.com/job_b9898bd1-e5b6-4780-bd5f-79a5adde3d33/artifacts/xjabdk3p_image.png";

export default function Hero() {
    const [copied, setCopied] = useState(false);
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handle = (e) => {
            if (!parallaxRef.current) return;
            if (window.innerWidth < 1024) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 14;
            const y = (e.clientY / window.innerHeight - 0.5) * 14;
            parallaxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };
        window.addEventListener("mousemove", handle);
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(SPCX_CONFIG.ca);
            setCopied(true);
            toast.success("Contract copied to clipboard", {
                description: "Welcome aboard, astronaut.",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            toast.error("Copy failed");
        }
    };

    return (
        <section
            className="relative lg:min-h-screen overflow-hidden"
            data-testid="hero-section"
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 reveal-mask hidden md:block"
                    style={{
                        backgroundImage: `url(${BG_IMG})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center right",
                        filter: "brightness(0.6) saturate(1.05) contrast(1.05)",
                    }}
                />
                <div
                    className="absolute inset-0 reveal-mask md:hidden"
                    style={{
                        backgroundImage: `url(${BG_IMG})`,
                        backgroundSize: "cover",
                        backgroundPosition: "70% center",
                        filter: "brightness(0.4) saturate(1.05) contrast(1.05)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
                <div className="absolute inset-0 scanlines" />
            </div>

            {/* Top nav */}
            <nav className="relative z-30 flex items-center justify-between px-4 md:px-12 pt-4 md:pt-6 gap-3">
                <div className="flex items-center gap-2.5 fade-in-up min-w-0">
                    <div className="w-8 h-8 md:w-9 md:h-9 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={LOGO_IMG} alt="SPCX" className="w-6 h-6 md:w-7 md:h-7 object-contain" />
                    </div>
                    <div className="leading-tight min-w-0">
                        <div className="font-display font-extrabold tracking-[0.22em] text-[13px] md:text-sm text-white">
                            $SPCX
                        </div>
                        <div className="hud-label text-[9px] md:text-[10px] truncate">SPACE EXPLORATION TECHNOLOGIES CORP</div>
                    </div>
                </div>

                <a
                    href={SPCX_CONFIG.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !px-3 md:!px-5 !py-2 md:!py-3.5 shrink-0 fade-in-up delay-200"
                    data-testid="nav-x-community-btn"
                >
                    <XIcon />
                    <span className="hidden sm:inline">COMMUNITY</span>
                </a>
            </nav>

            {/* Side rails — desktop only */}
            <div className="absolute left-6 top-1/3 hidden lg:flex flex-col items-center gap-3 z-20 fade-in-up delay-500">
                <div className="hud-label rotate-180" style={{ writingMode: "vertical-rl" }}>
                    NASDAQ · PRE-LISTING · SOLANA
                </div>
                <div className="v-hairline h-32" />
                <div className="w-2 h-2 rounded-full bg-amber-500 blink-dot" />
            </div>
            <div className="absolute right-6 top-1/3 hidden lg:flex flex-col items-center gap-3 z-20 fade-in-up delay-500">
                <div className="hud-label" style={{ writingMode: "vertical-rl" }}>
                    THE OG · CORRECT NAME / CORRECT TICKER
                </div>
                <div className="v-hairline h-32" />
                <div className="w-2 h-2 rounded-full bg-cyan-400 blink-dot" />
            </div>

            {/* ============== MOBILE HERO ============== */}
            <div className="lg:hidden relative z-20 px-4 pt-4 pb-6">
                <div className="relative flex items-center justify-center h-[220px] sm:h-[280px] mb-3">
                    <div
                        className="absolute w-[200px] sm:w-[260px] h-[200px] sm:h-[260px] rounded-full spin-slow"
                        style={{ border: "1px dashed rgba(108,196,255,0.18)" }}
                    />
                    <div
                        className="absolute w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,122,26,0.28) 0%, rgba(255,122,26,0) 70%)",
                            filter: "blur(24px)",
                        }}
                    />
                    <img
                        src={LOGO_IMG}
                        alt="SPCX rocket"
                        className="relative z-10 h-[220px] sm:h-[280px] w-auto drop-shadow-[0_30px_50px_rgba(255,122,26,0.25)] float-hover"
                    />
                </div>

                <div className="flex items-center gap-2 justify-center mb-3 fade-in-up">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full blink-dot" />
                    <span className="hud-label">LIVE · NASDAQ-CODED · $SPCX</span>
                </div>

                <h1 className="dragon-headline text-[80px] sm:text-[104px] font-display fade-in-up delay-100 leading-[0.92] text-center tracking-[-0.03em]">
                    $SPCX
                </h1>

                <div className="flex items-center justify-center gap-2 mt-1 mb-4 fade-in-up delay-200">
                    <div className="h-px w-4 bg-white/40" />
                    <div className="font-display tracking-[0.12em] text-[10px] sm:text-[11px] text-white/85 whitespace-nowrap uppercase">
                        Space Exploration Technologies Corp.
                    </div>
                    <div className="h-px w-4 bg-white/40" />
                </div>

                <p className="text-[13px] text-white/70 leading-relaxed text-center mb-5 max-w-sm mx-auto fade-in-up delay-300">
                    The ultimate ticker. The OG name. Elon's empire — going
                    public on NASDAQ.
                </p>

                <div className="flex gap-2.5 mb-3 fade-in-up delay-400">
                    <a
                        href={SPCX_CONFIG.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-launch pulse-ember flex-1 justify-center !px-4 whitespace-nowrap"
                        data-testid="hero-buy-btn"
                    >
                        <Rocket size={14} />
                        BUY $SPCX
                    </a>
                    <a
                        href={SPCX_CONFIG.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost !px-4 justify-center"
                        data-testid="hero-x-community-btn"
                        aria-label="Join on X"
                    >
                        <XIcon />
                    </a>
                </div>

                <button
                    onClick={handleCopy}
                    className="ca-chip group fade-in-up delay-500 w-full justify-center"
                    data-testid="hero-ca-copy-btn"
                >
                    <span className="hud-label">CA</span>
                    <span className="text-white/90 group-hover:text-white">
                        {shortCA(SPCX_CONFIG.ca)}
                    </span>
                    {copied ? (
                        <Check size={14} className="text-emerald-400 shrink-0" />
                    ) : (
                        <Copy size={14} className="text-white/50 group-hover:text-amber-400 shrink-0" />
                    )}
                </button>

                <div className="fade-in-up delay-700 mt-3">
                    <PriceTicker />
                </div>
            </div>

            {/* ============== DESKTOP HERO ============== */}
            <div className="hidden lg:grid relative z-20 px-4 md:px-12 pt-8 md:pt-20 pb-32 grid-cols-[1.1fr_0.9fr] gap-10 items-center max-w-[1500px] mx-auto">
                <div className="space-y-7 max-w-full min-w-0">
                    <div className="flex items-center gap-3 hud-label fade-in-up">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full blink-dot" />
                        LIVE · NASDAQ-CODED · $SPCX
                    </div>

                    <h1
                        className="dragon-headline font-display fade-in-up delay-100 leading-[0.92] whitespace-nowrap"
                        style={{ fontSize: "clamp(72px, 9vw, 168px)" }}
                    >
                        $SPCX
                    </h1>

                    <div className="flex items-center gap-4 fade-in-up delay-150">
                        <div className="h-px w-12 bg-white/40" />
                        <div className="font-display tracking-[0.06em] text-base xl:text-lg text-white whitespace-nowrap font-semibold">
                            Space Exploration Technologies Corp.
                        </div>
                        <div className="h-px flex-1 bg-white/15" />
                    </div>

                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 fade-in-up delay-200">
                        Apple Inc. = AAPL &nbsp;·&nbsp; Microsoft Corp. = MSFT &nbsp;·&nbsp;{" "}
                        <span className="text-white">SpaceExplorationTechnologiesCorp = $SPCX</span>
                    </div>

                    <p className="text-base xl:text-lg text-white/75 max-w-xl leading-relaxed fade-in-up delay-300">
                        On TradingView, the upcoming NASDAQ listing already exists
                        under one name: <span className="text-white">Space Exploration Technologies Corp.</span> Everyone fixates on
                        tickers — and forgets the name is half the lore.
                        This isn't another IPO. This is Elon's empire going
                        public. Space. Robots. AI. Cars. Mars. Wealth. The
                        future.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 fade-in-up delay-400">
                        <a
                            href={SPCX_CONFIG.buyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-launch pulse-ember"
                            data-testid="hero-buy-btn-desktop"
                        >
                            <Rocket size={16} />
                            BUY $SPCX
                        </a>
                        <a
                            href={SPCX_CONFIG.xUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost"
                            data-testid="hero-x-community-btn-desktop"
                        >
                            <XIcon />
                            JOIN THE FLIGHT
                        </a>
                    </div>

                    <button
                        onClick={handleCopy}
                        className="ca-chip group fade-in-up delay-500"
                        data-testid="hero-ca-copy-btn-desktop"
                    >
                        <span className="hud-label">CA</span>
                        <span className="text-white/90 group-hover:text-white">
                            {shortCA(SPCX_CONFIG.ca)}
                        </span>
                        {copied ? (
                            <Check size={14} className="text-emerald-400" />
                        ) : (
                            <Copy size={14} className="text-white/50 group-hover:text-amber-400" />
                        )}
                    </button>

                    <div className="fade-in-up delay-700 pt-2">
                        <PriceTicker />
                    </div>
                </div>

                <div className="relative flex items-center justify-center min-h-[640px]">
                    <div className="crosshair" style={{ top: "30%", left: "30%" }} />
                    <div
                        className="absolute w-[78%] aspect-square rounded-full spin-slow"
                        style={{ border: "1px dashed rgba(108,196,255,0.18)" }}
                    />
                    <div
                        className="absolute w-[55%] aspect-square rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,122,26,0.28) 0%, rgba(255,122,26,0) 70%)",
                            filter: "blur(24px)",
                        }}
                    />
                    <div
                        ref={parallaxRef}
                        className="relative transition-transform duration-300 ease-out w-full"
                        style={{ willChange: "transform" }}
                    >
                        <img
                            src={LOGO_IMG}
                            alt="SPCX rocket launching"
                            className="relative z-10 max-h-[640px] w-auto mx-auto drop-shadow-[0_30px_60px_rgba(255,122,26,0.25)]"
                            data-testid="hero-spcx-img"
                        />
                    </div>
                    <div className="absolute top-[14%] right-[6%] flex items-center gap-2 fade-in-up delay-900 z-20">
                        <div className="font-mono text-[10px] text-white/55 text-right">
                            <div className="hud-label text-amber-400/90">[01]</div>
                            <div>LISTING PREP</div>
                            <div className="text-white/40">NASDAQ · PRE-IPO</div>
                        </div>
                        <div className="w-12 h-px bg-amber-400/60" />
                    </div>
                    <div className="absolute bottom-[14%] left-[2%] flex items-center gap-2 fade-in-up delay-900 z-20">
                        <div className="w-12 h-px bg-cyan-400/60" />
                        <div className="font-mono text-[10px] text-white/55">
                            <div className="hud-label text-cyan-400/90">[02]</div>
                            <div>EMPIRE GOES PUBLIC</div>
                            <div className="text-white/40">MUSK · MARS · MARKETS</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative lg:absolute lg:bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/60 backdrop-blur-sm overflow-hidden">
                <div className="marquee-track py-2 md:py-3 whitespace-nowrap font-display text-[10px] md:text-[11px] tracking-[0.3em] md:tracking-[0.35em] text-white/40">
                    {Array.from({ length: 2 }).map((_, idx) => (
                        <span key={idx} className="inline-flex items-center">
                            {[
                                "$SPCX · OG TICKER",
                                "SPACE EXPLORATION TECHNOLOGIES CORP",
                                "PRE-NASDAQ · ON SOLANA",
                                "ELON'S EMPIRE",
                                "SPACE · ROBOTS · AI · CARS · MARS",
                                "THE ULTIMATE TICKER",
                                "CORRECT NAME · CORRECT TICKER",
                                "PUMP.FUN · LIVE",
                            ].map((s, i) => (
                                <span key={i} className="px-6 md:px-8">
                                    {s} <span className="text-amber-500/60">◆</span>
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function XIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}
