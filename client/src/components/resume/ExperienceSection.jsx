import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Textarea from '../ui/Textarea.jsx';

const emptyExp = () => ({
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
});

export default function ExperienceSection({ experience, onChange }) {
  const list = experience?.length ? experience : [emptyExp()];

  const updateItem = (index, field, value) => {
    const next = list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const add = () => onChange([...list, emptyExp()]);
  const remove = (index) => onChange(list.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      {list.map((exp, index) => (
        <div key={index} className="rounded-xl border border-slate-800 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-400">Role {index + 1}</span>
            {list.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Company" value={exp.company} onChange={(e) => updateItem(index, 'company', e.target.value)} />
            <Input label="Role" value={exp.role} onChange={(e) => updateItem(index, 'role', e.target.value)} />
            <Input label="Start" placeholder="Jan 2020" value={exp.startDate} onChange={(e) => updateItem(index, 'startDate', e.target.value)} />
            <Input
              label="End"
              placeholder="Present"
              value={exp.endDate}
              disabled={exp.current}
              onChange={(e) => updateItem(index, 'endDate', e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => updateItem(index, 'current', e.target.checked)}
              className="rounded border-slate-600"
            />
            Currently working here
          </label>
          <Textarea
            label="Description"
            value={exp.description}
            onChange={(e) => updateItem(index, 'description', e.target.value)}
            placeholder="Key achievements and responsibilities..."
          />
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add}>
        + Add experience
      </Button>
    </div>
  );
}
