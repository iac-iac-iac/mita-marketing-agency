// Типы для блога и кейсов

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readTime: number; // в минутах
}

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readTime?: number;
}

export interface Case {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  client: string;
  industry: string;
  coverImage?: string;
  gallery?: string[];
  stats?: CaseStats[];
  tools?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string;
  testimonial?: CaseTestimonial;
  relatedCases?: string[];
}

export interface CaseStats {
  label: string;
  before?: string;
  after: string;
  improvement?: string;
  icon?: string;
}

export interface CaseTestimonial {
  text: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

export interface CaseFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  client: string;
  industry: string;
  coverImage?: string;
  gallery?: string[];
  stats?: CaseStats[];
  tools?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string;
  testimonial?: CaseTestimonial;
  relatedCases?: string[];
}

export interface ContentMeta {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
}
