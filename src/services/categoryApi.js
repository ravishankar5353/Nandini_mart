import { CATEGORIES } from '../data/categories';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryApi = {
  async getAllCategories() {
    await delay(250);
    return [...CATEGORIES];
  },

  async getCategoryBySlug(slug) {
    await delay(200);
    const category = CATEGORIES.find(c => c.slug === slug || c.id === slug);
    if (!category) throw new Error('Category not found');
    return { ...category };
  }
};
