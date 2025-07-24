export interface KnowledgeBaseCategory {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  order: number;
  lang: 'tr' | 'en' | 'de' | 'fr' | 'it';
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeBaseArticle {
  id?: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  author: string;
  lang: 'tr' | 'en' | 'de' | 'fr' | 'it';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  isPublished: boolean;
} 