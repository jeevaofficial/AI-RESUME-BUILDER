import Input from '../ui/Input.jsx';

export default function PersonalInfoSection({ personalInfo, onChange }) {
  const update = (field, value) => {
    onChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input
        label="Full name"
        value={personalInfo.fullName || ''}
        onChange={(e) => update('fullName', e.target.value)}
      />
      <Input
        label="Job title"
        value={personalInfo.jobTitle || ''}
        onChange={(e) => update('jobTitle', e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        value={personalInfo.email || ''}
        onChange={(e) => update('email', e.target.value)}
      />
      <Input
        label="Phone"
        value={personalInfo.phone || ''}
        onChange={(e) => update('phone', e.target.value)}
      />
      <Input
        label="Location"
        value={personalInfo.location || ''}
        onChange={(e) => update('location', e.target.value)}
      />
      <Input
        label="LinkedIn"
        value={personalInfo.linkedin || ''}
        onChange={(e) => update('linkedin', e.target.value)}
      />
      <Input
        label="Website"
        className="sm:col-span-2"
        value={personalInfo.website || ''}
        onChange={(e) => update('website', e.target.value)}
      />
    </div>
  );
}
