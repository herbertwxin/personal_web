export interface StackModel {
  id: number
  title: string
  description: string
  difficulty: string
  topics: string[]
  pdfPath: string
  latexFile: string
  lastUpdated: string
}

export const stackModels: StackModel[] = [
  {
    id: 0,
    title: 'Complete Markets',
    description:
      'Comprehensive analysis of complete markets with social planner solutions, competitive equilibrium, and Arrow-Debreu market structures.',
    difficulty: 'Advanced',
    topics: ['Complete Markets', 'Arrow-Debreu', 'General Equilibrium'],
    pdfPath: 'downloadable/stack/Complete_markets.pdf',
    latexFile: 'Complete_markets.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 1,
    title: 'Differential Equations in Economics',
    description:
      'Mathematical foundations of differential equations applied to economic modeling and dynamic systems.',
    difficulty: 'Intermediate',
    topics: ['Differential Equations', 'Dynamic Systems', 'Mathematical Methods'],
    pdfPath: 'downloadable/stack/Differential.pdf',
    latexFile: 'Differential.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 2,
    title: 'Endogenous Growth Theory',
    description:
      'Advanced treatment of endogenous growth models with human capital, R&D, and technological progress.',
    difficulty: 'Advanced',
    topics: ['Endogenous Growth', 'Human Capital', 'Innovation'],
    pdfPath: 'downloadable/stack/End_Growth.pdf',
    latexFile: 'End_Growth.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 3,
    title: 'Monetary Economics',
    description:
      'Theoretical foundations of monetary economics including money demand, inflation, and monetary policy transmission.',
    difficulty: 'Intermediate',
    topics: ['Monetary Theory', 'Inflation', 'Central Banking'],
    pdfPath: 'downloadable/stack/Monetary.pdf',
    latexFile: 'Monetary.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 4,
    title: 'Neoclassical Growth Model',
    description:
      'Classical treatment of the Solow-Swan growth model with extensions and empirical applications.',
    difficulty: 'Beginner',
    topics: ['Solow Model', 'Growth Theory', 'Capital Accumulation'],
    pdfPath: 'downloadable/stack/Neo_classical.pdf',
    latexFile: 'Neo_classical.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 5,
    title: 'New Keynesian Model',
    description:
      'Modern New Keynesian framework with price rigidities, monopolistic competition, and monetary policy analysis.',
    difficulty: 'Advanced',
    topics: ['New Keynesian', 'Price Rigidity', 'Monetary Policy'],
    pdfPath: 'downloadable/stack/NK.pdf',
    latexFile: 'NK.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 6,
    title: 'Overlapping Generations Model',
    description:
      'Dynamic general equilibrium model with overlapping generations, lifecycle behavior, and intergenerational transfers.',
    difficulty: 'Advanced',
    topics: ['OLG Model', 'Lifecycle', 'Intergenerational'],
    pdfPath: 'downloadable/stack/OLG.pdf',
    latexFile: 'OLG.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 7,
    title: 'Ramsey Growth Model',
    description:
      'Optimal growth theory with intertemporal choice, dynamic optimization, and welfare analysis.',
    difficulty: 'Intermediate',
    topics: ['Ramsey Model', 'Optimal Growth', 'Dynamic Optimization'],
    pdfPath: 'downloadable/stack/Ramsey.pdf',
    latexFile: 'Ramsey.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 8,
    title: 'Real Business Cycle Model',
    description:
      'Classical RBC framework with technology shocks, calibration methods, and business cycle analysis.',
    difficulty: 'Intermediate',
    topics: ['RBC Model', 'Technology Shocks', 'Business Cycles'],
    pdfPath: 'downloadable/stack/RBC.pdf',
    latexFile: 'RBC.tex',
    lastUpdated: 'Dec 2024',
  },
  {
    id: 9,
    title: 'Solow Growth Model',
    description:
      'Fundamental growth model covering Kaldor facts, steady state analysis, and transitional dynamics.',
    difficulty: 'Beginner',
    topics: ['Solow Model', 'Growth Theory', 'Steady State'],
    pdfPath: 'downloadable/stack/Solow.pdf',
    latexFile: 'Solow.tex',
    lastUpdated: 'Dec 2024',
  },
]
