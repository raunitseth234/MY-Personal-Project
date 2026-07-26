import type { Category } from '@/lib/api/types';
import { listCategories } from '@/lib/catalog';

// Served from the local static catalog (see lib/catalog). Kept async so the
// useCategoriesQuery hook is unchanged.
export const categoriesApi = {
  list: () => Promise.resolve<Category[]>(listCategories()),
};
