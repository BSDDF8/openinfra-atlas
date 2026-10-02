import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="border border-slate-200 bg-white rounded-lg p-12 text-center max-w-md mx-auto my-12 shadow-sm space-y-4">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
        <FileQuestion className="w-6 h-6 text-slate-400" />
      </div>
      <div>
        <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
          HTTP 404 Error
        </span>
        <h1 className="text-xl font-bold text-slate-900 mt-1">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          The requested infrastructure intelligence route or dataset does not exist or may have been relocated.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/explore"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-xs font-medium hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Open Data Explorer</span>
        </Link>
      </div>
    </div>
  );
};
