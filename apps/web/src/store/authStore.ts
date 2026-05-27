import { create } from 'zustand';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro';
  apiKey: string;
  subscriptionStatus: 'active' | 'expired' | 'cancelled' | 'none';
  subscriptionExpiry?: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  mockLogin: (email: string, role?: string, plan?: string) => Promise<void>;
  setUser: (user: UserProfile | null) => void;
}

// Global API Helper
const API_URL = import.meta.env.VITE_API_URL || '';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/auth/me`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          set({ user: data.user, isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (err) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
      if (res.ok) {
        set({ user: null, isAuthenticated: false });
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  },

  mockLogin: async (email, role = 'user', plan = 'free') => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/auth/mock-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, plan }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set({ user: data.user, isAuthenticated: true });
      } else {
        set({ error: data.message || 'Login failed' });
      }
    } catch (err) {
      set({ error: 'Server connectivity failed' });
    } finally {
      set({ loading: false });
    }
  },
}));
