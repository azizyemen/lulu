// Reusable skeleton block with a soft shimmer. `className` controls size/shape.
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className}`} aria-hidden />;
}
