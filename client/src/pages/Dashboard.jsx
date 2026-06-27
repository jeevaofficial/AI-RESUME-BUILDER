import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const { data } = await api.get('/resumes');
      setResumes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createResume = async () => {
    setCreating(true);
    try {
      const { data } = await api.post('/resumes', { title: 'My Resume' });
      navigate(`/builder/${data._id}`);
    } finally {
      setCreating(false);
    }
  };

  const deleteResume = async (id) => {
    if (!confirm('Delete this resume?')) return;
    await api.delete(`/resumes/${id}`);
    setResumes((r) => r.filter((x) => x._id !== id));
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My resumes</h1>
          <p className="text-slate-400">Create and manage your resumes</p>
        </div>
        <Button onClick={createResume} disabled={creating}>
          {creating ? 'Creating...' : '+ New resume'}
        </Button>
      </div>

      {resumes.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-slate-400">No resumes yet. Create your first one!</p>
          <Button className="mt-4" onClick={createResume} disabled={creating}>
            Create resume
          </Button>
        </Card>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {resumes.map((r) => (
            <li key={r._id}>
              <Card className="flex flex-col h-full">
                <h2 className="font-semibold text-white">{r.title || 'Untitled'}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {r.personalInfo?.fullName || 'No name'} · Updated{' '}
                  {new Date(r.updatedAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={`/builder/${r._id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                  <Link to={`/preview/${r._id}`}>
                    <Button size="sm" variant="secondary">
                      Preview
                    </Button>
                  </Link>
                  <Button size="sm" variant="danger" onClick={() => deleteResume(r._id)}>
                    Delete
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
