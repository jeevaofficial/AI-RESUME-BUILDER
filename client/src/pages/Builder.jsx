import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios.js';
import ResumeForm from '../components/resume/ResumeForm.jsx';
import ResumePreview from '../components/preview/ResumePreview.jsx';
import Button from '../components/ui/Button.jsx';
import Spinner from '../components/ui/Spinner.jsx';

export default function Builder() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillSuggestions, setSkillSuggestions] = useState([]);

  useEffect(() => {
    api.get(`/resumes/${id}`).then(({ data }) => {
      setResume(data);
      setLoading(false);
    });
  }, [id]);

  const save = useCallback(async () => {
    if (!resume) return;
    setSaving(true);
    setSaved(false);
    try {
      const { data } = await api.put(`/resumes/${id}`, resume);
      setResume(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }, [id, resume]);

  useEffect(() => {
    if (!resume || loading) return;
    const t = setTimeout(save, 1500);
    return () => clearTimeout(t);
  }, [resume, loading, save]);

  const generateSummary = async () => {
    setSummaryLoading(true);
    try {
      const { data } = await api.post('/ai/summary', {
        resumeId: id,
        jobTitle: resume.personalInfo?.jobTitle,
        experience: resume.experience,
        skills: resume.skills,
      });
      setResume((r) => ({ ...r, summary: data.summary }));
    } finally {
      setSummaryLoading(false);
    }
  };

  const suggestSkills = async () => {
    setSkillsLoading(true);
    try {
      const { data } = await api.post('/ai/skills', {
        resumeId: id,
        jobTitle: resume.personalInfo?.jobTitle,
        experience: resume.experience,
        currentSkills: resume.skills,
      });
      const existing = new Set(resume.skills || []);
      setSkillSuggestions(data.skills.filter((s) => !existing.has(s)));
    } finally {
      setSkillsLoading(false);
    }
  };

  const addSkill = (skill) => {
    setResume((r) => ({
      ...r,
      skills: [...(r.skills || []), skill],
    }));
    setSkillSuggestions((s) => s.filter((x) => x !== skill));
  };

  if (loading || !resume) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/dashboard" className="text-sm text-indigo-400 hover:text-indigo-300">
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-white">Resume builder</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-emerald-400">Saved</span>}
          {saving && <span className="text-sm text-slate-500">Saving...</span>}
          <Button variant="secondary" onClick={save} disabled={saving}>
            Save now
          </Button>
          <Link to={`/preview/${id}`}>
            <Button>Preview & PDF</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-6">
          <ResumeForm
            resume={resume}
            onChange={setResume}
            onGenerateSummary={generateSummary}
            onSuggestSkills={suggestSkills}
            summaryLoading={summaryLoading}
            skillsLoading={skillsLoading}
            skillSuggestions={skillSuggestions}
            onAddSkill={addSkill}
          />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-300">Real-time premium preview</p>
            <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-2.5 py-1 text-xs font-medium text-indigo-200">
              {resume.atsOptimized ? 'ATS mode' : `${resume.template || 'nova'} template`}
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950/40 shadow-2xl ring-1 ring-white/5">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
