import Button from '../ui/Button.jsx';
import Spinner from '../ui/Spinner.jsx';

export default function AiAssistPanel({
  onGenerateSummary,
  onSuggestSkills,
  summaryLoading,
  skillsLoading,
  suggestions = [],
  onAddSkill,
}) {
  return (
    <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
      <h3 className="mb-3 text-sm font-semibold text-indigo-300">AI Assistant</h3>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={onGenerateSummary} disabled={summaryLoading}>
          {summaryLoading ? <Spinner /> : null}
          Generate summary
        </Button>
        <Button size="sm" variant="secondary" onClick={onSuggestSkills} disabled={skillsLoading}>
          {skillsLoading ? <Spinner /> : null}
          Suggest skills
        </Button>
      </div>
      {suggestions.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-xs text-slate-400">Click to add:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => onAddSkill(skill)}
                className="rounded-full border border-indigo-500/40 bg-slate-900 px-3 py-1 text-xs text-indigo-300 hover:bg-indigo-500/20"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
