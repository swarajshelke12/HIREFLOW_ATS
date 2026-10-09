# SOP: Spline 3D Scene Assets & Performance Guidelines

## 1. 3D Scene Specifications
- **Scene URL:** `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`
- **Runtime:** `@splinetool/runtime` v1.12+
- **React Adapter:** `@splinetool/react-spline` v4.1+

## 2. Rendering Strategy
- Scene is wrapped in React `lazy()` and dynamic `Suspense` boundary inside `components/ui/spline.tsx`.
- Fallback UI shows an unobtrusive pulsing placeholder (`Loading 3D Scene...`) with zero layout shift.
- Scene element uses fixed positioning and z-indexing (`z-0`) behind glassmorphic form cards (`z-10`).
