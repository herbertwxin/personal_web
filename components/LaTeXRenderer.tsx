interface LaTeXRendererProps {
  content: string
  displayMode?: boolean
  className?: string
}

// Simple LaTeX-like formatter without external dependencies
function formatMath(content: string): string {
  return (
    content
      // Greek letters
      .replace(/\\\\alpha/g, 'α')
      .replace(/\\\\beta/g, 'β')
      .replace(/\\\\gamma/g, 'γ')
      .replace(/\\\\delta/g, 'δ')
      .replace(/\\\\epsilon/g, 'ε')
      .replace(/\\\\zeta/g, 'ζ')
      .replace(/\\\\eta/g, 'η')
      .replace(/\\\\theta/g, 'θ')
      .replace(/\\\\iota/g, 'ι')
      .replace(/\\\\kappa/g, 'κ')
      .replace(/\\\\lambda/g, 'λ')
      .replace(/\\\\mu/g, 'μ')
      .replace(/\\\\nu/g, 'ν')
      .replace(/\\\\xi/g, 'ξ')
      .replace(/\\\\pi/g, 'π')
      .replace(/\\\\rho/g, 'ρ')
      .replace(/\\\\sigma/g, 'σ')
      .replace(/\\\\tau/g, 'τ')
      .replace(/\\\\phi/g, 'φ')
      .replace(/\\\\chi/g, 'χ')
      .replace(/\\\\psi/g, 'ψ')
      .replace(/\\\\omega/g, 'ω')
      // Capital Greek letters
      .replace(/\\\\Gamma/g, 'Γ')
      .replace(/\\\\Delta/g, 'Δ')
      .replace(/\\\\Theta/g, 'Θ')
      .replace(/\\\\Lambda/g, 'Λ')
      .replace(/\\\\Xi/g, 'Ξ')
      .replace(/\\\\Pi/g, 'Π')
      .replace(/\\\\Sigma/g, 'Σ')
      .replace(/\\\\Phi/g, 'Φ')
      .replace(/\\\\Psi/g, 'Ψ')
      .replace(/\\\\Omega/g, 'Ω')
      // Math operators
      .replace(/\\\\sum/g, '∑')
      .replace(/\\\\prod/g, '∏')
      .replace(/\\\\int/g, '∫')
      .replace(/\\\\partial/g, '∂')
      .replace(/\\\\nabla/g, '∇')
      .replace(/\\\\infty/g, '∞')
      .replace(/\\\\leq/g, '≤')
      .replace(/\\\\geq/g, '≥')
      .replace(/\\\\neq/g, '≠')
      .replace(/\\\\approx/g, '≈')
      .replace(/\\\\equiv/g, '≡')
      .replace(/\\\\propto/g, '∝')
      .replace(/\\\\in/g, '∈')
      .replace(/\\\\subset/g, '⊂')
      .replace(/\\\\subseteq/g, '⊆')
      .replace(/\\\\cup/g, '∪')
      .replace(/\\\\cap/g, '∩')
      .replace(/\\\\emptyset/g, '∅')
      .replace(/\\\\forall/g, '∀')
      .replace(/\\\\exists/g, '∃')
      .replace(/\\\\neg/g, '¬')
      .replace(/\\\\land/g, '∧')
      .replace(/\\\\lor/g, '∨')
      .replace(/\\\\to/g, '→')
      .replace(/\\\\Rightarrow/g, '⇒')
      .replace(/\\\\Leftarrow/g, '⇐')
      .replace(/\\\\Leftrightarrow/g, '⇔')
      // Math functions with operatorname
      .replace(/\\\\operatorname\{([^}]+)\}/g, '$1')
      .replace(/\\\\max/g, 'max')
      .replace(/\\\\min/g, 'min')
      .replace(/\\\\arg/g, 'arg')
      .replace(/\\\\sup/g, 'sup')
      .replace(/\\\\inf/g, 'inf')
      .replace(/\\\\lim/g, 'lim')
      .replace(/\\\\sin/g, 'sin')
      .replace(/\\\\cos/g, 'cos')
      .replace(/\\\\tan/g, 'tan')
      .replace(/\\\\exp/g, 'exp')
      .replace(/\\\\log/g, 'log')
      .replace(/\\\\ln/g, 'ln')
      // Expected value and other common operators
      .replace(/E_t/g, 'E₍ₜ₎')
      .replace(/E_0/g, 'E₍₀₎')
      // Dots
      .replace(/\\\\ldots/g, '...')
      .replace(/\\\\cdots/g, '⋯')
      .replace(/\\\\ddots/g, '⋱')
      .replace(/\\\\vdots/g, '⋮')
      // Fractions - simple replacement
      .replace(/\\\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
      // Matrices and arrays - simplified
      .replace(/\\\\begin\{[^}]*\}/g, '[')
      .replace(/\\\\end\{[^}]*\}/g, ']')
      .replace(/\\\\\\\\/g, '; ') // Line breaks in matrices
      .replace(/&/g, ', ') // Column separators
      // Superscripts and subscripts - handle both braced and single character
      .replace(/\\\\_\{([^}]+)\}/g, '₍$1₎')
      .replace(/\\\\\^\{([^}]+)\}/g, '⁽$1⁾')
      .replace(/\\\\_([a-zA-Z0-9])/g, '₍$1₎')
      .replace(/\\\\\^([a-zA-Z0-9])/g, '⁽$1⁾')
      // Clean up remaining backslashes and braces
      .replace(/\\\\([a-zA-Z]+)/g, '$1')
      .replace(/\\\\/g, '')
      .replace(/[{}]/g, '')
  )
}

