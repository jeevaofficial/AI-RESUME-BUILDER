import Textarea from '../ui/Textarea.jsx';

export default function SummarySection({ summary, onChange }) {
  return (
    <Textarea
      label="Professional summary"
      value={summary || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
      placeholder="A brief overview of your experience and strengths..."
    />
  );
}
