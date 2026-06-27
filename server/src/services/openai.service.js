import OpenAI from 'openai';

const getClient = () => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
};

export const generateSummary = async ({ jobTitle, experience, skills }) => {
  const client = getClient();
  const expText = (experience || [])
    .map((e) => `${e.role} at ${e.company}: ${e.description}`)
    .join('\n');

  if (!client) {
    return `Results-driven ${jobTitle || 'professional'} with expertise in ${(skills || []).slice(0, 5).join(', ') || 'relevant technologies'}. Proven track record delivering high-impact solutions across cross-functional teams.`;
  }

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You write concise, professional resume summaries (3-4 sentences). No bullet points. First person not allowed.',
      },
      {
        role: 'user',
        content: `Job title: ${jobTitle}\nExperience:\n${expText}\nSkills: ${(skills || []).join(', ')}`,
      },
    ],
    max_tokens: 200,
  });

  return completion.choices[0]?.message?.content?.trim() || '';
};

export const suggestSkills = async ({ jobTitle, experience, currentSkills }) => {
  const client = getClient();
  const expText = (experience || [])
    .map((e) => `${e.role}: ${e.description}`)
    .join('\n');

  if (!client) {
    const defaults = [
      'JavaScript',
      'React',
      'Node.js',
      'Communication',
      'Problem Solving',
      'Team Collaboration',
      'Git',
      'REST APIs',
    ];
    const filtered = defaults.filter((s) => !(currentSkills || []).includes(s));
    return filtered.slice(0, 8);
  }

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'Return only a JSON array of 8-12 relevant skill strings for a resume. No markdown, no explanation.',
      },
      {
        role: 'user',
        content: `Target role: ${jobTitle}\nExperience:\n${expText}\nAlready has: ${(currentSkills || []).join(', ')}`,
      },
    ],
    max_tokens: 150,
  });

  const raw = completion.choices[0]?.message?.content?.trim() || '[]';
  try {
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return raw.split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
  }
};
