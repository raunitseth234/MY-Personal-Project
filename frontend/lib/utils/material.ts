import { MATERIALS, type Material } from '@/lib/api/types';

export { MATERIALS };
export type { Material };

export function isValidMaterial(value: string): value is Material {
  return (MATERIALS as readonly string[]).includes(value);
}

export const MATERIAL_LABELS: Record<Material, string> = {
  gold: 'Gold',
  silver: 'Silver',
  diamond: 'Diamond',
  platinum: 'Platinum',
  imitation: 'Imitation',
  kundan: 'Kundan',
};
