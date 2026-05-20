import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Hero from "./components/Hero";
import Lore from "./components/Lore";
import Footer from "./components/Footer";
import MissionStrip from "./components/MissionStrip";
import Starfield from "./components/Starfield";

function useStripBranding() {
    useEffect(() => {
        const strip = () => {
            const sel = [
                "#emergent-badge",
                'a[href*="emergent.sh"]',
                'a[href*="emergent.com"]',
            ];
            sel.forEach((s) =>
                document.querySelectorAll(s).forEach((el) => el.remove()),
            );
        };
        strip();
        const obs = new MutationObserver(strip);
        obs.observe(document.body, { childList: true, subtree: true });
        const id = setInterval(strip, 1000);
        return () => {
            obs.disconnect();
            clearInterval(id);
        };
    }, []);
}

function Home() {
    useStripBranding();
    return (
        <div className="relative bg-black min-h-screen" data-testid="home-page">
            <Starfield />
            <div className="grain" />
            <div className="relative z-10">
                <Hero />
                <MissionStrip />
                <Lore />
                <Footer />
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Toaster
                theme="dark"
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "#0d1117",
                        border: "1px solid rgba(255,180,107,0.3)",
                        color: "#fff",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        letterSpacing: "0.05em",
                    },
                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
