import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DATASET_DISCLAIMER } from '../../data/provenance';

interface DataNoticeBannerProps {
  compact?: boolean;
}

export const DataNoticeBanner: React.FC<DataNoticeBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50/70 border-b border-amber-200/80 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-5xl">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>{DATASET_DISCLAIMER.shortNotice}</span>
        </div>
        <Link
          to="/methodology"
          className="text-amber-900 hover:text-amber-950 font-medium underline inline-flex items-center gap-1 shrink-0 ml-4"
        >
          Methodology & Provenance
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-xs text-amber-950 shadow-sm">
      <div className="flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-amber-900 flex items-center gap-2">
            Demonstration Dataset Notice
            <span className="bg-amber-200 text-amber-900 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-bold">
              Evaluation Build
            </span>
          </div>
          <p className="text-amber-900/90 leading-relaxed text-xs">
            {DATASET_DISCLAIMER.fullNotice}
          </p>
          <div className="pt-1 flex items-center gap-3">
            <Link
              to="/methodology"
              className="font-medium text-amber-900 hover:text-amber-950 underline inline-flex items-center gap-1"
            >
              Review full data provenance & indicators
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
