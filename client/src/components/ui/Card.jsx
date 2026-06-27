export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
