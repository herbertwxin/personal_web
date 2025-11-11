interface LaTeXRendererProps {
  content: string
  displayMode?: boolean
  className?: string
}

// Enhanced LaTeX-like formatter for mathematical expressions
function formatMath(content: string): string {
  return (
    content
      // Handle line breaks in equations
      .replace(/\\\\/g, '\n')
      // Handle alignment characters (just remove them for now)
      .replace(/&/g, ' ')
      // Greek letters (single backslash)
      .replace(/\\alpha\b/g, 'α')
      .replace(/\\beta\b/g, 'β')
      .replace(/\\gamma\b/g, 'γ')
      .replace(/\\delta\b/g, 'δ')
      .replace(/\\epsilon\b/g, 'ε')
      .replace(/\\varepsilon\b/g, 'ε')
      .replace(/\\zeta\b/g, 'ζ')
      .replace(/\\eta\b/g, 'η')
      .replace(/\\theta\b/g, 'θ')
      .replace(/\\vartheta\b/g, 'ϑ')
      .replace(/\\iota\b/g, 'ι')
      .replace(/\\kappa\b/g, 'κ')
      .replace(/\\lambda\b/g, 'λ')
      .replace(/\\mu\b/g, 'μ')
      .replace(/\\nu\b/g, 'ν')
      .replace(/\\xi\b/g, 'ξ')
      .replace(/\\pi\b/g, 'π')
      .replace(/\\varpi\b/g, 'ϖ')
      .replace(/\\rho\b/g, 'ρ')
      .replace(/\\varrho\b/g, 'ϱ')
      .replace(/\\sigma\b/g, 'σ')
      .replace(/\\varsigma\b/g, 'ς')
      .replace(/\\tau\b/g, 'τ')
      .replace(/\\upsilon\b/g, 'υ')
      .replace(/\\phi\b/g, 'φ')
      .replace(/\\varphi\b/g, 'ϕ')
      .replace(/\\chi\b/g, 'χ')
      .replace(/\\psi\b/g, 'ψ')
      .replace(/\\omega\b/g, 'ω')
      
      // Capital Greek letters
      .replace(/\\Gamma\b/g, 'Γ')
      .replace(/\\Delta\b/g, 'Δ')
      .replace(/\\Theta\b/g, 'Θ')
      .replace(/\\Lambda\b/g, 'Λ')
      .replace(/\\Xi\b/g, 'Ξ')
      .replace(/\\Pi\b/g, 'Π')
      .replace(/\\Sigma\b/g, 'Σ')
      .replace(/\\Upsilon\b/g, 'Υ')
      .replace(/\\Phi\b/g, 'Φ')
      .replace(/\\Chi\b/g, 'Χ')
      .replace(/\\Psi\b/g, 'Ψ')
      .replace(/\\Omega\b/g, 'Ω')
      
      // Math operators and symbols
      .replace(/\\sum\b/g, '∑')
      .replace(/\\prod\b/g, '∏')
      .replace(/\\int\b/g, '∫')
      .replace(/\\oint\b/g, '∮')
      .replace(/\\partial\b/g, '∂')
      .replace(/\\nabla\b/g, '∇')
      .replace(/\\infty\b/g, '∞')
      .replace(/\\leq\b/g, '≤')
      .replace(/\\geq\b/g, '≥')
      .replace(/\\neq\b/g, '≠')
      .replace(/\\approx\b/g, '≈')
      .replace(/\\equiv\b/g, '≡')
      .replace(/\\propto\b/g, '∝')
      .replace(/\\in\b/g, '∈')
      .replace(/\\notin\b/g, '∉')
      .replace(/\\subset\b/g, '⊂')
      .replace(/\\subseteq\b/g, '⊆')
      .replace(/\\supset\b/g, '⊃')
      .replace(/\\supseteq\b/g, '⊇')
      .replace(/\\cup\b/g, '∪')
      .replace(/\\cap\b/g, '∩')
      .replace(/\\emptyset\b/g, '∅')
      .replace(/\\forall\b/g, '∀')
      .replace(/\\exists\b/g, '∃')
      .replace(/\\neg\b/g, '¬')
      .replace(/\\land\b/g, '∧')
      .replace(/\\lor\b/g, '∨')
      .replace(/\\to\b/g, '→')
      .replace(/\\rightarrow\b/g, '→')
      .replace(/\\leftarrow\b/g, '←')
      .replace(/\\leftrightarrow\b/g, '↔')
      .replace(/\\Rightarrow\b/g, '⇒')
      .replace(/\\Leftarrow\b/g, '⇐')
      .replace(/\\Leftrightarrow\b/g, '⇔')
      .replace(/\\implies\b/g, '⇒')
      .replace(/\\iff\b/g, '⇔')
      
      // Additional math symbols
      .replace(/\\pm\b/g, '±')
      .replace(/\\mp\b/g, '∓')
      .replace(/\\times\b/g, '×')
      .replace(/\\div\b/g, '÷')
      .replace(/\\cdot\b/g, '⋅')
      .replace(/\\bullet\b/g, '•')
      .replace(/\\circ\b/g, '∘')
      .replace(/\\oplus\b/g, '⊕')
      .replace(/\\ominus\b/g, '⊖')
      .replace(/\\otimes\b/g, '⊗')
      .replace(/\\oslash\b/g, '⊘')
      
      // Dots
      .replace(/\\ldots\b/g, '…')
      .replace(/\\cdots\b/g, '⋯')
      .replace(/\\ddots\b/g, '⋱')
      .replace(/\\vdots\b/g, '⋮')
      
      // Math functions
      .replace(/\\operatorname\{([^}]+)\}/g, '$1')
      .replace(/\\max\b/g, 'max')
      .replace(/\\min\b/g, 'min')
      .replace(/\\arg\b/g, 'arg')
      .replace(/\\sup\b/g, 'sup')
      .replace(/\\inf\b/g, 'inf')
      .replace(/\\lim\b/g, 'lim')
      .replace(/\\sin\b/g, 'sin')
      .replace(/\\cos\b/g, 'cos')
      .replace(/\\tan\b/g, 'tan')
      .replace(/\\sec\b/g, 'sec')
      .replace(/\\csc\b/g, 'csc')
      .replace(/\\cot\b/g, 'cot')
      .replace(/\\exp\b/g, 'exp')
      .replace(/\\log\b/g, 'log')
      .replace(/\\ln\b/g, 'ln')
      .replace(/\\det\b/g, 'det')
      .replace(/\\dim\b/g, 'dim')
      .replace(/\\ker\b/g, 'ker')
      .replace(/\\gcd\b/g, 'gcd')
      
      // Expected value and probability
      .replace(/\\mathbb\{E\}/g, '𝔼')
      .replace(/\\mathbb\{P\}/g, 'ℙ')
      .replace(/\\mathbb\{R\}/g, 'ℝ')
      .replace(/\\mathbb\{N\}/g, 'ℕ')
      .replace(/\\mathbb\{Z\}/g, 'ℤ')
      .replace(/\\mathbb\{Q\}/g, 'ℚ')
      .replace(/\\mathbb\{C\}/g, 'ℂ')
      
      // Fractions - enhanced handling
      .replace(/\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, '($1)/($2)')
      
      // Superscripts and subscripts with better handling
      .replace(/_\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, (_, content) => {
        return '₍' + convertToSubscript(content) + '₎'
      })
      .replace(/\^\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, (_, content) => {
        return '⁽' + convertToSuperscript(content) + '⁾'
      })
      .replace(/_([a-zA-Z0-9])/g, '₍$1₎')
      .replace(/\^([a-zA-Z0-9])/g, '⁽$1⁾')
      
      // Square roots
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      
      // Matrices and arrays - better handling
      .replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, (_, content) => {
        return '(' + content.replace(/\\\\/g, '; ').replace(/&/g, ', ') + ')'
      })
      .replace(/\\begin\{bmatrix\}([\s\S]*?)\\end\{bmatrix\}/g, (_, content) => {
        return '[' + content.replace(/\\\\/g, '; ').replace(/&/g, ', ') + ']'
      })
      .replace(/\\begin\{matrix\}([\s\S]*?)\\end\{matrix\}/g, (_, content) => {
        return content.replace(/\\\\/g, '; ').replace(/&/g, ', ')
      })
      
      // Clean up spacing and remaining LaTeX commands
      .replace(/\\quad/g, '  ')
      .replace(/\\qquad/g, '    ')
      .replace(/\\,/g, ' ')
      .replace(/\\;/g, ' ')
      .replace(/\\!/g, '')
      .replace(/\\:/g, ' ')
      .replace(/\\ /g, ' ')
      
      // Remove remaining backslashes and clean up
      .replace(/\\([a-zA-Z]+)/g, '$1')
      .replace(/\\\\/g, '')
      .replace(/\{([^{}]*)\}/g, '$1')
  )
}

