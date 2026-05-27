import { create } from 'zustand';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  count?: number;
}

export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
  required: boolean;
}

export interface UIComponent {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    color?: string;
    icon?: string;
  };
  tags: string[];
  tier: 'free' | 'pro';
  previewCode: string;
  componentCode: string;
  installCode: string;
  usageCode: string;
  dependencies: string[];
  props: ComponentProp[];
  thumbnailUrl: string;
  isPublished: boolean;
  viewCount: number;
  copyCount: number;
  isLocked?: boolean;
}

interface ComponentState {
  components: UIComponent[];
  categories: Category[];
  currentComponent: UIComponent | null;
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
  total: number;
  fetchComponents: (params?: { page?: number; search?: string; category?: string; tier?: string }) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchComponentDetail: (slug: string) => Promise<void>;
  incrementView: (slug: string) => Promise<void>;
  incrementCopy: (slug: string) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || '';

export const useComponentStore = create<ComponentState>((set) => ({
  components: [],
  categories: [],
  currentComponent: null,
  loading: false,
  error: null,
  page: 1,
  pages: 1,
  total: 0,

  fetchComponents: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const { page = 1, search = '', category = '', tier = 'all' } = params;
      const url = new URL(`${API_URL}/api/components`, window.location.origin);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('search', search);
      if (category) url.searchParams.append('category', category);
      url.searchParams.append('tier', tier);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (res.ok) {
        set({
          components: data.components,
          page: data.page,
          pages: data.pages,
          total: data.total,
        });
      } else {
        set({ error: data.message || 'Error fetching components' });
      }
    } catch (err) {
      set({ error: 'Server connectivity failed' });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      if (res.ok) {
        const data = await res.json();
        set({ categories: data });
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  },

  fetchComponentDetail: async (slug) => {
    set({ loading: true, error: null, currentComponent: null });
    try {
      const res = await fetch(`${API_URL}/api/components/${slug}`);
      const data = await res.json();
      if (res.ok) {
        set({ currentComponent: data });
      } else {
        set({ error: data.message || 'Component not found' });
      }
    } catch (err) {
      set({ error: 'Server connectivity failed' });
    } finally {
      set({ loading: false });
    }
  },

  incrementView: async (slug) => {
    try {
      await fetch(`${API_URL}/api/components/${slug}/view`, { method: 'POST' });
    } catch (e) {
      console.error('Error logging view:', e);
    }
  },

  incrementCopy: async (slug) => {
    try {
      await fetch(`${API_URL}/api/components/${slug}/copy`, { method: 'POST' });
    } catch (e) {
      console.error('Error logging copy:', e);
    }
  },
}));
