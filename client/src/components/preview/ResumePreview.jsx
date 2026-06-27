import { DEFAULT_TEMPLATE, normalizeTemplate } from './templateConfig.js';

const SECTION_LABEL = 'mb-2 text-[11px] font-bold uppercase tracking-[0.18em]';

function ResumeSections({ resume, accent = 'text-indigo-600', compact = false, plainSkills = false }) {
  const { summary, experience, education, skills } = resume;

  return (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      {summary && (
        <section>
          <h2 className={`${SECTION_LABEL} ${accent}`}>Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section>
          <h2 className={`${SECTION_LABEL} ${accent}`}>Experience</h2>
          <div className={compact ? 'space-y-3' : 'space-y-4'}>
            {experience.map((exp, i) => (
              <div key={exp._id || i}>
                <div className="flex flex-wrap justify-between gap-2">
                  <strong className="text-slate-900">{exp.role}</strong>
                  <span className="text-sm text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600">{exp.company}</p>
                {exp.description && (
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education?.length > 0 && (
        <section>
          <h2 className={`${SECTION_LABEL} ${accent}`}>Education</h2>
          <div className={compact ? 'space-y-2' : 'space-y-3'}>
            {education.map((edu, i) => (
              <div key={edu._id || i}>
                <strong className="text-slate-900">
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ''}
                </strong>
                <p className="text-sm text-slate-600">
                  {edu.school} · {edu.startDate} – {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills?.length > 0 && (
        <section>
          <h2 className={`${SECTION_LABEL} ${accent}`}>Core Skills</h2>
          {plainSkills ? (
            <p className="text-sm text-slate-700">{skills.join(' • ')}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function Header({ resume, template }) {
  const info = resume.personalInfo || {};
  const contact = [info.email, info.phone, info.location].filter(Boolean);
  const links = [info.linkedin, info.website].filter(Boolean);
  const paletteByTemplate = {
    aura: 'from-fuchsia-600 via-purple-600 to-indigo-600',
    executive: 'from-slate-700 via-slate-800 to-slate-900',
    nova: 'from-cyan-600 via-blue-600 to-indigo-600',
    minimal: 'from-zinc-700 via-zinc-800 to-zinc-900',
  };

  return (
    <header className="relative overflow-hidden border-b border-slate-200 px-8 py-7">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${paletteByTemplate[template]}`} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{info.fullName || 'Your Name'}</h1>
      {info.jobTitle && <p className="mt-1 text-lg font-medium text-slate-600">{info.jobTitle}</p>}
      {contact.length > 0 && <p className="mt-3 text-sm text-slate-600">{contact.join(' · ')}</p>}
      {links.length > 0 && <p className="mt-1 text-sm text-slate-500">{links.join(' · ')}</p>}
    </header>
  );
}

function AuraTemplate({ resume }) {
  return (
    <article className="mx-auto max-w-[210mm] bg-white text-slate-800 shadow-2xl print:shadow-none">
      <Header resume={resume} template="aura" />
      <div className="px-8 py-6">
        <ResumeSections resume={resume} accent="text-fuchsia-700" />
      </div>
    </article>
  );
}

function ExecutiveTemplate({ resume }) {
  return (
    <article className="mx-auto max-w-[210mm] bg-white text-slate-800 shadow-2xl print:shadow-none">
      <Header resume={resume} template="executive" />
      <div className="grid gap-0 md:grid-cols-[2.2fr_1fr]">
        <div className="px-8 py-6">
          <ResumeSections resume={resume} accent="text-slate-700" compact />
        </div>
        <aside className="border-l border-slate-200 bg-slate-50 px-6 py-6">
          <h2 className={`${SECTION_LABEL} text-slate-700`}>Snapshot</h2>
          <p className="text-sm text-slate-600">
            Leadership-driven profile with measurable outcomes, strategic execution, and high-impact delivery.
          </p>
        </aside>
      </div>
    </article>
  );
}

function NovaTemplate({ resume }) {
  return (
    <article className="mx-auto max-w-[210mm] bg-white text-slate-800 shadow-2xl print:shadow-none">
      <Header resume={resume} template="nova" />
      <div className="px-8 py-6">
        <ResumeSections resume={resume} accent="text-cyan-700" />
      </div>
    </article>
  );
}

function MinimalAtsTemplate({ resume }) {
  return (
    <article className="mx-auto max-w-[210mm] bg-white text-slate-900 shadow-2xl print:shadow-none">
      <Header resume={resume} template="minimal" />
      <div className="px-8 py-6">
        <ResumeSections resume={resume} accent="text-zinc-700" compact plainSkills />
      </div>
    </article>
  );
}

export default function ResumePreview({ resume }) {
  if (!resume) return null;
  const template = normalizeTemplate(resume.template || DEFAULT_TEMPLATE);
  const forceAts = Boolean(resume.atsOptimized);

  if (forceAts || template === 'minimal') return <MinimalAtsTemplate resume={resume} />;
  if (template === 'aura') return <AuraTemplate resume={resume} />;
  if (template === 'executive') return <ExecutiveTemplate resume={resume} />;
  return <NovaTemplate resume={resume} />;
}
