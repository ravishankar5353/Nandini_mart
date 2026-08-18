import { PRODUCTS } from '../data/products';

const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

export const productApi = {
  async getProducts(params = {}) {
    await delay(300);
    const {
      category = 'all',
      search = '',
      minPrice = 0,
      maxPrice = 5000,
      minRating = 0,
      inStockOnly = false,
      dealsOnly = false,
      sortBy = 'relevance'
    } = params;

    let filtered = [...PRODUCTS];

    // Filter by Category
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category || p.categoryName?.toLowerCase() === category.toLowerCase());
    }

    // Filter by Search Query (Name, Category, Brand, Description, Features)
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features?.some(f => f.toLowerCase().includes(q))
      );
    }

    // Filter by Price Range
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

    // Filter by Rating
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Filter by In-Stock
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock && p.stock > 0);
    }

    // Filter by Deals Only
    if (dealsOnly) {
      filtered = filtered.filter(p => p.isDeal || p.discountPercent >= 20);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
        break;
      case 'relevance':
      default:
        // Keep natural balanced order
        break;
    }

    return filtered;
  },

  async getProductById(id) {
    await delay(250);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error(`Product with ID "${id}" was not found.`);
    return { ...product };
  },

  async getFeaturedDeals() {
    await delay(200);
    return PRODUCTS.filter(p => p.isDeal).slice(0, 8);
  },

  async getBestSellers() {
    await delay(200);
    return PRODUCTS.filter(p => p.isBestSeller).slice(0, 8);
  },

  async getFreshPicks() {
    await delay(200);
    return PRODUCTS.filter(p => p.isFreshPick).slice(0, 8);
  },

  async getRelatedProducts(category, currentId) {
    await delay(200);
    return PRODUCTS
      .filter(p => p.category === category && p.id !== currentId)
      .slice(0, 4);
  }
};
