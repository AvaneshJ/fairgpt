"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Moon,
  Sun,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";

const features = [
  {
    icon: ShieldCheck,
    title: "AI-Powered Verification",
    description:
      "Advanced AI analyzes claims against trusted sources to determine authenticity.",
  },
  {
    icon: FileText,
    title: "Deep Source Analysis",
    description:
      "Evaluates source credibility using the Golden List methodology.",
  },
  {
    icon: AlertTriangle,
    title: "Bias Detection",
    description:
      "Identifies sentiment bias and presents multiple perspectives on any topic.",
  },
  {
    icon: Newspaper,
    title: "Media Verification",
    description:
      "Verify images and screenshots to detect manipulation or misinformation.",
  },
  {
    icon: BookOpen,
    title: "Temporal Tracking",
    description:
      "Track how stories evolve over time and see historical context.",
  },
  {
    icon: CheckCircle2,
    title: "Private & Secure",
    description:
      "Your search history is encrypted and only accessible to you.",
  },
];

const floatingElements = [
  { icon: "NEW", x: "8%", y: "20%", delay: "0s", duration: "25s", size: "text-4xl" },
  { icon: "TRUTH", x: "85%", y: "15%", delay: "3s", duration: "22s", size: "text-3xl" },
  { icon: "VERIFIED", x: "12%", y: "70%", delay: "6s", duration: "28s", size: "text-2xl" },
  { icon: "FAKE", x: "80%", y: "65%", delay: "2s", duration: "24s", size: "text-xl" },
  { icon: "REAL", x: "15%", y: "45%", delay: "5s", duration: "26s", size: "text-lg" },
  { icon: "CHECK", x: "75%", y: "40%", delay: "1s", duration: "23s", size: "text-2xl" },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: `${(Math.random() * 5).toFixed(1)}s`,
  duration: `${(Math.random() * 10 + 10).toFixed(1)}s`,
}));

