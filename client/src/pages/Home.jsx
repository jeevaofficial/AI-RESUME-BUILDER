import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';

export default function Home() {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-300">
          AI-powered · Professional · Free to start
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Build a resume that gets interviews
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
          Create polished resumes with AI-generated summaries, smart skill suggestions, live
          preview, and one-click PDF download.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <Button size="lg">Start building free</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
        <ul className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          {[
            ['AI Summary', 'Professional summaries tailored to your role'],
            ['Skill Suggestions', 'Relevant skills based on your experience'],
            ['PDF Export', 'Download a print-ready resume instantly'],
          ].map(([title, desc]) => (
            <li
              key={title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