// Helper functions for subscript/superscript conversion
function convertToSubscript(text: string): string {
  return text
    .replace(/0/g, '₀').replace(/1/g, '₁').replace(/2/g, '₂')
    .replace(/3/g, '₃').replace(/4/g, '₄').replace(/5/g, '₅')
    .replace(/6/g, '₆').replace(/7/g, '₇').replace(/8/g, '₈')
    .replace(/9/g, '₉').replace(/\+/g, '₊').replace(/-/g, '₋')
    .replace(/=/g, '₌').replace(/\(/g, '₍').replace(/\)/g, '₎')
}

function convertToSuperscript(text: string): string {
  return text
    .replace(/0/g, '⁰').replace(/1/g, '¹').replace(/2/g, '²')
    .replace(/3/g, '³').replace(/4/g, '⁴').replace(/5/g, '⁵')
    .replace(/6/g, '⁶').replace(/7/g, '⁷').replace(/8/g, '⁸')
    .replace(/9/g, '⁹').replace(/\+/g, '⁺').replace(/-/g, '⁻')
    .replace(/=/g, '⁼').replace(/\(/g, '⁽').replace(/\)/g, '⁾')
}

export function LaTeXRenderer({
  content,
  displayMode = false,
  className = '',
}: LaTeXRendererProps) {
  const formattedContent = formatMath(content)

  return (
    <span
      className={`${className} ${displayMode ? 'block my-6 text-lg font-serif' : 'inline font-serif'}`}
      style={{
        fontStyle: 'italic',
        fontSize: displayMode ? '1.1em' : 'inherit',
        lineHeight: displayMode ? '1.6' : 'inherit',
      }}
    >
      <div className={displayMode ? 'bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200' : 'inline'}>
        {displayMode ? (
          formattedContent.split('\n').map((line, index) => (
            <div key={index} className="mb-2">
              {line}
            </div>
          ))
        ) : (
          formattedContent
        )}
      </div>
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
              className='text-[#B19EEF] hover:underline'
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
  // More robust math detection
  let processedContent = children
  const mathParts: { type: 'display' | 'inline', content: string, placeholder: string }[] = []
  
  // First, handle \begin{align} environments
  processedContent = processedContent.replace(/\\begin\{align\}([\s\S]*?)\\end\{align\}/g, (_, content) => {
    const placeholder = `__DISPLAY_MATH_${mathParts.length}__`
    mathParts.push({ type: 'display', content: content.trim(), placeholder })
    return placeholder
  })
  
  // Handle \subsection{} commands
  processedContent = processedContent.replace(/\\subsection\{([^}]+)\}/g, (_, title) => {
    return `\n### ${title}\n`
  })
  
  // Then, extract and replace display math ($$...$$)
  processedContent = processedContent.replace(/\$\$([\s\S]*?)\$\$/g, (_, content) => {
    const placeholder = `__DISPLAY_MATH_${mathParts.length}__`
    mathParts.push({ type: 'display', content: content.trim(), placeholder })
    return placeholder
  })
  
  // Then extract and replace inline math ($...$)
  processedContent = processedContent.replace(/\$([^$\n]+)\$/g, (_, content) => {
    const placeholder = `__INLINE_MATH_${mathParts.length}__`
    mathParts.push({ type: 'inline', content: content.trim(), placeholder })
    return placeholder
  })
  
  // Split by placeholders
  const parts = processedContent.split(/(__(?:DISPLAY|INLINE)_MATH_\d+__)/)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this part is a math placeholder
        const mathMatch = part.match(/__(?:DISPLAY|INLINE)_MATH_(\d+)__/)
        if (mathMatch) {
          const mathIndex = parseInt(mathMatch[1])
          const mathPart = mathParts[mathIndex]
          if (mathPart) {
            if (mathPart.type === 'display') {
              return <DisplayMath key={index}>{mathPart.content}</DisplayMath>
            } else {
              return <InlineMath key={index}>{mathPart.content}</InlineMath>
            }
          }
        }
        
        // Regular text - split into lines and process markdown formatting
        const lines = part.split('\n')
        return (
          <div key={index}>
            {lines.map((line, lineIndex) => {
              // Check for headers
              if (line.startsWith('### ')) {
                return (
                  <h3 key={lineIndex} className="text-xl font-medium mt-6 mb-4 text-black">
                    {line.substring(4)}
                  </h3>
                )
              } else if (line.trim() === '') {
                return <br key={lineIndex} />
              } else {
                return <span key={lineIndex}>{processInlineMarkdown(line)}</span>
              }
            })}
          </div>
        )
      })}
    </span>
  )
}