export function LaTeXRenderer({
  content,
  displayMode = false,
  className = '',
}: LaTeXRendererProps) {
  const formattedContent = formatMath(content)

  return (
    <span
      className={`${className} ${displayMode ? 'block text-center my-4 text-lg' : 'inline'}`}
      style={{
        fontFamily: displayMode ? 'serif' : 'inherit',
        fontStyle: 'italic',
        fontSize: displayMode ? '1.1em' : 'inherit',
      }}
    >
      {formattedContent}
    </span>
  )
}

// Helper component for inline math
export function InlineMath({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <LaTeXRenderer
      content={children}
      displayMode={false}
      className={`inline ${className}`}
    />
  )
}

// Helper component for display math
export function DisplayMath({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <LaTeXRenderer
      content={children}
      displayMode={true}
      className={`block my-4 text-center ${className}`}
    />
  )
}

// Helper function to process inline markdown formatting
function processInlineMarkdown(text: string): JSX.Element[] {
  const parts = text.split(
    /(\*\*.*?\*\*|\*[^*]*?\*|`[^`]*?`|\[[^\]]*?\]\([^)]*?\))/g
  )

  return parts
    .map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>
      } else if (
        part.startsWith('*') &&
        part.endsWith('*') &&
        !part.startsWith('**')
      ) {
        return <em key={idx}>{part.slice(1, -1)}</em>
      } else if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className='bg-gray-100 px-1 rounded text-sm font-mono'
          >
            {part.slice(1, -1)}
          </code>
        )
      } else if (part.match(/\[.*?\]\(.*?\)/)) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/)
        if (match) {
          return (
            <a
              key={idx}
              href={match[2]}
              className='text-[#6A5ACD] hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              {match[1]}
            </a>
          )
        }
      }

      // Split by newlines for line breaks
      return part.split('\n').map((line, lineIndex, array) => (
        <span key={`${idx}-${lineIndex}`}>
          {line}
          {lineIndex < array.length - 1 && <br />}
        </span>
      ))
    })
    .flat()
}

// Component to process text with LaTeX expressions
export function ProcessedText({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  const parts = children.split(
    /(\$\$[\s\S]*?\$\$|\$[^$\n][^$]*?[^$\n]\$|\$[^$\n]\$)/
  )

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          // Display math
          const mathContent = part.slice(2, -2)
          return <DisplayMath key={index}>{mathContent}</DisplayMath>
        } else if (part.startsWith(') && part.endsWith(') && part.length > 2) {
          // Inline math
          const mathContent = part.slice(1, -1)
          return <InlineMath key={index}>{mathContent}</InlineMath>
        } else {
          // Regular text - process markdown formatting
          return <span key={index}>{processInlineMarkdown(part)}</span>
        }
      })}
    </span>
  )
}
