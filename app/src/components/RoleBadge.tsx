import type { RoleId } from '../types';

const ROLE_CONFIG: Record<RoleId, { label: string; color: string }> = {
  'dpt-melee': { label: 'DPT Mêlée', color: 'bg-red-900/60 text-red-300 border-red-700/50' },
  'dpt-distance': { label: 'DPT Distance', color: 'bg-orange-900/60 text-orange-300 border-orange-700/50' },
  'dpt-hybrid': { label: 'DPT Hybride', color: 'bg-yellow-900/60 text-yellow-300 border-yellow-700/50' },
  tank: { label: 'Tank', color: 'bg-blue-900/60 text-blue-300 border-blue-700/50' },
  healer: { label: 'Healer', color: 'bg-green-900/60 text-green-300 border-green-700/50' },
  support: { label: 'Support', color: 'bg-purple-900/60 text-purple-300 border-purple-700/50' },
  placeur: { label: 'Placeur', color: 'bg-cyan-900/60 text-cyan-300 border-cyan-700/50' },
  controle: { label: 'Contrôle', color: 'bg-indigo-900/60 text-indigo-300 border-indigo-700/50' },
};

interface RoleBadgeProps {
  role: RoleId;
  small?: boolean;
}

export function RoleBadge({ role, small }: RoleBadgeProps) {
  const config = ROLE_CONFIG[role];
  return (
    <span
      className={`inline-flex items-center border rounded font-medium ${config.color} ${
        small ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      }`}
    >
      {config.label}
    </span>
  );
}

export { ROLE_CONFIG };
