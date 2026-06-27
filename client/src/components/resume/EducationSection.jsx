import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

const emptyEdu = () => ({
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
});

export default function EducationSection({ education, onChange }) {
  const list = education?.length ? education : [emptyEdu()];

  const updateItem = (index, field, value) => {
    const next = list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const add = () => onChange([...list, emptyEdu()]);
  const remove = (index) => onChange(list.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      {list.map((edu, index) => (
        <div key={index} className="rounded-xl border border-slate-800 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-400">Education {index + 1}</span>
            {list.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="School" value={edu.school} onChange={(e) => updateItem(index, 'school', e.target.value)} />
            <Input label="Degree" value={edu.degree} onChange={(e) => updateItem(index, 'degree', e.target.value)} />
            <Input label="Field" value={edu.field} onChange={(e) => updateItem(index, 'field', e.target.value)} />
            <Input label="Start" value={edu.startDate} onChange={(e) => updateItem(index, 'startDate', e.target.value)} />
            <Input label="End" value={edu.endDate} onChange={(e) => updateItem(index, 'endDate', e.target.value)} />
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add}>
        + Add education
      </Button>
    </div>
  );
}
