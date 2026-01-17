import { ExternalLink, Link as LinkIcon } from "lucide-react";

interface Source {
  url: string;
  title?: string;
}

export default function SourceList({ sources }: { sources: string[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
        <LinkIcon size={16} /> Ground Truth Sources
      </h3>
      <div className="flex flex-wrap gap-2">
        {sources.map((url, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-medium transition-colors"
          >
            {new URL(url).hostname.replace("www.", "")}
            <ExternalLink size={12} />
          </a>
        ))}
      </div>
    </div>
  );
}
