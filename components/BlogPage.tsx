import { Button } from './ui/button'

interface BlogPageProps {
  onReadPost: (blogId: number) => void
}

export function BlogPage({ onReadPost }: BlogPageProps) {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding DSGE Models in Modern Economics',
      excerpt:
        'A deep dive into Dynamic Stochastic General Equilibrium models and their practical applications in policy analysis.',
      date: '2024-02-15',
      readTime: '8 min read',
      tags: ['Macroeconomics', 'DSGE', 'Policy'],
      featured: true,
      content: `Dynamic Stochastic General Equilibrium (DSGE) models have become the workhorse of modern macroeconomic analysis. These models provide a comprehensive framework for understanding how economies respond to various shocks and policy interventions.

## What are DSGE Models?

DSGE models are mathematical representations of the economy that are built on microeconomic foundations. They attempt to explain macroeconomic phenomena by modeling the behavior of individual agents - households, firms, and governments - and then aggregating these behaviors to understand economy-wide outcomes.

### Key Features:

1. **Dynamic**: The models track variables over time
2. **Stochastic**: They incorporate random shocks and uncertainty
3. **General Equilibrium**: All markets clear simultaneously

## Mathematical Foundation

The basic structure of a DSGE model can be represented by the following equations:

**Household Optimization:**
Max E₀ Σ βᵗ U(Cₜ, Lₜ)

**Production Function:**
Yₜ = AₜKₜ^α Lₜ^(1-α)

**Resource Constraint:**
Yₜ = Cₜ + Iₜ + Gₜ

These equations capture the essential trade-offs that economic agents face and how their decisions aggregate to determine macroeconomic outcomes.

## Policy Applications

DSGE models are particularly valuable for policy analysis because they:
- Provide structural interpretation of economic relationships
- Allow for counterfactual policy experiments
- Incorporate expectations in a consistent manner
- Can evaluate welfare implications of different policies

The models have been extensively used by central banks worldwide for monetary policy analysis, helping policymakers understand the transmission mechanisms of their decisions.`,
    },
    {
      id: 2,
      title: 'The Mathematics Behind Stochastic Growth Theory',
      excerpt:
        'Exploring the mathematical foundations that make stochastic growth models so powerful for economic forecasting.',
      date: '2024-01-28',
      readTime: '12 min read',
      tags: ['Mathematics', 'Growth Theory', 'Modeling'],
      content: `Stochastic growth theory represents one of the most elegant applications of mathematical analysis to economic problems. By incorporating random shocks into growth models, we can better understand the sources of economic fluctuations and long-term development patterns.

## The Mathematical Framework

The foundation of stochastic growth theory lies in the Ramsey-Cass-Koopmans model extended with uncertainty:

**Capital Accumulation:**
dKₑ = [f(Kₑ, Aₑ) - δKₑ - Cₑ]dt + σₖKₑdWₑ

**Technology Evolution:**
dAₑ = μAₑdt + σₐAₑdWₑ

Where Wₑ represents Wiener processes capturing technological and investment uncertainties.

## Solving Stochastic Differential Equations

The key challenge in stochastic growth models is solving the Hamilton-Jacobi-Bellman equation:

ρV(K,A) = max{U(C) + Vₖ[f(K,A) - δK - C] + VₐμA + ½Vₖₖσₖ²K² + ½Vₐₐσₐ²A²}

This partial differential equation determines the optimal consumption and investment policies under uncertainty.

## Computational Methods

Modern approaches to solving these models include:
1. **Finite Difference Methods**
2. **Spectral Methods** 
3. **Monte Carlo Simulations**
4. **Perturbation Techniques**

Each method has its advantages depending on the complexity of the model and the desired accuracy of the solution.`,
    },
    {
      id: 3,
      title: 'New Keynesian Framework: A Computational Approach',
      excerpt:
        'How computational methods are revolutionizing our understanding of New Keynesian economic models.',
      date: '2024-01-10',
      readTime: '10 min read',
      tags: ['New Keynesian', 'Computation', 'Monetary Policy'],
      content: `The New Keynesian framework has evolved significantly with advances in computational methods. Modern techniques allow us to solve and estimate these models with unprecedented precision and scope.

## Core New Keynesian Equations

The basic three-equation system consists of:

**Phillips Curve:**
πₑ = βEₑπₑ₊₁ + κxₑ

**Dynamic IS Curve:**
xₑ = Eₑxₑ₊₁ - σ(iₑ - Eₑπₑ₊₁)

**Monetary Policy Rule:**
iₑ = ρᵢiₑ₋₁ + (1-ρᵢ)[φπ πₑ + φₓxₑ]

## Computational Challenges

Solving these models computationally involves several challenges:
- **Non-linearity**: Many NK models are inherently non-linear
- **Expectations**: Forward-looking behavior requires sophisticated solution methods
- **Multiple Equilibria**: Some models have multiple rational expectations equilibria

## Solution Methods

Modern computational approaches include:
1. **Linear Approximation** around steady state
2. **Global Solution Methods** for handling large shocks  
3. **Particle Filters** for estimation
4. **MCMC Bayesian Estimation**

These methods have revolutionized our ability to bring NK models to the data and use them for policy analysis.`,
    },
    {
      id: 4,
      title: 'Teaching Economics Through Interactive Models',
      excerpt:
        'Innovative approaches to making complex economic concepts accessible to undergraduate students.',
      date: '2023-12-22',
      readTime: '6 min read',
      tags: ['Teaching', 'Education', 'Interactive Models'],
      content: `Teaching complex economic models to undergraduate students requires innovative pedagogical approaches. Interactive models and visual demonstrations can transform abstract concepts into intuitive understanding.

## The Challenge

Traditional textbook approaches to macroeconomics often present students with:
- Abstract mathematical formulations
- Static graphs and diagrams  
- Limited connection to real-world phenomena

## Interactive Solutions

Modern technology enables new teaching methods:

### 1. Dynamic Simulations
Students can manipulate parameters and immediately see the effects on economic outcomes.

### 2. Visual Learning
Complex relationships become clearer when students can see variables evolve over time.

### 3. Real-Time Data Integration
Connecting theoretical models with live economic data makes learning more relevant.

## Practical Implementation

Successful interactive teaching involves:
- **Progressive Complexity**: Start simple, add layers gradually
- **Active Learning**: Students learn by doing, not just observing
- **Immediate Feedback**: Real-time responses to parameter changes
- **Collaborative Exploration**: Group activities with shared models

## Results

Students who learn through interactive models show:
- Better retention of complex concepts
- Improved problem-solving abilities
- Greater engagement with economic theory
- Enhanced preparation for advanced coursework`,
    },
    {
      id: 5,
      title: 'The Future of Macroeconomic Modeling',
      excerpt:
        'Emerging trends and technologies that will shape the next generation of economic models.',
      date: '2023-12-08',
      readTime: '9 min read',
      tags: ['Future', 'Technology', 'Modeling'],
      content: `The future of macroeconomic modeling is being shaped by revolutionary advances in technology, data availability, and computational methods. These developments promise to transform how we understand and predict economic phenomena.

## Technological Frontiers

### Artificial Intelligence and Machine Learning
- **Neural Networks** for non-linear relationship discovery
- **Reinforcement Learning** for policy optimization
- **Natural Language Processing** for sentiment analysis in models

### Big Data Integration
- **High-frequency data** from digital transactions
- **Satellite imagery** for real-time economic activity measurement
- **Social media data** for expectations formation modeling

### Quantum Computing
Potential applications include:
- Solving large-scale optimization problems
- Handling complex interdependencies
- Massive parallel processing of scenarios

## Methodological Advances

### Agent-Based Modeling
Moving beyond representative agents to model heterogeneous populations with:
- Individual learning and adaptation
- Network effects and social interactions
- Emergent macroeconomic phenomena

### Real-Time Estimation
- Continuous model updating with streaming data
- Adaptive learning algorithms
- Dynamic model selection

## Challenges Ahead

The future also brings challenges:
- **Data privacy** concerns
- **Model interpretability** vs. predictive power trade-offs
- **Computational complexity** management
- **Integration** of traditional theory with new methods

## Implications for Policy

These advances will enable:
- More accurate forecasting
- Better understanding of economic heterogeneity  
- Real-time policy impact assessment
- Improved crisis prediction and management`,
    },
  ]

  // Sort posts chronologically (most recent first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1 
            className='text-black mb-4'
            style={{
              fontSize: 'var(--academic-font-size-page-title)',
              fontWeight: 'var(--academic-font-weight-page-title)',
              lineHeight: 'var(--academic-line-height-tight)'
            }}
          >
            Academic Blog
          </h1>
          <p 
            className='text-black max-w-3xl'
            style={{
              fontSize: 'var(--academic-font-size-body)',
              fontWeight: 'var(--academic-font-weight-body)',
              lineHeight: 'var(--academic-line-height-normal)',
              marginBottom: 'var(--academic-spacing-xl)'
            }}
          >
            Insights, thoughts, and discussions on mathematical macroeconomics,
            economic modeling, and academic research methodologies.
          </p>
        </div>

        {/* Academic Article List */}
        <div className='space-y-8'>
          {sortedPosts.map((post, index) => (
            <article 
              key={post.id}
              className='cursor-pointer group'
              onClick={() => onReadPost(post.id)}
              style={{
                paddingLeft: 'var(--academic-hanging-indent)',
                textIndent: 'calc(-1 * var(--academic-hanging-indent))',
                marginBottom: 'var(--academic-list-item-spacing)'
              }}
            >
              {/* Entry Number and Title */}
              <div className='inline'>
                <span 
                  className='text-black mr-2'
                  style={{
                    fontSize: 'var(--academic-font-size-metadata)',
                    fontWeight: 'var(--academic-font-weight-metadata)',
                    color: 'var(--academic-text-secondary)'
                  }}
                >
                  [{index + 1}]
                </span>
                <h2 
                  className='inline text-black group-hover:text-[var(--academic-text-accent)] transition-colors duration-200'
                  style={{
                    fontSize: 'var(--academic-font-size-entry-title)',
                    fontWeight: 'var(--academic-font-weight-entry-title)',
                    lineHeight: 'var(--academic-line-height-normal)'
                  }}
                >
                  {post.title}
                </h2>
              </div>

              {/* Inline Metadata */}
              <div 
                className='mt-1'
                style={{
                  paddingLeft: 'var(--academic-hanging-indent)',
                  textIndent: '0'
                }}
              >
                <span 
                  className='text-black'
                  style={{
                    fontSize: 'var(--academic-font-size-metadata)',
                    fontWeight: 'var(--academic-font-weight-metadata)',
                    color: 'var(--academic-text-secondary)'
                  }}
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' • '}
                  {post.readTime}
                  {post.tags.length > 0 && (
                    <>
                      {' • '}
                      {post.tags.join(', ')}
                    </>
                  )}
                </span>
              </div>

              {/* Abstract/Excerpt */}
              <div 
                className='mt-2'
                style={{
                  paddingLeft: 'var(--academic-hanging-indent)',
                  textIndent: '0'
                }}
              >
                <p 
                  className='text-black leading-relaxed'
                  style={{
                    fontSize: 'var(--academic-font-size-body)',
                    fontWeight: 'var(--academic-font-weight-body)',
                    lineHeight: 'var(--academic-line-height-relaxed)',
                    color: 'var(--academic-text-primary)'
                  }}
                >
                  {post.excerpt}
                </p>
              </div>

              {/* Read More Link */}
              <div 
                className='mt-2'
                style={{
                  paddingLeft: 'var(--academic-hanging-indent)',
                  textIndent: '0'
                }}
              >
                <span 
                  className='text-[var(--academic-text-accent)] group-hover:underline'
                  style={{
                    fontSize: 'var(--academic-font-size-metadata)',
                    fontWeight: 'var(--academic-font-weight-metadata)'
                  }}
                >
                  Read full article →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup - Academic Style */}
        <div 
          className='mt-16 pt-8'
          style={{
            borderTop: '1px solid var(--academic-border-subtle)',
            marginTop: 'var(--academic-spacing-3xl)'
          }}
        >
          <h3 
            className='text-black mb-4'
            style={{
              fontSize: 'var(--academic-font-size-section-header)',
              fontWeight: 'var(--academic-font-weight-section-header)',
              lineHeight: 'var(--academic-line-height-tight)'
            }}
          >
            Subscribe to Updates
          </h3>
          <p 
            className='text-black mb-6 max-w-2xl'
            style={{
              fontSize: 'var(--academic-font-size-body)',
              fontWeight: 'var(--academic-font-weight-body)',
              lineHeight: 'var(--academic-line-height-normal)',
              color: 'var(--academic-text-secondary)'
            }}
          >
            Receive notifications about new research articles, methodological insights, 
            and developments in mathematical macroeconomics.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md'>
            <input
              type='email'
              placeholder='your.email@university.edu'
              className='flex-1 px-4 py-2 bg-white border text-black placeholder-gray-400 focus:outline-none focus:ring-1'
              style={{
                borderColor: 'var(--academic-border-subtle)',
                borderRadius: '2px'
              }}
            />
            <Button 
              className='text-white'
              style={{
                backgroundColor: 'var(--academic-text-accent)',
                borderRadius: '2px'
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}