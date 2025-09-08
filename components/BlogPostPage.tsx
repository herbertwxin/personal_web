import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ThumbsUp,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'

interface BlogPostPageProps {
  blogId: number | null
  onBack: () => void
}

export function BlogPostPage({ blogId, onBack }: BlogPostPageProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

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

### Key Features

1. **Dynamic**: The models track variables over time, allowing us to analyze how current decisions affect future outcomes
2. **Stochastic**: They incorporate random shocks and uncertainty, making them more realistic representations of the economic environment
3. **General Equilibrium**: All markets clear simultaneously, ensuring consistency across different sectors of the economy

## Mathematical Foundation

The basic structure of a DSGE model can be represented by the following core equations:

### Household Optimization
The representative household maximizes expected lifetime utility:

$$\\max E_0 \\sum_{t=0}^{\\infty} \\beta^t U(C_t, L_t)$$

where $\\beta$ is the discount factor, $C_t$ is consumption, and $L_t$ is labor supply.

### Production Function
Firms produce output according to:

$$Y_t = A_t K_t^{\\alpha} L_t^{1-\\alpha}$$

where $A_t$ represents total factor productivity, $K_t$ is capital, and $\\alpha$ is the capital share.

### Resource Constraint
The economy's resource constraint ensures that output is allocated between consumption, investment, and government spending:

$$Y_t = C_t + I_t + G_t$$

These equations capture the essential trade-offs that economic agents face and how their decisions aggregate to determine macroeconomic outcomes.

## The Linearization Process

One of the key technical challenges in DSGE modeling is solving the system of non-linear equations. Most practical applications use log-linearization around the steady state:

1. **Find the Steady State**: Solve for the non-stochastic steady state values of all variables
2. **Log-Linearize**: Express all variables as percentage deviations from steady state
3. **Solve the Linear System**: Use methods like the Blanchard-Kahn technique to find the solution

### The New Keynesian Core

A standard New Keynesian DSGE model reduces to three key equations:

**Phillips Curve:**
$$\\pi_t = \\beta E_t \\pi_{t+1} + \\kappa x_t$$

**Dynamic IS Curve:**
$$x_t = E_t x_{t+1} - \\sigma(i_t - E_t \\pi_{t+1})$$

**Policy Rule:**
$$i_t = \\phi_\\pi \\pi_t + \\phi_x x_t + \\varepsilon_t$$

## Policy Applications

DSGE models are particularly valuable for policy analysis because they:

- **Provide structural interpretation**: Unlike reduced-form models, DSGE models tell us why relationships exist
- **Allow counterfactual experiments**: We can ask "what if" questions about alternative policies
- **Incorporate expectations consistently**: Forward-looking behavior is built into the model's foundation
- **Enable welfare analysis**: We can evaluate whether policies make agents better or worse off

### Central Banking Applications

Central banks around the world use DSGE models for:

1. **Forecasting**: Predicting key macroeconomic variables
2. **Policy Analysis**: Evaluating the effects of different interest rate rules
3. **Communication**: Explaining policy decisions to the public and markets
4. **Stress Testing**: Assessing how the economy might respond to various shocks

## Limitations and Criticisms

Despite their widespread use, DSGE models face several important criticisms:

### Theoretical Limitations

- **Representative Agent Assumption**: The models often ignore heterogeneity across households and firms
- **Rational Expectations**: Agents are assumed to have perfect knowledge of the model structure
- **Market Clearing**: All markets are assumed to clear continuously, which may not reflect reality

### Empirical Challenges

- **Parameter Estimation**: Many parameters are difficult to identify from data
- **Model Selection**: Choosing between competing specifications is challenging
- **Forecasting Performance**: DSGE models don't always outperform simpler alternatives

## Recent Developments

The field continues to evolve with several exciting developments:

### Heterogeneous Agent Models

New research incorporates:
- **Income and wealth inequality**: How policy affects different groups differently
- **Financial frictions**: The role of credit constraints and banking
- **Network effects**: How agents interact through various channels

### Computational Advances

- **Global solution methods**: Handling large shocks and non-linearities
- **Machine learning integration**: Using AI to improve model specification and estimation
- **High-frequency data**: Incorporating real-time information

## Conclusion

DSGE models remain the dominant paradigm in macroeconomic policy analysis despite their limitations. Their strength lies in providing a coherent framework for thinking about complex economic interactions while maintaining theoretical consistency.

As the field continues to evolve, we can expect these models to become more realistic and empirically relevant while retaining their core advantage: providing a structural understanding of how economic policy affects welfare.

The key for practitioners is to understand both the power and limitations of these tools, using them as one input among many in the policy-making process.

---

*What are your thoughts on DSGE models? Have you worked with these frameworks in your research? I'd love to hear about your experiences in the comments below.*`,
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

The foundation of stochastic growth theory lies in extending the deterministic Ramsey-Cass-Koopmans model to include uncertainty. This extension requires sophisticated mathematical tools from stochastic calculus and optimal control theory.

### Basic Setup

Consider an economy where the representative agent maximizes expected lifetime utility:

$$V(k_0) = \\max E_0 \\int_0^{\\infty} e^{-\\rho t} u(c_t) dt$$

subject to the stochastic capital accumulation equation:

$$dk_t = [f(k_t, A_t) - \\delta k_t - c_t]dt + \\sigma_k k_t dW_t$$

where $W_t$ is a Wiener process representing investment uncertainty.

## The Technology Process

Technology evolution follows a geometric Brownian motion:

$$dA_t = \\mu A_t dt + \\sigma_A A_t dW_t^A$$

This specification ensures that technology remains positive and captures the idea that technological progress is inherently uncertain.

### Properties of the Technology Process

1. **Log-normality**: $\\log A_t$ follows a normal distribution
2. **Non-stationary**: Technology can grow without bound
3. **Volatility proportional to level**: Bigger shocks occur at higher technology levels

## The Hamilton-Jacobi-Bellman Equation

The key mathematical challenge in stochastic growth models is solving the Hamilton-Jacobi-Bellman (HJB) equation:

$$\\rho V(k,A) = \\max_c \\left\\{ u(c) + V_k[f(k,A) - \\delta k - c] + V_A \\mu A + \\frac{1}{2}V_{kk}\\sigma_k^2 k^2 + \\frac{1}{2}V_{AA}\\sigma_A^2 A^2 \\right\\}$$

This partial differential equation determines the optimal consumption and investment policies under uncertainty.

### Solution Techniques

#### 1. Guess and Verify Method

For specific functional forms, we can guess the form of the value function. For example, with CRRA utility and Cobb-Douglas production:

$$V(k,A) = \\frac{B k^{\\gamma} A^{\\eta}}{\\gamma}$$

Substituting this guess into the HJB equation and solving for the unknown parameters $B$, $\\gamma$, and $\\eta$.

#### 2. Perturbation Methods

For more complex models, we can use perturbation around the deterministic steady state:

$$V(k,A) = V_0(k,A) + \\sigma V_1(k,A) + \\sigma^2 V_2(k,A) + ...$$

where $\\sigma$ is a scaling parameter for uncertainty.

## Solving Stochastic Differential Equations

The model generates a system of stochastic differential equations that must be solved numerically in most cases.

### Euler Scheme

The simplest numerical method discretizes the continuous-time system:

$$k_{t+\\Delta t} = k_t + [f(k_t,A_t) - \\delta k_t - c_t]\\Delta t + \\sigma_k k_t \\sqrt{\\Delta t} \\epsilon_t$$

$$A_{t+\\Delta t} = A_t + \\mu A_t \\Delta t + \\sigma_A A_t \\sqrt{\\Delta t} \\eta_t$$

where $\\epsilon_t$ and $\\eta_t$ are independent standard normal random variables.

### Higher-Order Schemes

More accurate methods include:

- **Milstein Scheme**: Includes second-order terms for better accuracy
- **Runge-Kutta Methods**: Higher-order deterministic methods adapted for SDEs
- **Implicit Methods**: Better stability properties for stiff equations

## Policy Functions and Dynamics

The solution yields policy functions that depend on both state variables:

$$c^*(k,A) = \\arg\\max_c \\left\\{ u(c) + V_k[f(k,A) - \\delta k - c] \\right\\}$$

### Comparative Statics

The stochastic environment generates rich comparative statics:

1. **Precautionary Savings**: Uncertainty typically reduces consumption
2. **Risk Premium**: Higher volatility requires higher expected returns
3. **Volatility Effects**: Second-moment shocks have first-moment effects

## Computational Methods

Modern approaches to solving these models include:

### 1. Finite Difference Methods

Discretize the state space and approximate derivatives:

$$V_k(k,A) \\approx \\frac{V(k+h,A) - V(k-h,A)}{2h}$$

**Pros**: Straightforward implementation
**Cons**: Curse of dimensionality, boundary conditions

### 2. Spectral Methods

Approximate the value function using basis functions:

$$V(k,A) \\approx \\sum_{i,j} c_{ij} \\phi_i(k) \\psi_j(A)$$

where $\\phi_i$ and $\\psi_j$ are chosen basis functions (e.g., Chebyshev polynomials).

**Pros**: High accuracy, global approximation
**Cons**: Difficult to implement, requires smooth solutions

### 3. Monte Carlo Simulations

Simulate many paths of the economy and compute averages:

$$E[g(k_T, A_T)] \\approx \\frac{1}{N} \\sum_{i=1}^N g(k_T^{(i)}, A_T^{(i)})$$

**Pros**: Can handle complex models, easy to parallelize
**Cons**: Slow convergence, requires many simulations

### 4. Perturbation Techniques

Expand around the deterministic steady state:

$$k_t = k_{ss} + k_1 \\sigma + k_2 \\sigma^2 + ...$$

**Pros**: Analytical expressions, fast computation
**Cons**: Local accuracy only, may not capture important non-linearities

## Applications and Extensions

### Real Business Cycle Models

The stochastic growth framework forms the backbone of RBC models:

- **Technology shocks drive cycles**: Temporary productivity changes generate fluctuations
- **Calibration methodology**: Parameters chosen to match data moments
- **Impulse response functions**: Track how shocks propagate through time

### Asset Pricing Implications

The model generates predictions for asset prices:

$$r_t = \\rho + \\gamma \\mu_c - \\frac{\\gamma(\\gamma+1)}{2} \\sigma_c^2$$

This connects growth theory to finance through the consumption-based CAPM.

### Environmental Applications

Extensions include:
- **Resource depletion**: Finite natural resources
- **Climate change**: Temperature affects productivity
- **Pollution**: Environmental quality as a stock variable

## Conclusion

Stochastic growth theory provides a rich framework for understanding economic dynamics under uncertainty. While the mathematical complexity is substantial, modern computational methods make these models tractable for both theoretical analysis and empirical work.

The key insight is that uncertainty isn't just noise - it fundamentally changes behavior and outcomes in ways that deterministic models miss. As we continue to develop more sophisticated mathematical and computational tools, these models will become even more powerful for understanding economic growth and development.

---

*Have you worked with stochastic growth models? What computational challenges have you encountered? Share your experiences in the comments!*`,
    },

    {
      id: 3,
      title: 'New Keynesian Framework: A Computational Approach',
      excerpt:
        'How computational methods are revolutionizing our understanding of New Keynesian economic models.',
      date: '2024-01-10',
      readTime: '10 min read',
      tags: ['New Keynesian', 'Computation', 'Monetary Policy'],
      content: `The New Keynesian framework has evolved significantly with advances in computational methods. Modern techniques allow us to solve and estimate these models with unprecedented precision and scope, opening new avenues for both theoretical understanding and practical policy analysis.

## The Computational Revolution

Traditional macroeconomic analysis relied heavily on pencil-and-paper methods that severely limited model complexity. The computational revolution has transformed this landscape, enabling economists to:

- Solve high-dimensional non-linear models
- Estimate complex models using Bayesian methods  
- Perform real-time policy analysis
- Incorporate rich heterogeneity and market frictions

### From Simple to Complex

The journey from simple textbook models to modern computational frameworks represents a quantum leap in our analytical capabilities.

## Core New Keynesian Equations

Let's start with the canonical three-equation New Keynesian model that forms the foundation for more complex versions.

### The Phillips Curve

The New Keynesian Phillips Curve relates inflation to expected future inflation and the output gap:

$$\\pi_t = \\beta E_t \\pi_{t+1} + \\kappa x_t + u_t$$

where:
- $\\pi_t$ is inflation
- $x_t$ is the output gap
- $u_t$ is a cost-push shock
- $\\kappa = \\frac{(1-\\theta)(1-\\beta\\theta)}{\\theta}$ depends on price stickiness parameter $\\theta$

### Dynamic IS Curve

The consumption Euler equation gives us the dynamic IS curve:

$$x_t = E_t x_{t+1} - \\sigma(i_t - E_t \\pi_{t+1} - r_t^n)$$

where:
- $i_t$ is the nominal interest rate
- $r_t^n$ is the natural rate of interest
- $\\sigma$ is the intertemporal elasticity of substitution

### Monetary Policy Rule

The central bank follows a Taylor-type rule:

$$i_t = \\rho_i i_{t-1} + (1-\\rho_i)[\\phi_\\pi \\pi_t + \\phi_x x_t] + \\varepsilon_t$$

where $\\varepsilon_t$ is a monetary policy shock.

## Computational Challenges

Solving these models computationally involves several significant challenges:

### 1. Non-linearity

Many New Keynesian models are inherently non-linear due to:
- Zero lower bound on interest rates
- Occasionally binding constraints
- Time-varying parameters
- Regime switches

**Solution Approach**: Global methods that can handle non-linearities across the entire state space.

### 2. Forward-Looking Expectations

The presence of $E_t x_{t+1}$ terms requires sophisticated solution methods:
- Rational expectations must be satisfied
- Models may have multiple equilibria
- Solution methods must handle the curse of dimensionality

**Solution Approach**: Projection methods that iterate on policy functions until convergence.

### 3. High-Dimensional State Spaces

Realistic models include many state variables:
- Multiple types of shocks
- Heterogeneous agents
- Financial frictions
- International linkages

**Solution Approach**: Approximation methods that reduce dimensionality while preserving essential features.

## Solution Methods

### 1. Linear Approximation

The most common approach linearizes the model around the steady state:

$$\\begin{bmatrix} x_t \\\\ \\pi_t \\\\ i_t \\end{bmatrix} = A \\begin{bmatrix} x_{t-1} \\\\ \\pi_{t-1} \\\\ i_{t-1} \\end{bmatrix} + B \\begin{bmatrix} E_t x_{t+1} \\\\ E_t \\pi_{t+1} \\\\ E_t i_{t+1} \\end{bmatrix} + C \\begin{bmatrix} u_t \\\\ r_t^n \\\\ \\varepsilon_t \\end{bmatrix}$$

**Advantages**:
- Fast computation
- Analytical insights
- Easy to estimate

**Disadvantages**:
- Local accuracy only
- Misses important non-linearities
- Certainty equivalence

### 2. Global Solution Methods

These methods solve the model over the entire state space without linearization.

#### Projection Methods

The idea is to approximate policy functions using basis functions:

$$g(x) \\approx \\sum_{i=1}^N c_i \\phi_i(x)$$

where $\\phi_i(x)$ are basis functions (polynomials, splines, etc.).

**Algorithm**:
1. Choose functional form and basis functions
2. Define residual functions from equilibrium conditions
3. Choose collocation points
4. Solve for coefficients that minimize residuals

#### Value Function Iteration

For dynamic programming problems:
1. Discretize state space
2. Iterate on Bellman equation: $V^{n+1} = TV^n$
3. Continue until convergence: $||V^{n+1} - V^n|| < \\epsilon$

### 3. Perturbation Methods

These expand the solution around the deterministic steady state:

$$x_t = x_{ss} + x^{(1)}\\sigma + x^{(2)}\\sigma^2 + ...$$

where $\\sigma$ scales uncertainty.

**Second-order approximation** captures:
- Risk premia
- Precautionary behavior  
- Jensen's inequality effects

## Estimation Techniques

### 1. Method of Moments

Match model-generated moments with data moments:

$$\\hat{\\theta} = \\arg\\min_\\theta [m_d - m_m(\\theta)]'W[m_d - m_m(\\theta)]$$

where $m_d$ are data moments and $m_m(\\theta)$ are model moments.

### 2. Maximum Likelihood

For linear models, use the Kalman filter to evaluate likelihood:

$$L(\\theta) = \\prod_{t=1}^T f(y_t | y_{t-1}, \\theta)$$

**Steps**:
1. Cast model in state-space form
2. Apply Kalman filter to get likelihood
3. Maximize likelihood numerically

### 3. Bayesian Estimation

Combine prior information with data:

$$p(\\theta|Y) \\propto p(Y|\\theta) p(\\theta)$$

**Metropolis-Hastings Algorithm**:
1. Start with initial parameter value
2. Propose new value: $\\theta' = \\theta + \\epsilon$
3. Accept/reject based on posterior ratio
4. Repeat until convergence

### 4. Particle Filters

For non-linear models, use particle filters:
1. Generate particles from prior: $\\{\\theta^{(i)}\\}_{i=1}^N$
2. Weight by likelihood: $w^{(i)} = p(y_t|\\theta^{(i)})$
3. Resample and continue

## Implementation Examples

### MATLAB/Dynare

\`\`\`matlab
% Model equations
model;
  % Phillips Curve
  pi = beta*pi(+1) + kappa*x + u;
  
  % IS Curve  
  x = x(+1) - sigma*(i - pi(+1) - rn);
  
  % Policy Rule
  i = rho*i(-1) + (1-rho)*(phi_pi*pi + phi_x*x) + eps_i;
end;
\`\`\`

### Python/PyDSOGE

\`\`\`python
from pydsoge import DSGE

# Define model
model = DSGE.read('nk_model.yaml')

# Estimate parameters
model.estimate(data, method='mcmc', draws=10000)

# Compute IRFs
irf = model.irf(periods=40)
\`\`\`

## Applications in Policy Analysis

### 1. Optimal Monetary Policy

Solve Ramsey problem:

$$\\max E_0 \\sum_{t=0}^{\\infty} \\beta^t [\\alpha_\\pi \\pi_t^2 + \\alpha_x x_t^2 + \\alpha_i (i_t - i_{t-1})^2]$$

subject to Phillips curve and IS curve.

### 2. Forward Guidance

Analyze effects of communication about future policy:

$$E_t i_{t+k} = \\phi_\\pi E_t \\pi_{t+k} + \\phi_x E_t x_{t+k} \\quad \\text{for } k = 1,2,...,T$$

### 3. Zero Lower Bound

Handle occasionally binding constraint:

$$i_t = \\max\\{0, i_t^*\\}$$

where $i_t^*$ is the unconstrained optimal rate.

## Recent Developments

### Machine Learning Integration

- **Neural networks** for policy function approximation
- **Reinforcement learning** for optimal policy design
- **Deep learning** for state space reduction

### High-Frequency Data

- **Mixed-frequency models** combining monthly and quarterly data
- **Real-time estimation** with streaming data
- **News-based nowcasting** using textual analysis

### Heterogeneous Agents

- **TANK models**: Two-agent New Keynesian models
- **HANK models**: Heterogeneous agent New Keynesian models  
- **Distributional effects**: How policy affects different groups

## Conclusion

Computational methods have revolutionized New Keynesian macroeconomics, enabling researchers and policymakers to tackle previously intractable problems. While challenges remain, particularly in handling high-dimensional non-linear models, the trajectory is clear: computation will continue to expand the frontier of what's possible in macroeconomic analysis.

The key insight is that computation doesn't just make existing methods faster - it enables entirely new approaches to understanding economic phenomena. As computational power continues to grow and methods become more sophisticated, we can expect even more dramatic advances in our ability to understand and manage macroeconomic systems.

---

*What computational challenges have you encountered in macroeconomic modeling? Which methods have you found most effective? Share your thoughts below!*`,
    },

    {
      id: 4,
      title: 'Teaching Economics Through Interactive Models',
      excerpt:
        'Innovative approaches to making complex economic concepts accessible to undergraduate students.',
      date: '2023-12-22',
      readTime: '6 min read',
      tags: ['Teaching', 'Education', 'Interactive Models'],
      content: `Teaching complex economic models to undergraduate students presents unique challenges. Traditional approaches often rely on static presentations and abstract mathematical formulations that can seem disconnected from real-world phenomena. Interactive models and visual demonstrations offer a powerful alternative that can transform abstract concepts into intuitive understanding.

## The Pedagogical Challenge

Economic education faces several fundamental challenges that have persisted despite decades of curriculum development:

### Abstract Nature of Economic Concepts

Many core economic concepts are inherently abstract:
- **Equilibrium**: A theoretical state that may never be observed
- **Expectations**: Unobservable mental states that drive behavior
- **Dynamic processes**: Changes that unfold over time in complex ways
- **Feedback loops**: Circular causality that can be counterintuitive

### Mathematical Complexity

Modern economics relies heavily on mathematics:
- **Optimization problems**: Many students struggle with calculus-based approaches
- **Stochastic processes**: Uncertainty and random variables are difficult to visualize
- **General equilibrium**: Multiple markets clearing simultaneously
- **Dynamic systems**: Differential equations and stability analysis

### Disconnect from Reality

Students often perceive economics as:
- Too theoretical and unrealistic
- Irrelevant to their daily lives
- Overly simplified relative to actual complexity
- Dominated by unrealistic assumptions

## The Promise of Interactive Learning

Interactive models address these challenges by making the invisible visible and the abstract concrete.

### What Makes Learning Interactive?

Interactive learning involves:
1. **Active participation**: Students manipulate variables and observe outcomes
2. **Immediate feedback**: Changes are reflected instantly in the model
3. **Experimentation**: Students can test hypotheses and explore scenarios
4. **Visual representation**: Complex relationships become graphically apparent

### Cognitive Benefits

Research in educational psychology shows that interactive learning:
- **Improves retention**: Active engagement enhances memory formation
- **Develops intuition**: Pattern recognition through repeated interaction
- **Builds confidence**: Students can explore without fear of "wrong" answers
- **Encourages curiosity**: Interactive elements naturally prompt questions

## Designing Effective Interactive Models

Creating successful educational tools requires careful attention to both pedagogical and technical considerations.

### Progressive Complexity

Effective models follow a structured progression:

#### Level 1: Basic Concepts
Start with simple, one-variable relationships:
- Supply and demand with linear curves
- Single-market equilibrium
- Basic comparative statics

**Example Interface Elements**:
- Slider for "Consumer Income"
- Real-time graph updates
- Simple text explanations

#### Level 2: Dynamic Interactions
Introduce time and adjustment processes:
- Market adjustment toward equilibrium
- Inflation and unemployment relationships
- Simple business cycles

**Enhanced Features**:
- Play/pause controls for time evolution
- Speed adjustment sliders
- Historical trace visualization

#### Level 3: Multi-Market Systems
Show interconnected markets:
- General equilibrium effects
- Policy spillovers across sectors
- International trade linkages

**Advanced Interfaces**:
- Multiple synchronized graphs
- Network visualizations
- Scenario comparison tools

### Principles of Good Design

#### Clarity and Focus
- **Single concept per module**: Avoid cognitive overload
- **Clear visual hierarchy**: Important elements should stand out
- **Minimal interface clutter**: Remove unnecessary decorative elements
- **Consistent navigation**: Predictable user experience

#### Meaningful Interaction
- **Direct manipulation**: Click and drag rather than typing numbers
- **Natural mappings**: Intuitive relationships between controls and effects
- **Appropriate feedback**: Visual and auditory cues for user actions
- **Reversible actions**: Easy to undo changes and start over

#### Pedagogical Alignment
- **Learning objectives**: Every feature should serve a clear educational purpose
- **Assessment integration**: Built-in questions and checks for understanding
- **Scaffolding**: Gradual removal of support as mastery develops
- **Personalization**: Adaptation to different learning speeds and styles

## Implementation Strategies

### Technology Choices

#### Web-Based Platforms
**Advantages**:
- Cross-platform compatibility
- Easy distribution and updates
- Rich interactive capabilities
- Integration with learning management systems

**Popular Frameworks**:
- D3.js for custom visualizations
- React for interactive interfaces
- WebGL for high-performance graphics
- Progressive Web Apps for mobile compatibility

#### Specialized Software
**Mathematical Tools**:
- MATLAB for complex modeling
- Mathematica for symbolic computation  
- R/Shiny for statistical applications
- GeoGebra for geometric concepts

### Content Development Process

#### 1. Learning Objective Analysis
- Identify core concepts to be taught
- Define measurable learning outcomes
- Map prerequisites and dependencies
- Consider common student misconceptions

#### 2. Conceptual Design
- Sketch key relationships and variables
- Design the interaction flow
- Plan progressive disclosure of complexity
- Create assessment checkpoints

#### 3. Technical Implementation
- Choose appropriate technology stack
- Build minimum viable product
- Iterate based on user testing
- Optimize for performance and accessibility

#### 4. Classroom Integration
- Develop instructor guides and materials
- Create assignments and assessments
- Train faculty on effective use
- Establish technical support procedures

## Case Studies in Interactive Economics Education

### 1. Supply and Demand Simulator

**Concept**: Market equilibrium and comparative statics

**Interactive Elements**:
- Draggable supply and demand curves
- Parameter sliders (income, prices of substitutes)
- Real-time equilibrium calculation
- Consumer and producer surplus visualization

**Learning Outcomes**:
- Students can predict equilibrium changes
- Understanding of welfare effects
- Intuition for elasticity concepts

**Implementation Results**:
- 40% improvement in quiz scores
- Increased engagement in class discussions
- Better performance on graphical analysis problems

### 2. Monetary Policy Game

**Concept**: Central bank decision-making and macroeconomic tradeoffs

**Interactive Elements**:
- Interest rate setting tool
- Real-time economic indicators (inflation, unemployment, growth)
- Multiple scenarios with different economic conditions
- Historical comparison with actual Fed decisions

**Learning Outcomes**:
- Appreciation for policy complexity
- Understanding of lag effects
- Recognition of uncertainty in policy-making

**Student Feedback**:
- "Finally understood why the Fed doesn't just set rates at zero"
- "Realized how hard it is to time policy correctly"
- "Made the connection between theory and real-world decisions"

### 3. International Trade Explorer

**Concept**: Comparative advantage and gains from trade

**Interactive Elements**:
- Production possibility frontiers for two countries
- Trade flow visualization
- Welfare calculations for consumers and producers
- Tariff and quota analysis tools

**Learning Outcomes**:
- Deeper understanding of comparative advantage
- Recognition of distributional effects
- Ability to analyze trade policy impacts

## Measuring Effectiveness

### Quantitative Metrics

#### Performance Measures
- **Pre/post test scores**: Compare before and after exposure
- **Problem-solving accuracy**: Performance on applied problems
- **Retention tests**: Understanding after time delay
- **Transfer tasks**: Application to new contexts

#### Engagement Indicators
- **Time on task**: How long students interact with materials
- **Exploration patterns**: Which features are used most
- **Return visits**: Frequency of voluntary use
- **Help-seeking behavior**: When and why students ask for assistance

### Qualitative Assessment

#### Student Surveys
Regular feedback on:
- Perceived usefulness and engagement
- Difficulty level and learning curve
- Technical issues and usability problems
- Suggestions for improvement

#### Focus Groups
In-depth discussions about:
- Learning preferences and study habits
- Comparison with traditional methods
- Emotional responses to interactive elements
- Recommendations for other topics

#### Instructor Observations
Faculty insights on:
- Changes in classroom dynamics
- Quality of student questions and discussions
- Performance on assignments and exams
- Long-term retention in advanced courses

## Challenges and Limitations

### Technical Challenges

#### Development Costs
- **Time-intensive**: Creating quality interactive content requires significant investment
- **Specialized skills**: Need programmers who understand both technology and pedagogy
- **Maintenance burden**: Software requires ongoing updates and bug fixes
- **Platform compatibility**: Ensuring functionality across different devices and browsers

#### User Experience Issues
- **Learning curve**: Some students may struggle with technology
- **Distraction potential**: Interactive elements might divert attention from learning goals
- **Technical failures**: Software bugs can disrupt learning experience
- **Accessibility concerns**: Need to accommodate students with disabilities

### Pedagogical Limitations

#### Over-Reliance Risk
- **Substitution fallacy**: Technology cannot replace good teaching
- **Conceptual shortcuts**: Students might memorize patterns without understanding principles
- **Reduced analytical skills**: Less practice with formal mathematical reasoning
- **False precision**: Models may give illusion of certainty in uncertain domain

#### Implementation Barriers
- **Faculty training**: Instructors need support to use new tools effectively
- **Institutional resistance**: Change is often slow in academic settings
- **Resource constraints**: Limited budgets for technology investment
- **Assessment alignment**: Traditional exams may not reflect interactive learning gains

## Future Directions

### Emerging Technologies

#### Artificial Intelligence
- **Adaptive learning**: Personalized experiences based on individual progress
- **Intelligent tutoring**: AI-powered assistance and feedback
- **Natural language processing**: Conversational interfaces for economic exploration
- **Predictive analytics**: Early identification of students at risk

#### Virtual and Augmented Reality
- **Immersive environments**: Walk through economic models in 3D space
- **Spatial reasoning**: Better understanding of multi-dimensional relationships
- **Collaborative experiences**: Multiple students exploring shared virtual economies
- **Historical simulations**: Experience economic events from different perspectives

#### Blockchain and Distributed Systems
- **Decentralized simulations**: Students participate in actual economic systems
- **Cryptocurrency economics**: Hands-on experience with digital assets
- **Smart contracts**: Programming economic relationships directly
- **Peer-to-peer markets**: Real trading with educational safeguards

### Pedagogical Innovations

#### Gamification
- **Achievement systems**: Rewards for mastering concepts
- **Leaderboards**: Friendly competition to encourage engagement
- **Narrative elements**: Story-driven economic exploration
- **Role-playing**: Students take on different economic roles

#### Collaborative Learning
- **Multi-player simulations**: Students interact as different economic agents
- **Peer teaching**: Students create content for each other
- **Real-time collaboration**: Synchronized exploration of economic scenarios
- **Global classrooms**: International students working together

## Conclusion

Interactive models represent a powerful tool for economics education, but they are not a panacea. Success requires careful design, thoughtful implementation, and realistic expectations about both benefits and limitations.

The key insight is that interactivity is most valuable when it serves clear pedagogical purposes rather than being implemented for its own sake. The best interactive learning experiences combine the engagement of modern technology with the rigor of economic reasoning.

As we continue to develop these tools, the focus should remain on student learning outcomes. Technology should enhance rather than replace the fundamental goals of economics education: developing analytical thinking, understanding human behavior, and preparing citizens to participate in complex economic systems.

The future of economics education will likely involve a blend of traditional and interactive approaches, with the specific mix depending on learning objectives, student needs, and available resources. What matters most is not the technology itself, but how effectively it helps students develop deep, lasting understanding of economic principles.

---

*What has been your experience with interactive learning in economics? Have you found certain types of simulations particularly effective? I'd love to hear your thoughts and experiences in the comments below.*`,
    },

    {
      id: 5,
      title: 'The Future of Macroeconomic Modeling',
      excerpt:
        'Emerging trends and technologies that will shape the next generation of economic models.',
      date: '2023-12-08',
      readTime: '9 min read',
      tags: ['Future', 'Technology', 'Modeling'],
      content: `The landscape of macroeconomic modeling is undergoing a fundamental transformation. Driven by exponential advances in computing power, revolutionary developments in artificial intelligence, and unprecedented access to real-time data, the next generation of economic models promises to be more accurate, more comprehensive, and more relevant to policy-making than ever before.

## The Current State of Macroeconomic Modeling

Before exploring future possibilities, it's worth reflecting on where we stand today. Modern macroeconomic modeling is dominated by Dynamic Stochastic General Equilibrium (DSGE) models, which have served as the workhorse of central banks and policy institutions worldwide.

### Strengths of Current Approaches

**Theoretical Consistency**: DSGE models are built on solid microeconomic foundations, ensuring that macroeconomic relationships derive from individual optimization behavior.

**Policy Analysis**: These frameworks excel at analyzing the effects of policy changes while maintaining theoretical coherence.

**Expectation Formation**: Rational expectations are embedded naturally in the model structure.

### Persistent Limitations

Despite their widespread adoption, current models face significant challenges:

**Linearization**: Most applications rely on linear approximations that may miss important non-linearities
**Representative Agents**: Heterogeneity is often ignored or heavily simplified
**Financial Frictions**: Traditional models struggle to capture complex financial market dynamics
**Computational Constraints**: Even modern models are limited by what can be solved analytically or numerically

## Technological Frontiers

The convergence of several technological trends is creating unprecedented opportunities for advancing macroeconomic modeling.

### Artificial Intelligence and Machine Learning

AI is not just changing how we analyze data—it's fundamentally altering how we can think about economic modeling itself.

#### Neural Networks for Economic Relationships

Traditional economic models assume specific functional forms (linear, Cobb-Douglas, CES, etc.). Neural networks can discover non-linear relationships directly from data without imposing parametric restrictions.

**Deep Learning Applications**:
- **Universal function approximation**: Neural networks can represent arbitrarily complex relationships
- **Feature discovery**: Automatic identification of relevant economic indicators
- **Pattern recognition**: Detection of regime changes and structural breaks
- **High-dimensional analysis**: Handling thousands of variables simultaneously

**Example Implementation**:
\`\`\`python
import tensorflow as tf

class EconomicPredictionModel(tf.keras.Model):
    def __init__(self, num_variables):
        super().__init__()
        self.dense1 = tf.keras.layers.Dense(128, activation='relu')
        self.dense2 = tf.keras.layers.Dense(64, activation='relu')
        self.output_layer = tf.keras.layers.Dense(num_variables)
        
    def call(self, inputs):
        x = self.dense1(inputs)
        x = self.dense2(x)
        return self.output_layer(x)
\`\`\`

#### Reinforcement Learning for Policy Optimization

Traditional optimal policy analysis relies on solving complex dynamic programming problems. Reinforcement learning offers an alternative approach where AI agents learn optimal policies through trial and error.

**Applications**:
- **Central bank policy**: Learning optimal interest rate rules
- **Fiscal policy**: Discovering effective government spending strategies
- **Regulatory policy**: Optimizing financial sector regulations
- **International coordination**: Multi-agent learning for global policy cooperation

#### Natural Language Processing for Economic Analysis

The explosion of textual data—from news articles to social media posts to central bank communications—offers rich information about economic conditions and expectations.

**NLP Applications**:
- **Sentiment analysis**: Real-time measures of economic confidence
- **Topic modeling**: Identifying emerging economic themes
- **Event extraction**: Automated detection of policy announcements
- **Expectation measurement**: Inferring market expectations from text

### Big Data Integration

The digital economy generates vast amounts of high-frequency data that traditional models cannot fully exploit.

#### High-Frequency Economic Indicators

**Digital Transactions**: Real-time spending patterns from credit card companies and payment processors provide immediate insights into economic activity.

**Search Data**: Google searches for unemployment benefits, job openings, or economic terms can predict economic turning points.

**Satellite Imagery**: Night-time light intensity, parking lot occupancy, and shipping traffic offer alternative measures of economic activity.

**Social Media**: Twitter sentiment, Facebook check-ins, and LinkedIn job postings provide real-time economic sentiment indicators.

#### Alternative Data Sources

**Energy Consumption**: Real-time electricity usage patterns correlate strongly with industrial production.

**Transportation Data**: Traffic patterns, flight schedules, and shipping routes reveal economic activity in real-time.

**Financial Market Microstructure**: High-frequency trading data captures market expectations and risk perceptions.

### Quantum Computing

While still in early development, quantum computing promises to solve computational problems that are intractable for classical computers.

#### Potential Applications

**Optimization Problems**: Quantum algorithms could solve large-scale portfolio optimization and resource allocation problems exponentially faster.

**Monte Carlo Simulations**: Quantum Monte Carlo methods could dramatically improve the accuracy of stochastic economic models.

**Machine Learning**: Quantum machine learning algorithms might discover patterns in economic data that classical methods miss.

**Cryptographic Applications**: Quantum-safe encryption will be essential as quantum computers develop.

**Timeline and Challenges**:
- **Near-term (5-10 years)**: Limited applications to specific optimization problems
- **Medium-term (10-20 years)**: Broader applications as quantum hardware improves
- **Long-term (20+ years)**: Potential for breakthrough applications in economic modeling

## Methodological Advances

Beyond technological improvements, new methodological approaches are expanding the toolkit available to macroeconomic modelers.

### Agent-Based Modeling

Traditional macro models assume representative agents, but real economies consist of heterogeneous individuals and firms with different characteristics and behaviors.

#### Key Features of ABM

**Heterogeneous Agents**: Individual agents with different preferences, constraints, and decision-making processes

**Bounded Rationality**: Agents use simple heuristics rather than perfect optimization

**Network Effects**: Agents interact through various networks (social, financial, trade)

**Emergent Phenomena**: Macroeconomic patterns emerge from micro-level interactions

#### Implementation Example

\`\`\`python
class EconomicAgent:
    def __init__(self, agent_id, wealth, consumption_propensity):
        self.id = agent_id
        self.wealth = wealth
        self.consumption_propensity = consumption_propensity
        self.neighbors = []
    
    def make_consumption_decision(self, economic_conditions):
        # Simple decision rule based on wealth and social influences
        neighbor_avg_consumption = np.mean([n.last_consumption for n in self.neighbors])
        
        base_consumption = self.wealth * self.consumption_propensity
        social_influence = 0.1 * neighbor_avg_consumption
        
        return base_consumption + social_influence
    
    def update_expectations(self, observed_outcomes):
        # Adaptive learning mechanism
        self.consumption_propensity *= (1 + 0.01 * observed_outcomes)
\`\`\`

### Real-Time Estimation and Learning

Static models estimated on historical data may miss important changes in economic structure. Real-time methods continuously update model parameters as new data arrives.

#### Approaches

**Kalman Filtering**: Sequential updating of model states and parameters

**Particle Filtering**: Non-linear filtering for complex models

**Online Learning**: Machine learning algorithms that adapt continuously

**Regime-Switching Models**: Models that allow for structural changes over time

### Network Economics

Economic systems are increasingly understood as complex networks where the structure of connections matters as much as individual node characteristics.

#### Network Applications

**Financial Contagion**: How financial distress spreads through banking networks

**Trade Networks**: How international trade patterns affect economic outcomes

**Knowledge Networks**: How information and innovation spread through economic systems

**Social Networks**: How social connections affect economic behavior

## Data Revolution

The availability and quality of economic data has exploded, creating new opportunities and challenges for modelers.

### Real-Time Data Streams

#### Financial Markets
- Millisecond-level transaction data
- Order book dynamics
- Cross-asset correlations
- Global market linkages

#### Consumer Behavior
- Real-time spending patterns
- Location-based activity data
- Search and browsing behavior
- Social media activity

#### Business Operations
- Supply chain data
- Production schedules
- Inventory levels
- Employment flows

### Privacy and Ethical Considerations

The use of big data in economic modeling raises important privacy and ethical questions:

**Data Privacy**: Protecting individual privacy while extracting economic insights

**Algorithmic Bias**: Ensuring that AI systems don't perpetuate or amplify economic inequalities

**Transparency**: Making complex AI models interpretable for policy purposes

**Consent and Governance**: Establishing appropriate frameworks for data use

## Implications for Policy

These technological and methodological advances will transform how economic policy is formulated and implemented.

### Enhanced Forecasting Capabilities

**Short-term Accuracy**: Real-time data and AI could dramatically improve nowcasting abilities

**Long-term Precision**: Better models of structural change could improve long-term forecasts

**Uncertainty Quantification**: More sophisticated methods for measuring and communicating forecast uncertainty

**Scenario Analysis**: Rapid exploration of alternative policy scenarios

### Personalized Policy Analysis

Traditional models analyze effects on representative agents. Future models could analyze distributional effects across different demographic groups, regions, and sectors.

**Targeted Interventions**: Policies designed for specific populations based on detailed microdata

**Regional Policy**: Subnational models that account for local economic conditions

**Sectoral Analysis**: Industry-specific policies based on detailed business data

### Real-Time Policy Adjustment

Rather than setting policies and waiting to observe effects, future systems might enable continuous policy adjustment based on real-time feedback.

**Algorithmic Policy**: AI systems that automatically adjust certain policy instruments

**Predictive Intervention**: Early warning systems that trigger policy responses

**A/B Testing**: Randomized policy experiments at scale

### International Coordination

Global economic challenges require coordinated responses. Future modeling capabilities could enable:

**Multi-Country Models**: Detailed models of international economic linkages

**Policy Spillover Analysis**: Understanding how domestic policies affect other countries

**Coordinated Optimization**: Finding globally optimal policy combinations

## Challenges and Risks

While the future of macroeconomic modeling holds great promise, it also presents significant challenges and risks.

### Technical Challenges

#### Computational Complexity
Even with improving technology, the computational demands of sophisticated models remain enormous.

**Scalability**: Models need to handle increasingly large datasets and complex relationships

**Speed**: Policy analysis requires rapid turnaround times

**Reliability**: Models must be robust and stable across different conditions

#### Model Validation
Complex models are harder to validate and interpret:

**Black Box Problem**: Neural networks and other AI methods often lack interpretability

**Overfitting**: Complex models may fit historical data perfectly but fail to generalize

**Causal Inference**: Distinguishing correlation from causation remains challenging

### Economic and Policy Risks

#### Over-Reliance on Models
The sophistication of future models might create false confidence:

**Model Uncertainty**: All models are approximations of reality

**Structural Breaks**: Economic relationships can change in ways models don't anticipate

**Lucas Critique**: Policy changes can alter the underlying economic relationships

#### Inequality and Access
Advanced modeling capabilities might not be equally available:

**Resource Requirements**: Sophisticated models require significant computational resources

**Expertise Barriers**: Few institutions have the technical expertise to develop and maintain advanced models

**Democratic Accountability**: Complex models might be less transparent to the public

### Social and Ethical Considerations

#### Privacy and Surveillance
The data requirements of future models raise privacy concerns:

**Individual Tracking**: Detailed economic models might require invasive data collection

**Government Surveillance**: Economic modeling could become a tool for social control

**Commercial Exploitation**: Private companies might use economic insights for profit rather than public benefit

#### Algorithmic Governance
As models become more sophisticated, they might increasingly drive policy decisions:

**Human Oversight**: Maintaining human judgment in policy-making

**Democratic Legitimacy**: Ensuring that algorithmic decisions reflect democratic values

**Accountability**: Clear responsibility for model-driven policy decisions

## Preparing for the Future

The transformation of macroeconomic modeling will require coordinated efforts across multiple dimensions.

### Education and Training

**Interdisciplinary Skills**: Future economists will need training in computer science, statistics, and domain expertise

**Continuing Education**: Practitioners will need ongoing training to keep up with technological advances

**Public Understanding**: Better public education about economic models and their limitations

### Infrastructure Development

**Computing Resources**: Investment in high-performance computing facilities

**Data Infrastructure**: Secure, accessible data platforms for research and policy

**Software Development**: Open-source tools for advanced economic modeling

### Institutional Changes

**Regulatory Frameworks**: New regulations for AI use in economic policy

**International Standards**: Common standards for data sharing and model validation

**Research Funding**: Support for interdisciplinary research in computational economics

### Ethical Guidelines

**Professional Standards**: Codes of conduct for economists using AI and big data

**Transparency Requirements**: Standards for model documentation and disclosure

**Public Participation**: Mechanisms for public input into model development and use

## Conclusion

The future of macroeconomic modeling stands at an inflection point. The convergence of artificial intelligence, big data, and quantum computing promises to revolutionize our ability to understand and manage economic systems. These advances offer the potential for more accurate forecasts, better policy analysis, and deeper insights into economic behavior.

However, this transformation also brings significant challenges. Technical complexity, computational demands, and ethical considerations all require careful attention. The risk of over-reliance on sophisticated but imperfect models is real, as is the potential for these tools to exacerbate existing inequalities or undermine democratic governance.

Success in navigating this transition will require:

1. **Balanced Perspective**: Recognizing both the potential and limitations of new technologies
2. **Interdisciplinary Collaboration**: Bringing together economists, computer scientists, statisticians, and domain experts
3. **Ethical Framework**: Developing guidelines that ensure technology serves the public interest
4. **Continuous Learning**: Adapting educational programs and professional development to keep pace with change
5. **Democratic Participation**: Maintaining public oversight and accountability in an age of algorithmic governance

The models of the future will be more powerful than anything we have today, but they will still be models—simplified representations of an enormously complex reality. The key to success will be using these tools wisely, maintaining appropriate humility about their limitations while leveraging their capabilities to build more prosperous and equitable societies.

As we stand on the threshold of this new era, the choices we make today about research priorities, institutional structures, and ethical frameworks will shape the field of macroeconomics for generations to come. The opportunity is immense, but so is the responsibility to get it right.

---

*What aspects of future macroeconomic modeling do you find most promising or concerning? How do you think the field should balance innovation with caution? Share your thoughts on the future of economic modeling in the comments below.*`,
    },
  ]

  const post = blogPosts.find(p => p.id === blogId)

  if (!post) {
    return (
      <motion.div className='min-h-screen pb-12 px-6 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl text-black mb-4'>Post Not Found</h1>
          <Button
            onClick={onBack}
            className='bg-[#6A5ACD] hover:bg-[#5a4fcf] text-white'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className='min-h-screen pb-12 px-6'
      initial={hasAnimated ? false : { opacity: 0, y: 10 }}
      animate={hasAnimated ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: hasAnimated ? 'auto' : 'transform, opacity' }}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={hasAnimated ? false : { opacity: 0, y: 20 }}
          animate={hasAnimated ? false : { opacity: 1, y: 0 }}
          transition={{
            duration: hasAnimated ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='mb-8'
        >
          <Button
            onClick={onBack}
            variant='ghost'
            className='mb-6 text-black hover:text-[#6A5ACD]'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>

          <div className='mb-6'>
            <h1 className='text-4xl text-black mb-4 leading-tight'>
              {post.title}
            </h1>

            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-4 text-black'>
                <div className='flex items-center space-x-1'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className='flex items-center space-x-1'>
                  <Clock className='w-4 h-4' />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className='flex items-center space-x-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setLiked(!liked)}
                  className={`text-black hover:text-[#6A5ACD] ${liked ? 'text-red-600' : ''}`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${liked ? 'fill-current' : ''}`}
                  />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`text-black hover:text-[#6A5ACD] ${bookmarked ? 'text-yellow-600' : ''}`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`}
                  />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-black hover:text-[#6A5ACD]'
                >
                  <Share2 className='w-4 h-4' />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-6'>
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className='bg-[#f3f1ff] text-[#6A5ACD] border-[#d6ceff]'
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Excerpt */}
            <p className='text-xl text-black leading-relaxed italic border-l-4 border-[#b8a9ff] pl-6'>
              {post.excerpt}
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className='prose prose-lg max-w-none mb-12'
        >
          <div className='p-8 border border-[#e9e5ff] rounded-lg bg-white/50'>
            <div
              className='text-black leading-relaxed whitespace-pre-line'
              style={{ lineHeight: '1.7' }}
            >
              <MarkdownRenderer content={post.content} className='' />
            </div>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className='border-t border-[#d6ceff] pt-8'
        >
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center space-x-4'>
              <Button
                onClick={() => setLiked(!liked)}
                variant={liked ? 'default' : 'outline'}
                className={
                  liked
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'border-red-300 text-red-600 hover:bg-red-50'
                }
              >
                <ThumbsUp className='w-4 h-4 mr-2' />
                {liked ? 'Liked' : 'Like'}
              </Button>

              <Button
                onClick={() => setBookmarked(!bookmarked)}
                variant={bookmarked ? 'default' : 'outline'}
                className={
                  bookmarked
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'border-yellow-300 text-yellow-600 hover:bg-yellow-50'
                }
              >
                <Bookmark className='w-4 h-4 mr-2' />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>

              <Button
                variant='outline'
                className='border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]'
              >
                <Share2 className='w-4 h-4 mr-2' />
                Share
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className='flex justify-between items-center'>
            <Button
              onClick={onBack}
              variant='outline'
              className='border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Blog
            </Button>

            <div className='flex space-x-2'>
              <Button className='bg-[#6A5ACD] hover:bg-[#5a4fcf] text-white'>
                Previous Post
              </Button>
              <Button className='bg-[#6A5ACD] hover:bg-[#5a4fcf] text-white'>
                Next Post
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
