export const APP_NAME = "Intebwio";

export const STORAGE_KEYS = {
  PAGES: 'intebwio_pages_v2',
  HISTORY: 'intebwio_history_v2',
  BOOKMARKS: 'intebwio_bookmarks_v1',
  TABS: 'intebwio_tabs_session_v1'
};

export const getPlaceholderImage = (seed: string, width: number, height: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const id = Math.abs(hash) % 1000;
  return `https://picsum.photos/id/${id}/${width}/${height}`;
};

export const INITIAL_SUGGESTIONS = [
  "Timeline of Space Exploration",
  "How to bake sourdough bread",
  "Comparison of Electric Vehicles 2025",
  "Modern Interior Design Trends",
  "Guide to machine learning algorithms",
  "The history of Jazz music",
  "Top hiking trails in Switzerland",
  "Beginner's Yoga Routine"
];