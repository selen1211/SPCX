import { useEffect, useRef, useState } from "react";

const LOGO_IMG =
    "https://customer-assets.emergentagent.com/job_dragon-mascot-space/artifacts/uow1xmhv_Capture%20d%E2%80%99%C3%A9cran%202026-05-17%20215017-Photoroom.png";

const CHAPTERS = [
    {
        no: "01",
        title: "THE FULL NAME",
        body: "On TradingView, the upcoming NASDAQ listing already exists under one name — Space Exploration Technologies Corp. Everyone fixates on the ticker and forgets the company name. Apple Inc. = AAPL. Microsoft Corporation = MSFT. Two halves of the same coin. Get the name right, you get the lore right.",
    },
    {
        no: "02",
        title: "THE EMPIRE GOES PUBLIC",
        body: "This isn't another IPO. This is Elon Musk taking the empire public — the one that holds everything he is. Space. Robots. AI. Cars. Mars. Wealth. The future. $SPCX isn't a bet on a company. It's a bet on the most consequential roadmap in modern history.",
    },
    {
        no: "03",
        title: "THE ULTIMATE TICKER",
        body: "Companion tickers have run to 100M on far less. Now imagine the ultimate one — the OG ticker with the correct name attached. $SPCX. SpaceExplorationTechnologiesCorp. The pre-listing is live on Solana. Strap in. The NASDAQ bell hasn't even rung yet.",
    },
];

export default function Lore() {
    const [active, setActive] = useState(0);
    const refs = useRef([]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const idx = Number(e.target.dataset.idx);
                        setActive(idx);
                    }
                });
            },
            { threshold: 0.55 },
        );
        refs.current.forEach((r) => r && obs.observe(r));
        return () => obs.disconnect();
    }, []);

    return (
        <section
            id="lore"
            className="relative bg-black py-20 md:py-32 lg:py-40 overflow-hidden"
            data-testid="lore-section"
        >
            <div
                className="absolute -left-[20%] top-[20%] w-[60vw] h-[60vw] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at 60% 50%, rgba(108,196,255,0.18) 0%, rgba(108,196,255,0.04) 35%, rgba(0,0,0,0) 70%)",
                    filter: "blur(20px)",
                }}
            />
            <div
                className="absolute -right-[15%] bottom-[5%] w-[40vw] h-[40vw] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,122,26,0.18) 0%, rgba(0,0,0,0) 65%)",
                    filter: "blur(20px)",
                }}
            />

            <div className="relative max-w-[1400px] mx-auto px-4 md:px-12">
                <div className="flex items-center gap-4 mb-12 md:mb-20">
                    <div className="hud-label text-amber-400 whitespace-nowrap text-[9px] md:text-[10px]">[ PRE-LISTING DOSSIER ]</div>
                    <div className="hairline flex-1" />
                    <div className="hud-label whitespace-nowrap text-[9px] md:text-[10px]">CH 01–03</div>
                </div>

                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-24 items-start">
                    <div className="lg:sticky lg:top-24 self-start">
                        <div className="relative aspect-square w-full max-w-[260px] md:max-w-md mx-auto flex items-center justify-center">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(255,122,26,0.28) 0%, rgba(0,0,0,0) 65%)",
                                    filter: "blur(24px)",
                                }}
                            />
                            <div
                                className="absolute inset-6 rounded-full spin-slow"
                                style={{ border: "1px dashed rgba(108,196,255,0.2)" }}
                            />
                            <img
                                src={LOGO_IMG}
                                alt="SPCX rocket"
                                className="relative w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,122,26,0.25)]"
                            />
                        </div>

                        <div className="mt-8 md:mt-10 max-w-md mx-auto">
                            <div className="flex items-center justify-between mb-3">
                                <span className="hud-label">CHAPTER</span>
                                <span className="font-mono text-xs text-white/60">
                                    {String(active + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
                                </span>
                            </div>
                            <div className="h-px bg-white/10 relative overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700"
                                    style={{ width: `${((active + 1) / CHAPTERS.length) * 100}%` }}
                                />
                            </div>
                            <div className="mt-3 font-display text-base md:text-lg tracking-[0.18em] text-white">
                                {CHAPTERS[active].title}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {CHAPTERS.map((c, i) => (
                            <article
                                key={c.no}
                                ref={(el) => (refs.current[i] = el)}
                                data-idx={i}
                                className="relative"
                                data-testid={`lore-chapter-${i}`}
                            >
                                <div className="flex items-start gap-3 md:gap-6">
                                    <div className="font-display text-[56px] md:text-[88px] font-extrabold leading-none text-white/5 select-none shrink-0">
                                        {c.no}
                                    </div>
                                    <div className="flex-1 pt-2 md:pt-4 min-w-0">
                                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                                            <span className="hud-label text-amber-400">
                                                CH · {c.no}
                                            </span>
                                            <div className="h-px w-10 bg-amber-400/60" />
                                        </div>
                                        <h3 className="font-display text-xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.06em] text-white mb-4 md:mb-6 leading-tight">
                                            {c.title}
                                        </h3>
                                        <p className="text-sm md:text-lg text-white/65 leading-relaxed max-w-xl">
                                            {c.body}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-20 md:mt-32 text-center">
                    <div className="hairline mx-auto max-w-md mb-6 md:mb-8" />
                    <p className="font-display text-base md:text-2xl lg:text-3xl font-extrabold tracking-[-0.01em] text-white px-4">
                        Correct name. Correct ticker. The OG.
                    </p>
                    <div className="hairline mx-auto max-w-md mt-6 md:mt-8" />
                </div>
            </div>
        </section>
    );
}
