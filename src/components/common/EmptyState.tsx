import React from 'react';
import { Database, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data points found',
  message = 'Try modifying your filter selections, selecting more countries, or broadening your search terms.',
  actionText = 'Reset Filters',
  onAction
}) => {
  return (
    <div className="border border-dashed border-slate-300 rounded-lg p-10 text-center bg-white my-6">
      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center mb-3">
        <Database className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">{message}</p>
      {onAction && (
        <Button variant="outline" size="sm" onClick={onAction} icon={<RotateCcw className="w-3.5 h-3.5" />}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
