import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-5 bg-muted rounded mb-2 w-3/4" />
          <div className="h-4 bg-muted rounded mb-2 w-1/2" />
          <div className="flex space-x-2">
            <div className="h-3 bg-muted rounded w-16" />
            <div className="h-3 bg-muted rounded w-20" />
            <div className="h-3 bg-muted rounded w-14" />
          </div>
        </div>
      </div>

      {/* Skills Skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 bg-muted rounded-full w-16" />
        <div className="h-6 bg-muted rounded-full w-20" />
        <div className="h-6 bg-muted rounded-full w-14" />
        <div className="h-6 bg-muted rounded-full w-18" />
      </div>

      {/* Why This For You Skeleton */}
      <div className="mb-4">
        <div className="h-4 bg-muted rounded mb-2 w-32" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="h-3 bg-muted rounded w-4/6" />
        </div>
      </div>

      {/* Match Score Skeleton */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="h-3 bg-muted rounded w-20" />
          <div className="h-3 bg-muted rounded w-8" />
        </div>
        <div className="w-full bg-muted rounded-full h-2" />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex space-x-2">
        <div className="h-9 bg-muted rounded flex-1" />
        <div className="h-9 bg-muted rounded flex-1" />
        <div className="h-9 bg-muted rounded w-12" />
      </div>
    </div>
  );
};

export default SkeletonCard;