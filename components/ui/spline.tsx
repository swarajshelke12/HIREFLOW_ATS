'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Lazy-loaded Spline 3D Scene with Suspense boundary
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div 
          className="w-full h-full flex items-center justify-center text-white/20 text-sm font-medium tracking-wide animate-pulse"
          role="status"
          aria-label="Loading 3D Scene"
        >
          Loading 3D Scene...
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}