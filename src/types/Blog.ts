export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  lang: 'tr' | 'en' | 'de' | 'fr' | 'it';
  featuredImage: string;
  excerpt: string;
  slug: string;
  categories: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
} 