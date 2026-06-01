// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Course module display type
export interface ModuleDisplay {
  name: string;
  description: string;
}

// Search result type
export interface SearchResult {
  url: string;
  meta: {
    title?: string;
  };
  excerpt?: string;
  sub_results?: Array<{
    title: string;
    url: string;
    excerpt?: string;
  }>;
}
