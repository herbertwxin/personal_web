import{r as d,j as t,b as l,D as $,F as m,L as f,d as g,T as x}from"./vendor-react--vI7kREJ.js";import{B as o}from"./index-nGMD11s3.js";import{B as h}from"./badge-BfGPAi9u.js";import{P as c}from"./LaTeXRenderer-B-DOGHGS.js";import{m as i}from"./vendor-motion-Bf4tVoKu.js";import"./vendor-misc-CUJeVVI7.js";import"./ui-misc-DW48STyt.js";import"./utils-styling-B2rm_Apj.js";function K({modelId:p,onBack:r}){const[s,u]=d.useState(!1);d.useEffect(()=>{const a=setTimeout(()=>u(!0),100);return()=>clearTimeout(a)},[]);const e=[{id:0,title:"DSGE Model Framework",description:"A comprehensive Dynamic Stochastic General Equilibrium model for analyzing monetary policy effects in small open economies.",difficulty:"Advanced",topics:["Monetary Policy","Open Economy","Bayesian Estimation"],pages:45,downloads:234,lastUpdated:"Nov 2024",content:{introduction:"Dynamic Stochastic General Equilibrium (DSGE) models represent the current frontier in macroeconomic modeling. This framework provides a rigorous foundation for policy analysis by grounding aggregate relationships in microeconomic optimization principles.",sections:[{title:"Model Setup and Environment",content:`We consider a small open economy populated by a representative household, firms, and a monetary authority. The economy is subject to both domestic and foreign shocks.

**Time Structure**: The model is set in discrete time t = 0, 1, 2, ...

**Information Structure**: All agents have rational expectations and observe the complete history of all variables up to time t.`},{title:"Household Problem",content:`The representative household maximizes expected lifetime utility:

**Objective Function:**
$$\\max_{\\{C_t, L_t, B_t\\}} E_0 \\sum_{t=0}^{\\infty} \\beta^t U(C_t, L_t)$$

where $\\beta \\in (0,1)$ is the discount factor, $C_t$ is consumption, and $L_t$ is labor supply.

**Utility Function:**
We assume a separable CRRA utility function:
$$U(C_t, L_t) = \\frac{C_t^{1-\\sigma}}{1-\\sigma} - \\chi \\frac{L_t^{1+\\nu}}{1+\\nu}$$

where $\\sigma > 0$ is the coefficient of relative risk aversion, $\\nu > 0$ is the inverse of the Frisch elasticity of labor supply, and $\\chi > 0$ is a preference parameter.`},{title:"Budget Constraint and Optimality",content:`**Budget Constraint:**
The household faces the following budget constraint in each period:
$$C_t + \\frac{B_{t+1}}{R_t} = W_t L_t + B_t + \\Pi_t$$

where $B_t$ are holdings of domestic bonds, $R_t$ is the gross nominal interest rate, $W_t$ is the real wage, and $\\Pi_t$ are profits from firms.

**First-Order Conditions:**
Taking first-order conditions with respect to $C_t$, $L_t$, and $B_{t+1}$:

1. **Consumption Euler Equation:**
$$C_t^{-\\sigma} = \\beta E_t[C_{t+1}^{-\\sigma} R_t \\pi_{t+1}^{-1}]$$

2. **Labor Supply:**
$$\\chi L_t^{\\nu} = C_t^{-\\sigma} W_t$$

3. **Bond Demand:**
The Euler equation already incorporates the optimal bond choice.`},{title:"Firm Problem and Production",content:`**Production Technology:**
Firms produce output using a Cobb-Douglas technology:
$$Y_t = A_t K_t^{\\alpha} L_t^{1-\\alpha}$$

where $A_t$ is total factor productivity, $K_t$ is capital, and $\\alpha \\in (0,1)$ is the capital share.

**Technology Process:**
Productivity follows an AR(1) process:
$$\\log A_t = \\rho_A \\log A_{t-1} + \\varepsilon_{A,t}$$
where $\\varepsilon_{A,t} \\sim N(0, \\sigma_A^2)$.

**Profit Maximization:**
Firms maximize profits taking prices as given:
$$\\max_{K_t, L_t} A_t K_t^{\\alpha} L_t^{1-\\alpha} - R_t^k K_t - W_t L_t$$

**First-Order Conditions:**
$$\\alpha \\frac{Y_t}{K_t} = R_t^k$$
$$(1-\\alpha) \\frac{Y_t}{L_t} = W_t$$`},{title:"Monetary Policy and Market Clearing",content:`**Monetary Policy Rule:**
The central bank follows a Taylor-type rule:
$$R_t = R^{ss} \\left(\\frac{\\pi_t}{\\pi^{ss}}\\right)^{\\phi_\\pi} \\left(\\frac{Y_t}{Y^{ss}}\\right)^{\\phi_y} \\exp(\\varepsilon_{R,t})$$

where $R^{ss}$, $\\pi^{ss}$, and $Y^{ss}$ are steady-state values.

**Market Clearing:**
1. **Goods Market:** $Y_t = C_t + I_t + G_t$
2. **Labor Market:** Labor supplied equals labor demanded
3. **Bond Market:** $\\sum B_t = 0$ (in equilibrium)

**Capital Accumulation:**
$$K_{t+1} = (1-\\delta) K_t + I_t$$
where $\\delta$ is the depreciation rate.`},{title:"Equilibrium and Solution Method",content:`**Definition of Equilibrium:**
A rational expectations equilibrium is a set of stochastic processes $\\{C_t, L_t, Y_t, K_t, R_t, W_t, \\pi_t\\}$ such that:
1. Households optimize given prices and policy
2. Firms optimize given prices
3. Markets clear
4. The monetary authority follows its policy rule

**Linearization:**
The model is solved by log-linearizing around the steady state. Let $\\tilde{x}_t = \\log(x_t/x^{ss})$ denote log-deviations from steady state.

**Key Linearized Equations:**
1. **IS Curve:** $\\tilde{c}_t = E_t\\tilde{c}_{t+1} - \\frac{1}{\\sigma}(\\tilde{r}_t - E_t\\tilde{\\pi}_{t+1})$
2. **Phillips Curve:** $\\tilde{\\pi}_t = \\beta E_t\\tilde{\\pi}_{t+1} + \\kappa \\tilde{y}_t$
3. **Policy Rule:** $\\tilde{r}_t = \\phi_\\pi \\tilde{\\pi}_t + \\phi_y \\tilde{y}_t + \\varepsilon_{R,t}$

**Solution:**
The system can be written as:
$$E_t x_{t+1} = A x_t + B \\varepsilon_t$$
where $x_t$ contains all endogenous variables and $\\varepsilon_t$ are the shocks.`}],codeExample:`// DSGE Model Solution - Simplified Calibration
const DSGEModel = {
  // Household parameters
  beta: 0.99,      // Discount factor
  sigma: 2.0,      // Risk aversion
  nu: 1.0,         // Inverse Frisch elasticity
  chi: 1.0,        // Labor disutility
  
  // Production parameters
  alpha: 0.33,     // Capital share
  delta: 0.025,    // Depreciation rate
  rho_A: 0.95,     // Persistence of technology
  sigma_A: 0.01,   // Std dev of technology shock
  
  // Policy parameters
  phi_pi: 1.5,     // Response to inflation
  phi_y: 0.5,      // Response to output
  
  // Solution method: Perturbation around steady state
  solve: function() {
    // 1. Find steady state numerically
    const steadyState = this.findSteadyState();
    
    // 2. Linearize around steady state
    const linearSystem = this.linearize(steadyState);
    
    // 3. Solve using Blanchard-Kahn method
    const solution = this.blanchardKahn(linearSystem);
    
    return solution;
  },
  
  // Impulse response functions
  irf: function(shock, periods = 40) {
    const solution = this.solve();
    return this.computeIRF(solution, shock, periods);
  }
};

// Example usage
const model = DSGEModel;
const techShockIRF = model.irf('technology', 40);
console.log('IRF to 1% technology shock:', techShockIRF);`,mathematicalAppendix:`**A.1 Steady State Conditions**

The steady state is characterized by:
1. $C^{-\\sigma} = \\beta R \\pi^{-1}$
2. $\\chi L^{\\nu} = C^{-\\sigma} W$
3. $Y = C + \\delta K$
4. $R^k = \\frac{1}{\\beta} - (1-\\delta)$
5. $\\frac{W}{P} = (1-\\alpha) \\frac{Y}{L}$

**A.2 Log-Linearization Details**

For any variable $x_t$, define $\\hat{x}_t = \\log(x_t/x^{ss})$. The log-linearized consumption Euler equation becomes:

$$\\hat{c}_t = E_t\\hat{c}_{t+1} - \\frac{1}{\\sigma}(\\hat{r}_t - E_t\\hat{\\pi}_{t+1})$$

**A.3 Solution Algorithm**

The Blanchard-Kahn solution method:
1. Write the system as $A_0 E_t x_{t+1} = A_1 x_t + B \\varepsilon_t$
2. Transform to canonical form: $E_t z_{t+1} = \\Lambda z_t + B^* \\varepsilon_t$
3. Apply boundary conditions for stable solution
4. Express in state-space form: $x_t = P z_t$`}},{id:1,title:"Growth Theory Toolkit",description:"Mathematical foundations and computational tools for endogenous growth models with human capital accumulation.",difficulty:"Intermediate",topics:["Growth Theory","Human Capital","Optimization"],pages:38,downloads:178,lastUpdated:"Oct 2024",content:{introduction:"Endogenous growth theory revolutionized our understanding of long-term economic development by making technological progress an endogenous outcome of economic decisions. This toolkit provides comprehensive coverage of the mathematical foundations underlying modern growth theory.",sections:[{title:"The Basic AK Model",content:`We begin with the simplest endogenous growth model where capital is the sole input and there are no diminishing returns.

**Production Function:**
$$Y_t = AK_t$$

where $A > 0$ is a productivity parameter and $K_t$ is the capital stock (broadly defined to include human capital).

**Capital Accumulation:**
$$\\dot{K}_t = I_t - \\delta K_t = sY_t - \\delta K_t = sAK_t - \\delta K_t$$

**Growth Rate:**
The growth rate of capital (and output) is:
$$g_K = \\frac{\\dot{K}_t}{K_t} = sA - \\delta$$

**Key Insight:** Growth is endogenous and depends on the savings rate $s$ and productivity $A$.`},{title:"Human Capital Accumulation",content:`We extend the basic model to include human capital as a separate factor.

**Production Function:**
$$Y_t = AK_t^{\\alpha}H_t^{1-\\alpha}$$

where $H_t$ is human capital stock.

**Human Capital Accumulation:**
$$\\dot{H}_t = B u_t H_t - \\delta_H H_t$$

where $u_t \\in [0,1]$ is the fraction of time devoted to education, and $B$ is the efficiency of human capital production.

**Time Allocation Constraint:**
Total time is normalized to 1:
$$u_t + l_t = 1$$
where $l_t$ is the fraction of time working.

**Effective Labor:**
$$L_t = l_t H_t = (1-u_t)H_t$$`},{title:"Optimization Problem",content:`**Representative Agent's Problem:**
$$\\max \\int_0^{\\infty} e^{-\\rho t} \\frac{C_t^{1-\\sigma}}{1-\\sigma} dt$$

subject to:
- $\\dot{K}_t = AK_t^{\\alpha}(1-u_t)^{1-\\alpha}H_t^{1-\\alpha} - C_t - \\delta K_t$
- $\\dot{H}_t = B u_t H_t - \\delta_H H_t$
- $K_0, H_0$ given

**Hamiltonian:**
$$\\mathcal{H} = \\frac{C_t^{1-\\sigma}}{1-\\sigma} + \\lambda_t[AK_t^{\\alpha}(1-u_t)^{1-\\alpha}H_t^{1-\\alpha} - C_t - \\delta K_t] + \\mu_t[B u_t H_t - \\delta_H H_t]$$`},{title:"Optimality Conditions",content:`**First-Order Conditions:**

1. **Consumption Choice:**
$$\\frac{\\partial \\mathcal{H}}{\\partial C_t} = 0 \\Rightarrow C_t^{-\\sigma} = \\lambda_t$$

2. **Education Time Choice:**
$$\\frac{\\partial \\mathcal{H}}{\\partial u_t} = 0 \\Rightarrow \\lambda_t (1-\\alpha)AK_t^{\\alpha}(1-u_t)^{-\\alpha}H_t^{1-\\alpha} = \\mu_t B H_t$$

3. **Capital Evolution:**
$$\\dot{\\lambda}_t = \\rho \\lambda_t - \\frac{\\partial \\mathcal{H}}{\\partial K_t} = \\lambda_t[\\rho - \\alpha AK_t^{\\alpha-1}(1-u_t)^{1-\\alpha}H_t^{1-\\alpha} + \\delta]$$

4. **Human Capital Evolution:**
$$\\dot{\\mu}_t = \\rho \\mu_t - \\frac{\\partial \\mathcal{H}}{\\partial H_t}$$

**Transversality Conditions:**
$$\\lim_{t \\to \\infty} e^{-\\rho t} \\lambda_t K_t = 0$$
$$\\lim_{t \\to \\infty} e^{-\\rho t} \\mu_t H_t = 0$$`},{title:"Balanced Growth Path",content:`**Definition:** A balanced growth path (BGP) is a path where all variables grow at constant (possibly different) rates.

**BGP Conditions:**
Let $g_K, g_H, g_C, g_Y$ denote growth rates. On a BGP:

1. **Constant Growth Rates:**
$$\\frac{\\dot{K}_t}{K_t} = g_K, \\quad \\frac{\\dot{H}_t}{H_t} = g_H, \\quad \\frac{\\dot{C}_t}{C_t} = g_C$$

2. **Consistent Production:**
From $Y_t = AK_t^{\\alpha}H_t^{1-\\alpha}$:
$$g_Y = \\alpha g_K + (1-\\alpha)g_H$$

3. **Resource Constraint:**
$$g_K = g_Y = g_C$$ (in the long run)

**Solving for BGP:**
From the optimality conditions and BGP requirements:
$$g = g_K = g_H = g_C = g_Y = \\frac{B - \\delta_H - \\rho}{\\sigma}$$

**Key Result:** The growth rate depends on:
- Human capital technology ($B$)
- Impatience ($\\rho$)  
- Risk aversion ($\\sigma$)
- Human capital depreciation ($\\delta_H$)`}],codeExample:`// Human Capital Growth Model - Numerical Solution
class HumanCapitalGrowthModel {
  constructor(params = {}) {
    // Model parameters
    this.A = params.A || 1.0;        // TFP
    this.B = params.B || 0.05;       // Human capital efficiency
    this.alpha = params.alpha || 0.3; // Capital share
    this.sigma = params.sigma || 2.0; // Risk aversion
    this.rho = params.rho || 0.03;   // Time preference
    this.delta = params.delta || 0.05; // Capital depreciation
    this.delta_H = params.delta_H || 0.02; // HC depreciation
  }
  
  // Balanced Growth Path calculation
  computeBGP() {
    const { B, delta_H, rho, sigma } = this;
    
    // Growth rate on BGP
    const g = (B - delta_H - rho) / sigma;
    
    // Optimal education time
    const u_bgp = this.findOptimalEducation();
    
    return {
      growthRate: g,
      educationTime: u_bgp,
      workTime: 1 - u_bgp
    };
  }
  
  // Solve for optimal education time numerically
  findOptimalEducation() {
    const tolerance = 1e-6;
    let u = 0.5; // Initial guess
    
    for (let iter = 0; iter < 100; iter++) {
      const f = this.educationOptimalityCondition(u);
      const fprime = this.educationOptimalityDerivative(u);
      
      const u_new = u - f / fprime; // Newton's method
      
      if (Math.abs(u_new - u) < tolerance) {
        return Math.max(0, Math.min(1, u_new)); // Bound between 0 and 1
      }
      u = u_new;
    }
    
    throw new Error('Failed to converge in optimal education calculation');
  }
  
  // Simulate transition dynamics
  simulate(T = 100, dt = 0.1) {
    const steps = Math.floor(T / dt);
    const results = {
      time: [],
      K: [],
      H: [],
      C: [],
      Y: [],
      u: []
    };
    
    // Initial conditions
    let K = 1.0;
    let H = 1.0;
    
    for (let i = 0; i <= steps; i++) {
      const t = i * dt;
      
      // Compute optimal controls (simplified)
      const u = this.computeOptimalEducation(K, H, t);
      const C = this.computeOptimalConsumption(K, H, t);
      
      // Compute output
      const Y = this.A * Math.pow(K, this.alpha) * 
                Math.pow((1-u) * H, 1-this.alpha);
      
      // Store results
      results.time.push(t);
      results.K.push(K);
      results.H.push(H);
      results.C.push(C);
      results.Y.push(Y);
      results.u.push(u);
      
      // Update state variables (Euler method)
      if (i < steps) {
        const K_dot = Y - C - this.delta * K;
        const H_dot = this.B * u * H - this.delta_H * H;
        
        K += K_dot * dt;
        H += H_dot * dt;
      }
    }
    
    return results;
  }
}

// Example usage
const model = new HumanCapitalGrowthModel({
  A: 1.0,
  B: 0.05,
  alpha: 0.3,
  sigma: 2.0,
  rho: 0.03
});

const bgp = model.computeBGP();
console.log('Balanced Growth Path:', bgp);

const simulation = model.simulate(50, 0.1);
console.log('Transition dynamics computed');`,mathematicalAppendix:`**B.1 Existence and Uniqueness of BGP**

**Theorem:** Under the conditions $B > \\delta_H + \\rho$ and $\\sigma > 0$, there exists a unique balanced growth path.

**Proof Sketch:**
1. The optimality conditions imply a unique optimal education choice
2. This determines the human capital growth rate uniquely
3. Production function scaling ensures output and capital grow at the same rate

**B.2 Stability Analysis**

**Linearization around BGP:**
Let $\\hat{k}_t = \\log(K_t/K_t^{bgp})$ and $\\hat{h}_t = \\log(H_t/H_t^{bgp})$. The linearized system is:

$$\\begin{pmatrix} \\dot{\\hat{k}}_t \\\\ \\dot{\\hat{h}}_t \\end{pmatrix} = \\mathbf{J} \\begin{pmatrix} \\hat{k}_t \\\\ \\hat{h}_t \\end{pmatrix}$$

where $\\mathbf{J}$ is the Jacobian matrix evaluated at the BGP.

**B.3 Welfare Analysis**

**Lifetime Utility on BGP:**
$$V^{bgp} = \\int_0^{\\infty} e^{-\\rho t} \\frac{(C_0 e^{gt})^{1-\\sigma}}{1-\\sigma} dt = \\frac{C_0^{1-\\sigma}}{1-\\sigma} \\cdot \\frac{1}{\\rho - (1-\\sigma)g}$$

**Comparative Statics:**
- $\\frac{\\partial g}{\\partial B} = \\frac{1}{\\sigma} > 0$: Better education technology increases growth
- $\\frac{\\partial g}{\\partial \\rho} = -\\frac{1}{\\sigma} < 0$: More impatient agents grow slower
- $\\frac{\\partial g}{\\partial \\sigma} = -\\frac{B - \\delta_H - \\rho}{\\sigma^2} < 0$: Higher risk aversion reduces growth`}}].find(a=>a.id===p);if(!e)return t.jsx(i.div,{className:"min-h-screen pb-12 px-6 flex items-center justify-center",children:t.jsxs("div",{className:"text-center",children:[t.jsx("h1",{className:"text-2xl text-black mb-4",children:"Model Not Found"}),t.jsxs(o,{onClick:r,className:"bg-[#6A5ACD] hover:bg-[#5a4fcf] text-white",children:[t.jsx(l,{className:"w-4 h-4 mr-2"}),"Back to Stack"]})]})});const _=a=>{switch(a){case"Beginner":return"bg-green-100 text-green-700 border-green-300";case"Intermediate":return"bg-yellow-100 text-yellow-700 border-yellow-300";case"Advanced":return"bg-red-100 text-red-700 border-red-300";default:return"bg-[#e9e5ff] text-[#5a4fcf] border-[#b8a9ff]"}};return t.jsx(i.div,{className:"min-h-screen pb-12 px-6",initial:s?!1:{opacity:0,y:10},animate:s?!1:{opacity:1,y:0},transition:{duration:.3,ease:[.22,1,.36,1]},style:{willChange:s?"auto":"transform, opacity"},children:t.jsxs("div",{className:"max-w-5xl mx-auto",children:[t.jsxs(i.div,{initial:s?!1:{opacity:0,y:20},animate:s?!1:{opacity:1,y:0},transition:{duration:s?0:.4,ease:[.22,1,.36,1]},className:"mb-8",children:[t.jsxs(o,{onClick:r,variant:"ghost",className:"mb-6 text-black hover:text-[#6A5ACD]",children:[t.jsx(l,{className:"w-4 h-4 mr-2"}),"Back to Stack"]}),t.jsxs("div",{className:"flex items-start justify-between mb-6",children:[t.jsxs("div",{children:[t.jsx("h1",{className:"text-4xl text-black mb-4",children:e.title}),t.jsx("p",{className:"text-xl text-black mb-4 max-w-3xl",children:e.description}),t.jsxs("div",{className:"flex items-center space-x-4 mb-4",children:[t.jsx(h,{variant:"outline",className:_(e.difficulty),children:e.difficulty}),t.jsxs("span",{className:"text-black text-sm",children:[e.pages," pages"]}),t.jsxs("span",{className:"text-black text-sm",children:[e.downloads," downloads"]}),t.jsxs("span",{className:"text-black text-sm",children:["Updated ",e.lastUpdated]})]})]}),t.jsxs("div",{className:"flex flex-col space-y-2",children:[t.jsxs(o,{className:"bg-[#6A5ACD] hover:bg-[#5a4fcf] text-white",children:[t.jsx($,{className:"w-4 h-4 mr-2"}),"Download PDF"]}),t.jsxs(o,{variant:"outline",className:"border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]",children:[t.jsx(m,{className:"w-4 h-4 mr-2"}),"View Code"]})]})]}),t.jsx("div",{className:"flex flex-wrap gap-2",children:e.topics.map((a,n)=>t.jsx(h,{variant:"outline",className:"bg-[#f3f1ff] text-[#6A5ACD] border-[#d6ceff]",children:a},n))})]}),t.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.1},className:"mb-8 p-6 border border-[#e9e5ff] rounded-lg bg-white/50",children:[t.jsxs("div",{className:"flex items-center mb-4",children:[t.jsx(f,{className:"w-5 h-5 mr-2 text-[#6A5ACD]"}),t.jsx("h2",{className:"text-2xl text-black",children:"Introduction"})]}),t.jsx(c,{className:"text-black leading-relaxed",children:e.content.introduction})]}),e.content.sections.map((a,n)=>t.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.2+n*.1},className:"mb-8 p-6 border border-[#e9e5ff] rounded-lg bg-white/50",children:[t.jsxs("h2",{className:"text-2xl text-black mb-4 flex items-center",children:[t.jsx(g,{className:"w-5 h-5 mr-2 text-[#6A5ACD]"}),a.title]}),t.jsx(c,{className:"text-black leading-relaxed whitespace-pre-line",children:a.content})]},n)),t.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.6},className:"mb-8 p-6 border border-[#e9e5ff] rounded-lg bg-white/50",children:[t.jsxs("h2",{className:"text-2xl text-black mb-4 flex items-center",children:[t.jsx(m,{className:"w-5 h-5 mr-2 text-[#6A5ACD]"}),"Implementation Example"]}),t.jsx("div",{className:"bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto",children:t.jsx("pre",{children:e.content.codeExample})})]}),t.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.7},className:"mb-8 p-6 border border-[#e9e5ff] rounded-lg bg-white/50",children:[t.jsxs("h2",{className:"text-2xl text-black mb-4 flex items-center",children:[t.jsx(x,{className:"w-5 h-5 mr-2 text-[#6A5ACD]"}),"Mathematical Appendix"]}),t.jsx(c,{className:"text-black leading-relaxed whitespace-pre-line",children:e.content.mathematicalAppendix})]}),t.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.8},className:"flex justify-between items-center pt-8 border-t border-[#d6ceff]",children:[t.jsxs(o,{onClick:r,variant:"outline",className:"border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]",children:[t.jsx(l,{className:"w-4 h-4 mr-2"}),"Back to Stack"]}),t.jsxs("div",{className:"flex space-x-2",children:[t.jsx(o,{className:"bg-[#6A5ACD] hover:bg-[#5a4fcf] text-white",children:"Next Model"}),t.jsx(o,{variant:"outline",className:"border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]",children:"Related Models"})]})]})]})})}export{K as StackModelPage};
