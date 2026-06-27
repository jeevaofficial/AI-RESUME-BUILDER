import Label from './Label.jsx';

export default function Textarea({ label, id, className = '', rows = 4, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-y ${className}`}
        {...props}
      />
    </div>
  );
}
