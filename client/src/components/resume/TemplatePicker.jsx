import { TEMPLATE_STYLES, normalizeTemplate } from '../preview/templateConfig.js';

export default function TemplatePicker({ value, onChange }) {
  const active = normalizeTemplate(value);

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Premium templates</h2>
          <p className="text-sm text-slate-400">
            Pick a layout that matches your role. ATS-safe options are labeled.
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.values(TEMPLATE_STYLES).map((template) => {
          const selected = template.id === active;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onChange(template.id)}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? 'border-indigo-400 bg-indigo-500/15 shadow-lg shadow-indigo-500/20'
                  : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'
              }`}
            >
              <div className={`mb-3 h-2 rounded-full bg-gradient-to-r ${template.palette}`} />
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-white">{template.name}</h3>
                {template.atsFriendly ? (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    ATS friendly
                  </span>
                ) : (
                  <span className="rounded-full bg-fuchsia-500/15 px-2 py-0.5 text-xs font-medium text-fuchsia-200">
                    Visual premium
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-400">{template.tagline}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
