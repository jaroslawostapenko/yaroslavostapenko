import { GeneratedPage, HistoryItem, Bookmark, Tab } from '../types';
import { STORAGE_KEYS } from '../constants';
import { normalizeQuery } from '../lib/utils';

// Helper to safely parse JSON
const safeParse = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Storage parse error for ${key}`, e);
    return fallback;
  }
};

const safeSave = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Storage save error for ${key}`, e);
  }
};

export const storageService = {
  // Pages
  getPage: (query: string): GeneratedPage | null => {
    const id = normalizeQuery(query);
    const pages = safeParse<Record<string, GeneratedPage>>(STORAGE_KEYS.PAGES, {});
    return pages[id] || null;
  },

  savePage: (page: GeneratedPage) => {
    const pages = safeParse<Record<string, GeneratedPage>>(STORAGE_KEYS.PAGES, {});
    pages[page.id] = page;
    safeSave(STORAGE_KEYS.PAGES, pages);
  },

  getAllPages: (): GeneratedPage[] => {
    const pages = safeParse<Record<string, GeneratedPage>>(STORAGE_KEYS.PAGES, {});
    return Object.values(pages).sort((a, b) => b.createdAt - a.createdAt);
  },

  // History
  addToHistory: (query: string) => {
    let history = safeParse<HistoryItem[]>(STORAGE_KEYS.HISTORY, []);
    const newItem: HistoryItem = {
      query,
      timestamp: Date.now(),
      id: normalizeQuery(query)
    };
    
    // Remove duplicate if exists, add to top
    history = history.filter(h => h.id !== newItem.id);
    history.unshift(newItem);
    if (history.length > 100) history = history.slice(0, 100);
    
    safeSave(STORAGE_KEYS.HISTORY, history);
  },

  getHistory: (): HistoryItem[] => {
    return safeParse<HistoryItem[]>(STORAGE_KEYS.HISTORY, []);
  },

  clearHistory: () => {
    safeSave(STORAGE_KEYS.HISTORY, []);
  },

  // Bookmarks
  addBookmark: (query: string, title: string) => {
    let bookmarks = safeParse<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
    const newBookmark: Bookmark = {
      id: normalizeQuery(query),
      query,
      title,
      createdAt: Date.now()
    };
    
    // Prevent duplicates
    if (!bookmarks.some(b => b.id === newBookmark.id)) {
      bookmarks.push(newBookmark);
      safeSave(STORAGE_KEYS.BOOKMARKS, bookmarks);
    }
  },

  removeBookmark: (query: string) => {
    let bookmarks = safeParse<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
    bookmarks = bookmarks.filter(b => b.id !== normalizeQuery(query));
    safeSave(STORAGE_KEYS.BOOKMARKS, bookmarks);
  },

  getBookmarks: (): Bookmark[] => {
    return safeParse<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
  },

  isBookmarked: (query: string): boolean => {
    const bookmarks = safeParse<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
    return bookmarks.some(b => b.id === normalizeQuery(query));
  }
};