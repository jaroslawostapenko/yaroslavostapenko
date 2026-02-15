// Data Models for the Generated Pages

export enum SectionType {
  HERO = 'hero',
  TEXT_BLOCK = 'text_block',
  DATA_TABLE = 'data_table',
  CHART = 'chart',
  GALLERY = 'gallery',
  KEY_STATS = 'key_stats',
  LINKS = 'links',
  TIMELINE = 'timeline',
  FAQ = 'faq'
}

export interface BaseSection {
  id: string;
  type: SectionType;
  title?: string;
}

export interface HeroSection extends BaseSection {
  type: SectionType.HERO;
  headline: string;
  subheadline: string;
  backgroundImageQuery: string; 
}

export interface TextBlockSection extends BaseSection {
  type: SectionType.TEXT_BLOCK;
  content: string; 
}

export interface DataTableSection extends BaseSection {
  type: SectionType.DATA_TABLE;
  headers: string[];
  rows: string[][];
  source?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ChartSection extends BaseSection {
  type: SectionType.CHART;
  chartType: 'bar' | 'line' | 'pie';
  data: ChartDataPoint[];
  xAxisLabel: string;
  yAxisLabel: string;
  description?: string;
}

export interface GalleryImage {
  alt: string;
  caption: string;
  query: string;
}

export interface GallerySection extends BaseSection {
  type: SectionType.GALLERY;
  images: GalleryImage[];
}

export interface StatItem {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface KeyStatsSection extends BaseSection {
  type: SectionType.KEY_STATS;
  stats: StatItem[];
}

export interface LinkItem {
  title: string;
  url: string;
  description: string;
}

export interface LinksSection extends BaseSection {
  type: SectionType.LINKS;
  links: LinkItem[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface TimelineSection extends BaseSection {
  type: SectionType.TIMELINE;
  events: TimelineEvent[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection extends BaseSection {
  type: SectionType.FAQ;
  items: FAQItem[];
}

export type PageSection = 
  | HeroSection 
  | TextBlockSection 
  | DataTableSection 
  | ChartSection 
  | GallerySection 
  | KeyStatsSection
  | LinksSection
  | TimelineSection
  | FAQSection;

export interface GeneratedPage {
  id: string; 
  query: string; 
  title: string;
  description: string;
  createdAt: number;
  lastUpdated: number;
  sections: PageSection[];
  relatedTopics: string[];
}

// Browser State Types
export interface HistoryItem {
  query: string;
  timestamp: number;
  id: string;
}

export interface Bookmark {
  id: string;
  query: string; // The query acts as the URL
  title: string;
  createdAt: number;
}

export interface Tab {
  id: string;
  query: string; // Empty string = New Tab / Home
  title: string;
  isLoading: boolean;
  loadingStatus?: string;
  error?: string | null;
  lastActive: number;
}

export interface BrowserState {
  tabs: Tab[];
  activeTabId: string;
  history: HistoryItem[];
  bookmarks: Bookmark[];
}