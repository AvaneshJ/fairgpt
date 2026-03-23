"use client";
import { useState, useEffect, useCallback } from "react";
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
    description: "Your search history is encrypted and only accessible to you.",
  },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: `${(Math.random() * 5).toFixed(1)}s`,
  duration: `${(Math.random() * 10 + 10).toFixed(1)}s`,
}));

function TypewriterText({
  text,
  delay = 100,
}: {
  text: string;
  delay?: number;
}) {
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
      <span
        className={`inline-block w-0.5 h-[0.9em] bg-blue-600 ml-1 align-middle ${isTyping ? "animate-pulse" : ""}`}
      />
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

function PulsingButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
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
    const timer = setTimeout(() => setShowButtonHint(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => router.push("/dashboard"), 800);
  }, [router]);

  if (!mounted) return null;

  return (
    <main
      className={`min-h-screen bg-slate-50 dark:bg-[#0f172a] overflow-hidden transition-all duration-700 ${isTransitioning ? "scale-110 opacity-0 blur-xl" : "scale-100 opacity-100"}`}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white">
            <FileText size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">TruthLens</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 border"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-blue-600" />
            )}
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <PaperPlane />
        <FloatingParticles />
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <Zap size={14} className="text-blue-600 mb-4 inline-block" />
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <TypewriterText text="Verify the" delay={120} />
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Unseen.
            </span>
          </h1>
          <PulsingButton onClick={handleAnalyze}>
            Analyze Now <ArrowRight size={20} />
          </PulsingButton>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border"
            >
              <feature.icon className="mb-4 text-blue-500" />
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes planeFly {
          0% {
            left: -200px;
            opacity: 0;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        @keyframes particle {
          0% {
            transform: translateY(0);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
        }
        .animate-particle {
          animation: particle 15s infinite;
        }
      `}</style>
    </main>
  );
}
