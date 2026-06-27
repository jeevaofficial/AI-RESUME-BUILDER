import { useState } from 'react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

export default function SkillsSection({ skills, onChange }) {
  const [input, setInput] = useState('');
  const list = skills || [];

  const add = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed || list.includes(trimmed)) return;
    onChange([...list, trimmed]);
    setInput('');
  };

  const remove = (skill) => onChange(list.filter((s) => s !== skill));

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Add a skill and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add(input);
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={() => add(input)}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {list.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200"
          >
            {skill}
            <button
              type="button"
              onClick={() => remove(skill)}
              className="text-slate-500 hover:text-red-400"
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
