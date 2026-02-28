import type { Complexity } from '../types';

const COMPLEXITY_CONFIG: Record<Complexity, { label: string; dot: string; color: string }> = {
  beginner: { label: 'Débutant', dot: '🟢', color: 'text-green-400' },
  intermediate: { label: 'Intermédiaire', dot: '🟡', color: 'text-yellow-400' },
  advanced: { label: 'Avancé', dot: '🔴', color: 'text-red-400' },
};

interface ComplexityBadgeProps {
  complexity: Complexity;
  showLabel?: boolean;
}

export function ComplexityBadge({ complexity, showLabel = true }: ComplexityBadgeProps) {
  const config = COMPLEXITY_CONFIG[complexity];
  return (
    <span className={`text-xs font-medium ${config.color} flex items-center gap-1`}>
      <span>{config.dot}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
