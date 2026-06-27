import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios.js';
import ResumePreview from '../components/preview/ResumePreview.jsx';
import Button from '../components/ui/Button.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { downloadBlob } from '../utils/downloadBlob.js';

export default function PreviewPage() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    api.get(`/resumes/${id}`).then(({ data }) => {
      setResume(data);
      setLoading(false);
    });
  }, [id]);

  const downloadPdf = async () => {
    setPdfLoading(true);
    try {
      const { data } = await api.get(`/resumes/${id}/pdf`, { responseType: 'blob' });
      const name = `${resume.personalInfo?.fullName || 'resume'}.pdf`.replace(/\s+/g, '_');
      downloadBlob(data, name);
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading || !resume) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to={`/builder/${id}`} className="text-sm text-indigo-400 hover:text-indigo-300">
            ← Back to editor
          </Link>
          <p className="mt-2 text-xs text-slate-400">
            Template: <span className="font-medium text-slate-300">{resume.template || 'nova'}</span>
            {resume.atsOptimized ? ' · ATS optimized' : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => window.print()}>
            Print
          </Button>
          <Button onClick={downloadPdf} disabled={pdfLoading}>
            {pdfLoading ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>
      <ResumePreview resume={resume} />
    </div>
  );
}
