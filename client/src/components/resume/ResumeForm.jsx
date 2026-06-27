import PersonalInfoSection from './PersonalInfoSection.jsx';
import ExperienceSection from './ExperienceSection.jsx';
import EducationSection from './EducationSection.jsx';
import SkillsSection from './SkillsSection.jsx';
import SummarySection from './SummarySection.jsx';
import AiAssistPanel from './AiAssistPanel.jsx';
import TemplatePicker from './TemplatePicker.jsx';
import Input from '../ui/Input.jsx';

export default function ResumeForm({
  resume,
  onChange,
  onGenerateSummary,
  onSuggestSkills,
  summaryLoading,
  skillsLoading,
  skillSuggestions,
  onAddSkill,
}) {
  const update = (field, value) => onChange({ ...resume, [field]: value });

  return (
    <div className="space-y-8">
      <TemplatePicker value={resume.template} onChange={(template) => update('template', template)} />

      <section className="rounded-xl border border-slate-700 bg-slate-900/40 p-4">
        <label className="flex items-start gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={Boolean(resume.atsOptimized)}
            onChange={(e) => update('atsOptimized', e.target.checked)}
            className="mt-0.5 rounded border-slate-600"
          />
          <span>
            <span className="font-medium text-slate-100">ATS optimization mode</span>
            <span className="mt-1 block text-slate-400">
              Keeps section labels scanner-friendly, improves keyword readability, and reduces visual noise.
            </span>
          </span>
        </label>
      </section>

      <Input
        label="Resume title"
        value={resume.title || ''}
        onChange={(e) => update('title', e.target.value)}
      />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Personal info</h2>
        <PersonalInfoSection
          personalInfo={resume.personalInfo || {}}
          onChange={(personalInfo) => update('personalInfo', personalInfo)}
        />
      </section>

      <AiAssistPanel
        onGenerateSummary={onGenerateSummary}
        onSuggestSkills={onSuggestSkills}
        summaryLoading={summaryLoading}
        skillsLoading={skillsLoading}
        suggestions={skillSuggestions}
        onAddSkill={onAddSkill}
      />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Summary</h2>
        <SummarySection summary={resume.summary} onChange={(summary) => update('summary', summary)} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Experience</h2>
        <ExperienceSection
          experience={resume.experience}
          onChange={(experience) => update('experience', experience)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Education</h2>
        <EducationSection
          education={resume.education}
          onChange={(education) => update('education', education)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Skills</h2>
        <SkillsSection skills={resume.skills} onChange={(skills) => update('skills', skills)} />
      </section>
    </div>
  );
}
