export interface Publication {
  title: string
  authors: string
  journal: string
  year: string
  volume: string
  pages: string
  type: string
  status: string
  abstract: string
  keywords: string[]
  citations: number
  doi: string
}

export const publications: Publication[] = [
  {
    title: 'The sacrifice ratio and active fiscal policy',
    authors: 'Christopher G. Gibbs and Herbert W. Xin',
    journal: 'Economics Letters',
    year: '2024',
    volume: 'Vol. 245',
    pages: '112038',
    type: 'Journal Article',
    status: 'Published',
    abstract:
      'We compare sacrifice ratios for disinflations under an active monetary and passive fiscal policy mix to those obtained under passive monetary and active fiscal policy, holding all else equal. The sacrifice ratio may be higher or lower in the active fiscal policy regime depending on the fiscal rule and the design of the disinflation policy. Fiscal-led disinflations may be less costly than monetary-led ones when they are anticipated. However, they may generate larger sacrifice ratios than monetary-led ones when implemented "cold turkey". Overall, the variance in possible sacrifice ratios under fiscal-led policies is much higher than under monetary-led policies.',
    keywords: ['Sacrifice ratio', 'Monetary policy', 'Fiscal policy', 'Inflation', 'Disinflation'],
    citations: 0,
    doi: '10.1016/j.econlet.2024.112038',
  },
]
