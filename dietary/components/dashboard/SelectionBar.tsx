"use client";

import { useState } from "react";

type Props = {
  count: number;
  onClear: () => void;
  onExport?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onSuspend?: () => void;
  onRestore?: () => void;
  onMessage?: () => void;
};

export function SelectionBar({ count, onClear, onExport, onArchive, onDelete, onSuspend, onRestore, onMessage }: Props) {
  const [showMore, setShowMore] = useState(false);

  if (count === 0) return null;

  return (
    <div className="fixed bottom-[22px] left-1/2 -translate-x-1/2 bg-admin-selbar-bg text-white flex items-center gap-1 rounded-[14px] py-2 px-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-50">
      <div
        onClick={onClear}
        className="bg-admin-sel-close rounded-[9px] w-9 h-9 flex items-center justify-center cursor-pointer"
        title="Clear selection"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <div className="px-4 text-[15px] font-medium">Selected: {count}</div>

      {onExport && (
        <div onClick={onExport} className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-admin-selbar-hover transition-colors" title="Export CSV">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-[18px] h-[18px]">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
      )}

      {onSuspend && (
        <div onClick={onSuspend} className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-admin-selbar-hover transition-colors" title="Suspend selected">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-[18px] h-[18px]">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
      )}

      {onRestore && (
        <div onClick={onRestore} className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-admin-selbar-hover transition-colors" title="Restore selected">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-[18px] h-[18px]">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </div>
      )}

      {onDelete && (
        <div onClick={onDelete} className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-admin-selbar-hover transition-colors" title="Delete selected">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-[18px] h-[18px]">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </div>
      )}

      {onArchive && (
        <div onClick={onArchive} className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-admin-selbar-hover transition-colors" title="Archive selected">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-[18px] h-[18px]">
            <rect x="3" y="4" width="18" height="4" />
            <path d="M5 8v12h14V8" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
        </div>
      )}

      <div className="relative">
        <div
          onClick={() => setShowMore((s) => !s)}
          className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-admin-selbar-hover transition-colors"
          title="More actions"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-[18px] h-[18px]">
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
          </svg>
        </div>
        {showMore && (
          <div className="absolute bottom-full left-0 mb-2 bg-admin-bg border border-admin-border rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden min-w-[160px] z-60">
            {onMessage && (
              <button onClick={() => { onMessage(); setShowMore(false); }} className="w-full text-left px-4 py-2.5 text-[13px] text-admin-text hover:bg-admin-hover flex items-center gap-2">
                💬 Message selected
              </button>
            )}
            {onSuspend && (
              <button onClick={() => { onSuspend(); setShowMore(false); }} className="w-full text-left px-4 py-2.5 text-[13px] text-admin-text hover:bg-admin-hover flex items-center gap-2">
                ⏸ Suspend selected
              </button>
            )}
            {onRestore && (
              <button onClick={() => { onRestore(); setShowMore(false); }} className="w-full text-left px-4 py-2.5 text-[13px] text-admin-text hover:bg-admin-hover flex items-center gap-2">
                ↻ Restore selected
              </button>
            )}
            {onExport && (
              <button onClick={() => { onExport(); setShowMore(false); }} className="w-full text-left px-4 py-2.5 text-[13px] text-admin-text hover:bg-admin-hover flex items-center gap-2">
                ⬇ Export CSV
              </button>
            )}
            {onDelete && (
              <button onClick={() => { onDelete(); setShowMore(false); }} className="w-full text-left px-4 py-2.5 text-[13px] text-admin-non-text hover:bg-admin-non-bg flex items-center gap-2">
                🗑 Delete selected
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
