export const TEMPLATE_STYLES = {
  aura: {
    id: 'aura',
    name: 'Aura',
    tagline: 'Creative, modern, visual hierarchy',
    palette: 'from-fuchsia-500 to-indigo-600',
    atsFriendly: false,
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    tagline: 'Premium corporate with timeless typography',
    palette: 'from-slate-700 to-slate-900',
    atsFriendly: true,
  },
  nova: {
    id: 'nova',
    name: 'Nova',
    tagline: 'SaaS-inspired clean split layout',
    palette: 'from-cyan-500 to-blue-600',
    atsFriendly: true,
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal ATS',
    tagline: 'Scanner-safe, plain, keyword focused',
    palette: 'from-zinc-600 to-zinc-800',
    atsFriendly: true,
  },
};

export const DEFAULT_TEMPLATE = 'nova';

export const normalizeTemplate = (template) =>
  TEMPLATE_STYLES[template] ? template : DEFAULT_TEMPLATE;
