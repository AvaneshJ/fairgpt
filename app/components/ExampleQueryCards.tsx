"use client";
import React from "react";

// 🟢 This block is required to fix your TypeScript error
interface ExampleQueryCardsProps {
  onSelect: (query: string) => void;
}

const EXAMPLES = [
  {
    title: "Energy & Supply",
    query:
      "Verify petrol shortage rumors in MP and the new 45-day LPG booking rule 2026",
    icon: "⛽",
  },
  {
    title: "Digital Finance",
    query:
      "Is the 1.1% transaction fee on UPI payments above ₹2000 officially active?",
    icon: "💳",
  },
  {
    title: "State Policy",
    query:
      "Verify MP government's mandatory PNG surrendering rule for LPG users",
    icon: "🏛️",
  },
  {
    title: "Health & Safety",
    query:
      "Is the Ministry of Health mandating a mask rule for the 2026 festival season?",
    icon: "🏥",
  },
];

export default function ExampleQueryCards({
  onSelect,
}: ExampleQueryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
      {EXAMPLES.map((item, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(item.query)}
          className="group text-left p-6 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-[28px] transition-all hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1"
        >
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            {item.title}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed italic line-clamp-2">
            "{item.query}"
          </p>
        </button>
      ))}
    </div>
  );
}