function TypewriterText({ text, delay = 100 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      <span className={`inline-block w-0.5 h-[0.9em] bg-blue-600 ml-1 align-middle ${isTyping ? "animate-pulse" : ""}`} />
    </span>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-500/30 dark:bg-blue-400/20 animate-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

function FloatingTextBadge({ icon, x, y, delay, duration, size }: typeof floatingElements[0]) {
  return (
    <div
      className={`absolute hidden lg:flex pointer-events-none font-black ${size} text-blue-600/10 dark:text-blue-400/10 uppercase tracking-widest`}
      style={{
        left: x,
        top: y,
        animation: `badgeFloat ${duration} ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      {icon}
    </div>
  );
}

function PaperPlane() {
  return (
    <div className="absolute top-1/3 left-0 w-full overflow-hidden pointer-events-none">
      <div
        className="absolute flex items-center gap-3 opacity-20"
        style={{ animation: "planeFly 15s linear infinite" }}
      >
        <Newspaper size={24} className="text-blue-500" />
        <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
      </div>
      <div
        className="absolute flex items-center gap-3 opacity-15"
        style={{ animation: "planeFly 15s linear infinite", animationDelay: "5s", top: "100px" }}
      >
        <Newspaper size={20} className="text-indigo-500" />
        <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
      </div>
      <div
        className="absolute flex items-center gap-3 opacity-10"
        style={{ animation: "planeFly 15s linear infinite", animationDelay: "10s", top: "200px" }}
      >
        <Newspaper size={28} className="text-blue-600" />
        <div className="w-40 h-2 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
      </div>
    </div>
  );
}



function BreathingTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 blur-3xl opacity-20 animate-breathe">
        {children}
      </div>
      {children}
    </div>
  );
}

function PulsingButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-2xl animate-pulse-ring" />
      <button
        onClick={onClick}
        className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showButtonHint, setShowButtonHint] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtonHint(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }, [router]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isTransitioning) {
        handleAnalyze();
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handleAnalyze, isTransitioning]);

  if (!mounted) return null;

  return (
    <main
      className={`min-h-screen bg-slate-50 dark:bg-[#0f172a] overflow-hidden transition-all duration-700 ${
        isTransitioning ? "scale-110 opacity-0 blur-xl" : "scale-100 opacity-100"
      }`}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <FileText size={20} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <ShieldCheck size={8} className="text-white" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight">TruthLens</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/history")}
            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
          >
            History
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm transition-all hover:scale-105"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-blue-600" />
            )}
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <PaperPlane />
        <FloatingParticles />
        
        {floatingElements.map((props, i) => (
          <FloatingTextBadge key={i} {...props} />
        ))}

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow-reverse" />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-8 animate-in fade-in slide-in-from-bottom-4">
            <Zap size={14} className="text-blue-600" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              AI-Powered News Verification
            </span>
          </div>

          <div className="mb-6 animate-in fade-in zoom-in-95">
            <BreathingTitle>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <TypewriterText text="Verify the" delay={120} />
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Unseen.
                </span>
              </h1>
            </BreathingTitle>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 delay-100">
            Combat misinformation with AI-powered analysis. TruthLens audits news
            and claims against trusted sources, detecting bias and revealing the
            truth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 delay-200">
            <PulsingButton onClick={handleAnalyze}>
              <>
                Analyze Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform animate-bounce-subtle" />
              </>
            </PulsingButton>
            <Link
              href="/signup"
              className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              Create Account
            </Link>
          </div>

          {showButtonHint && (
            <div className="mt-6 animate-fade-in">
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70 flex items-center justify-center gap-2">
                <Sparkles size={14} className="animate-pulse" />
                Click above to start verifying news
              </p>
            </div>
          )}

          <div className="mt-16 flex items-center justify-center gap-8 text-slate-400/60 text-xs font-medium uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-emerald-500" />
              Trusted Sources
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-2">
              <FileText size={12} className="text-blue-500" />
              Fact-Checked
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden md:flex items-center gap-2">
              <AlertTriangle size={12} className="text-indigo-500" />
              Bias-Free
            </span>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full mt-2" />
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Why Choose <span className="text-blue-600">TruthLens</span>?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We combine cutting-edge AI with trusted verification methodologies
              to give you the most accurate picture of any story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[48px] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            </div>
            <div className="relative z-10">
              <BookOpen
                size={48}
                className="mx-auto text-white/80 mb-6"
              />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                The Golden List Methodology
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Our proprietary verification system cross-references claims
                against a curated list of the world&apos;s most trusted news sources,
                ensuring you get balanced, accurate information.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Reuters", "AP News", "BBC", "FactCheck.org", "Snopes"].map(
                  (source) => (
                    <span
                      key={source}
                      className="px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-white text-sm font-medium"
                    >
                      {source}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Verify?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-xl mx-auto">
            Join thousands of users who trust TruthLens to separate fact from
            fiction.
          </p>
          <button
            onClick={handleAnalyze}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
          >
            Start Analyzing
            <ArrowRight
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <FileText size={14} />
            </div>
            <span>TruthLens</span>
          </div>
          <p className="text-sm text-slate-500">
            Empowering truth through AI verification.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Verified & Secure</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes badgeFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.08;
          }
          25% {
            transform: translateY(-20px) rotate(3deg);
            opacity: 0.12;
          }
          50% {
            transform: translateY(-10px) rotate(-2deg);
            opacity: 0.1;
          }
          75% {
            transform: translateY(-25px) rotate(2deg);
            opacity: 0.08;
          }
        }
        
        @keyframes planeFly {
          0% {
            left: -200px;
            opacity: 0;
          }
          5% {
            opacity: 0.2;
          }
          95% {
            opacity: 0.2;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        
        @keyframes particle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-200px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes breathe {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.02);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(20px) scale(1.05);
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-particle {
          animation: particle 15s ease-in-out infinite;
        }
        
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 8s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4));
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 1.5s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
