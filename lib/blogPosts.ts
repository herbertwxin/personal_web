export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  featured?: boolean
  /** Filename of the self-contained HTML article served from /downloadable/blog/ */
  htmlFile: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 3,
    title:
      "Japan's Persistent Hierarchies: Kazoku Legacy, Gakubatsu, and Hereditary Power",
    excerpt:
      'Why GHQ\'s 1947 abolition of the kazoku peerage failed to dismantle elite reproduction — tracing educational, social, and economic capital through the gakubatsu pipeline and hereditary electoral geography.',
    date: '2026-03-15',
    readTime: '30 min read',
    tags: ['Japan', 'Political Economy', 'Institutions', 'History'],
    featured: true,
    htmlFile: 'japan_persistent_hierarchies.html',
  },
  {
    id: 4,
    title:
      'Japanese Yakuza: Structural Evolution and Regulatory History, 1945–2025',
    excerpt:
      'Eight decades of boryokudan evolution across organizational structure, economic embeddedness, legislation, and police containment — with the 1992 Act and 2011 exclusion ordinances as the two structural breaks.',
    date: '2026-01-18',
    readTime: '25 min read',
    tags: ['Japan', 'Organized Crime', 'Political Economy', 'History'],
    htmlFile: 'yakuza_evolution_1945_2025.html',
  },
  {
    id: 1,
    title: 'Kornai (1979) Framework on Autocratic Governance',
    excerpt:
      'A comment on Kornai (1979) where I found similarities between socialist firms and autocratic local governments.',
    date: '2024-02-05',
    readTime: '6 min read',
    tags: ['Political Economy', 'Governance', 'Theory'],
    htmlFile: 'kornai_autocratic_governance.html',
  },
  {
    id: 2,
    title: 'Fedora Silverblue Setup Guide',
    excerpt:
      'Some steps I would take after installing Fedora Silverblue — Flatpak, Toolbox, layering, Nvidia, MATLAB, Dynare, and LaTeX on an immutable system.',
    date: '2023-12-25',
    readTime: '15 min read',
    tags: ['Linux', 'Guide', 'Fedora'],
    htmlFile: 'fedora_silverblue_setup.html',
  },
]
