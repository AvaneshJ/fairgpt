"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CheckCircle2, Globe, Hash, Shield } from "lucide-react";

interface AuditProps {
  data?: {
    goldenCount: number;
    consensusCount: number;
    rawCount: number;
  };
}

export default function VerificationCharts({ data }: AuditProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const processed = useMemo(() => {
    const goldenCount = data?.goldenCount ?? 0;
    const consensusCount = data?.consensusCount ?? 0;
    const rawCount = data?.rawCount ?? 0;

    const weightedSum =
      goldenCount * 1.0 + consensusCount * 0.55 + rawCount * 0.1;

    const maxPossible = Math.max(weightedSum, 5);
    const score = Math.min(Math.round((weightedSum / maxPossible) * 100), 100);
    return {
      score,
      chartData: [
        {
          name: "Top Tier",
          count: goldenCount,
          color: "url(#greenGradient)",
          icon: <CheckCircle2 size={12} className="text-emerald-500" />,
        },
        {
          name: "Major Media",
          count: consensusCount,
          color: "url(#blueGradient)",
          icon: <Globe size={12} className="text-blue-500" />,
        },
        {
          name: "Other Web",
          count: rawCount,
          color: "url(#grayGradient)",
          icon: <Hash size={12} className="text-slate-400" />,
        },
      ],
    };
  }, [data]);

  // 🟢 FIXED TICK POSITIONING
  const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = processed.chartData.find((d) => d.name === payload.value);
    return (
      <g transform={`translate(${x - 120},${y - 10})`}>
        <foreignObject width="115" height="20">
          <div className="flex items-center justify-end gap-2 h-full w-full pr-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap leading-none">
              {payload.value}
            </span>
            <span className="flex items-center opacity-80">{item?.icon}</span>
          </div>
        </foreignObject>
      </g>
    );
  };

  if (!isMounted || !data) return null;

  return (
    <div className="flex flex-col w-full h-full min-h-[220px]">
      {/* Score Badge */}
      <div className="flex justify-end mb-2">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700">
          <Shield
            size={10}
            className={
              processed.score > 70 ? "text-emerald-500" : "text-amber-500"
            }
          />
          <span className="text-[9px] font-black uppercase text-slate-500 dark:text-slate-400">
            Source Score: {processed.score}%
          </span>
        </div>
      </div>

      {/* 🟢 RE-CENTERED CHART CONTAINER */}
      <div className="flex-1 w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={processed.chartData}
            margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="grayGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.08)" />
            <XAxis type="number" hide domain={[0, "dataMax + 1"]} />
            <YAxis
              dataKey="name"
              type="category"
              tick={<CustomYAxisTick />}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.05)" }}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-2 rounded-xl shadow-xl">
                    <p className="text-[10px] font-black text-slate-800 dark:text-slate-100 uppercase">
                      {payload[0].value} Sources
                    </p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={12}>
              {processed.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
