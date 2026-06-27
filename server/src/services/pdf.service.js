import puppeteer from 'puppeteer';

const escapeHtml = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const resolveTemplate = (resume) => {
  if (resume.atsOptimized) return 'minimal';
  if (['aura', 'executive', 'nova', 'minimal'].includes(resume.template)) return resume.template;
  return 'nova';
};

export const buildResumeHtml = (resume) => {
  const { personalInfo, summary, experience, education, skills } = resume;
  const contact = [personalInfo.email, personalInfo.phone, personalInfo.location]
    .filter(Boolean)
    .map(escapeHtml)
    .join(' · ');

  const expHtml = (experience || [])
    .map(
      (e) => `
      <div class="item">
        <div class="item-header">
          <strong>${escapeHtml(e.role)}</strong>
          <span>${escapeHtml(e.startDate)} – ${e.current ? 'Present' : escapeHtml(e.endDate)}</span>
        </div>
        <div class="company">${escapeHtml(e.company)}</div>
        <p>${escapeHtml(e.description)}</p>
      </div>`
    )
    .join('');

  const eduHtml = (education || [])
    .map(
      (e) => `
      <div class="item">
        <strong>${escapeHtml(e.degree)}${e.field ? `, ${escapeHtml(e.field)}` : ''}</strong>
        <div class="company">${escapeHtml(e.school)} · ${escapeHtml(e.startDate)} – ${escapeHtml(e.endDate)}</div>
      </div>`
    )
    .join('');

  const skillsHtml = (skills || []).map((s) => `<span class="skill">${escapeHtml(s)}</span>`).join('');

  const template = resolveTemplate(resume);

  const themeByTemplate = {
    aura: { accent: '#a21caf', chipBg: '#fae8ff', chipText: '#86198f', body: '#0f172a' },
    executive: { accent: '#334155', chipBg: '#f1f5f9', chipText: '#0f172a', body: '#0f172a' },
    nova: { accent: '#0e7490', chipBg: '#ecfeff', chipText: '#155e75', body: '#0f172a' },
    minimal: { accent: '#3f3f46', chipBg: '#f4f4f5', chipText: '#18181b', body: '#18181b' },
  };
  const theme = themeByTemplate[template];
  const plainSkills = template === 'minimal';
  const headshotBlock =
    template === 'executive'
      ? `<div class="side-note">
          <h3>Executive Profile</h3>
          <p>Results-focused candidate with strong strategic execution, measurable outcomes, and cross-functional collaboration.</p>
        </div>`
      : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; color: ${theme.body}; padding: 34px; font-size: 11pt; line-height: 1.5; }
    h1 { font-size: 24pt; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.02em; }
    .subtitle { color: #475569; font-size: 12pt; margin-bottom: 8px; }
    .contact { color: #64748b; font-size: 10pt; margin-bottom: 20px; }
    h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: 0.12em; color: ${theme.accent}; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin: 18px 0 10px; }
    .summary { color: #334155; }
    .item { margin-bottom: 12px; }
    .item-header { display: flex; justify-content: space-between; }
    .company { color: #64748b; font-size: 10pt; margin-bottom: 4px; }
    .skills { display: flex; flex-wrap: wrap; gap: 6px; }
    .skill { background: ${theme.chipBg}; color: ${theme.chipText}; padding: 4px 10px; border-radius: 4px; font-size: 9pt; }
    .header { border-top: 6px solid ${theme.accent}; padding-top: 14px; }
    .layout { display: ${template === 'executive' ? 'grid' : 'block'}; grid-template-columns: 2.2fr 1fr; gap: 18px; }
    .side-note { border-left: 1px solid #e2e8f0; padding-left: 14px; margin-top: 18px; }
    .side-note h3 { font-size: 10pt; text-transform: uppercase; letter-spacing: 0.1em; color: ${theme.accent}; margin-bottom: 8px; }
    .side-note p { color: #475569; font-size: 9.5pt; }
    .skills-line { color: #334155; font-size: 10pt; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(personalInfo.fullName) || 'Your Name'}</h1>
    <div class="subtitle">${escapeHtml(personalInfo.jobTitle)}</div>
    <div class="contact">${contact}</div>
  </div>
  <div class="layout">
    <div>
      ${summary ? `<h2>Professional Summary</h2><p class="summary">${escapeHtml(summary)}</p>` : ''}
      ${expHtml ? `<h2>Experience</h2>${expHtml}` : ''}
      ${eduHtml ? `<h2>Education</h2>${eduHtml}` : ''}
      ${
        skillsHtml
          ? plainSkills
            ? `<h2>Core Skills</h2><p class="skills-line">${(skills || []).map(escapeHtml).join(' • ')}</p>`
            : `<h2>Core Skills</h2><div class="skills">${skillsHtml}</div>`
          : ''
      }
    </div>
    ${headshotBlock}
  </div>
</body>
</html>`;
};

export const generatePdfBuffer = async (resume) => {
  const html = buildResumeHtml(resume);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    });
    return pdf;
  } finally {
    await browser.close();
  }
};
