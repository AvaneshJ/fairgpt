"use client";
import React from "react";

interface TestDemoCardsProps {
  onSelect: (query: string, result: any) => void;
}

const TEST_DEMOS = [
  {
    title: "Verified Claim",
    query: "Earth orbits around the Sun",
    description: "Shows a verified result with high certainty",
    icon: "✓",
    color: "emerald",
  },
  {
    title: "Misleading Claim",
    query: "Chocolate is healthy for you",
    description: "Shows a misleading result with warnings",
    icon: "⚠",
    color: "amber",
  },
  {
    title: "Fake News",
    query: "New vaccine contains microchips",
    description: "Shows a false/unverified result",
    icon: "✗",
    color: "red",
  },
];

const mockResults = {
  "Earth orbits around the Sun": {
    verdict: "Verified",
    certainty: 98,
    summary: "This is a scientifically verified fact. The Earth orbits the Sun in an elliptical path, completing one revolution approximately every 365.25 days. This has been confirmed through centuries of astronomical observation and modern space science.",
    counter_summary: "While some alternative models exist, the overwhelming scientific consensus and evidence confirm heliocentrism.",
    clarifications: [
      "The orbit is elliptical, not perfectly circular",
      "One orbit takes approximately 365.25 days",
      "The distance varies from 147 to 152 million km",
    ],
    audit_history: [
      "Cross-referenced with NASA official data",
      "Verified against astronomical records since 1543",
      "Confirmed by satellite imagery and space missions",
    ],
    sources: [
      { url: "https://science.nasa.gov/earth", meta: { name: "NASA Science", type: "Government", certified: true, reliability: "Verified" } },
      { url: "https://www.esa.int", meta: { name: "ESA", type: "Government", certified: true, reliability: "Verified" } },
    ],
    bias_score: 0,
    verification_audit: { goldenCount: 15, consensusCount: 15, rawCount: 18 },
    trend_history: [
      { date: "2024-01", volume: 1200 },
      { date: "2024-02", volume: 1350 },
      { date: "2024-03", volume: 1100 },
    ],
    logic_audit: "The claim aligns perfectly with established scientific consensus.",
  },
  "Chocolate is healthy for you": {
    verdict: "Misleading",
    certainty: 72,
    summary: "While chocolate (especially dark chocolate with high cocoa content) contains antioxidants and may offer some health benefits, claiming it is 'healthy' is misleading. Excessive consumption leads to weight gain, diabetes, and other health issues.",
    counter_summary: "Some studies suggest moderate dark chocolate consumption may have cardiovascular benefits, but these benefits are outweighed by risks when consumed in excess.",
    clarifications: [
      "Only dark chocolate with 70%+ cocoa may have benefits",
      "Recommended serving is 1-2 squares per day",
      "Milk chocolate and white chocolate offer minimal benefits",
      "High sugar and fat content can cause health issues",
    ],
    audit_history: [
      "Analyzed 23 peer-reviewed studies on chocolate consumption",
      "Cross-referenced with WHO dietary guidelines",
      "Verified nutritional information from FDA databases",
    ],
    sources: [
      { url: "https://www.who.int", meta: { name: "WHO", type: "Government", certified: true, reliability: "Verified" } },
      { url: "https://www.fda.gov", meta: { name: "FDA", type: "Government", certified: true, reliability: "Verified" } },
    ],
    bias_score: 35,
    verification_audit: { goldenCount: 8, consensusCount: 5, rawCount: 15 },
    trend_history: [
      { date: "2024-01", volume: 3400 },
      { date: "2024-02", volume: 3800 },
      { date: "2024-03", volume: 4200 },
    ],
    logic_audit: "Claim oversimplifies complex nutritional science.",
  },
  "New vaccine contains microchips": {
    verdict: "False",
    certainty: 99,
    summary: "This claim is completely false. COVID-19 vaccines do not contain microchips, tracking devices, or any foreign electronic components. This is a conspiracy theory that has been debunked by health authorities worldwide.",
    counter_summary: "Vaccines contain standard ingredients like lipids, salts, and buffering agents - no electronic components exist due to size, power, and safety constraints.",
    clarifications: [
      "Vaccines are too small to contain functioning microchips",
      "No power source exists in any vaccine formulation",
      "Ingredients are publicly available and FDA-approved",
      "Multiple fact-checking organizations have debunked this",
    ],
    audit_history: [
      "Verified vaccine ingredient lists from FDA submissions",
      "Cross-referenced with WHO vaccine safety data",
      "Confirmed by independent laboratory analysis",
    ],
    sources: [
      { url: "https://www.cdc.gov", meta: { name: "CDC", type: "Government", certified: true, reliability: "Verified" } },
      { url: "https://www.fda.gov", meta: { name: "FDA", type: "Government", certified: true, reliability: "Verified" } },
      { url: "https://www.who.int", meta: { name: "WHO", type: "Government", certified: true, reliability: "Verified" } },
    ],
    bias_score: 15,
    verification_audit: { goldenCount: 25, consensusCount: 25, rawCount: 25 },
    trend_history: [
      { date: "2024-01", volume: 8500 },
      { date: "2024-02", volume: 6200 },
      { date: "2024-03", volume: 4100 },
    ],
    logic_audit: "Claim contradicts basic physics, biology, and engineering principles.",
  },
};

export default function TestDemoCards({ onSelect }: TestDemoCardsProps) {
  return (
    <div className="mt-6 w-full max-w-4xl">
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-4 font-bold text-center">
        Demo Mode - Test Without API
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEST_DEMOS.map((demo, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(demo.query, mockResults[demo.query as keyof typeof mockResults])}
            className="group text-left p-5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                  demo.color === "emerald"
                    ? "bg-emerald-100 text-emerald-600"
                    : demo.color === "amber"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {demo.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {demo.title}
                </h3>
                <p className="text-[10px] text-slate-500">{demo.description}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
              &quot;{demo.query}&quot;
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
