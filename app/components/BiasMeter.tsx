"use client";
import React from "react";

interface BiasMeterProps {
  score: number; // 0.0 (Neutral) to 1.0 (Highly Biased)
}

export default function BiasMeter({ score }: BiasMeterProps) {
  // Convert 0-1 score to 0-180 degrees for the needle
  const rotation = score * 180;

  // Sentiment Logic: Mapping the score to a human-readable label
  const getSentiment = (s: number) => {
    if (s < 0.15)
      return {
        label: "Factual & Neutral",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
      };
    if (s < 0.35)
      return {
        label: "Balanced Reporting",
        color: "text-blue-500",
        bg: "bg-blue-50",
        border: "border-blue-100",
      };
    if (s < 0.65)
      return {
        label: "Mildly Opinionated",
        color: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber-100",
      };
    return {
      label: "Highly Biased / Loaded",
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-100",
    };
  };

  const sentiment = getSentiment(score);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* The Gauge Container */}
      <div className="relative w-56 h-28 overflow-hidden">
        {/* Background Arc */}
        <div className="absolute top-0 left-0 w-56 h-56 border-[14px] border-slate-100 rounded-full" />

        {/* Color Gradient Segments (Visual Guide) */}
        <div className="absolute top-0 left-0 w-56 h-56 border-[14px] border-transparent border-t-emerald-400/30 border-l-emerald-400/30 rounded-full rotate-45" />

        {/* The Needle */}
        <div
          className="absolute bottom-0 left-1/2 w-1.5 h-24 bg-slate-800 origin-bottom transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-50%) rotate(${rotation - 90}deg)` }}
        >
          <div className="w-4 h-4 bg-slate-800 rounded-full -ml-1.5 mt-20 shadow-sm" />
        </div>
      </div>

      {/* NEW: Sentiment Label Widget */}
      <div
        className={`mt-6 px-4 py-2 rounded-full border ${sentiment.bg} ${sentiment.border} ${sentiment.color} flex items-center gap-2 transition-all duration-500 animate-in fade-in zoom-in-95`}
      >
        <div
          className={`w-2 h-2 rounded-full ${sentiment.color.replace(
            "text",
            "bg"
          )} animate-pulse`}
        />
        <span className="text-xs font-bold uppercase tracking-widest">
          {sentiment.label}
        </span>
      </div>

      {/* Secondary Score Text */}
      <p className="mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
        Bias Intensity Index: {(score * 100).toFixed(1)}%
      </p>
    </div>
  );
}
