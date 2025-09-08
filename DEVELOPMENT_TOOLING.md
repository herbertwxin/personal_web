# Development Tooling Guide

This document outlines the development tooling and quality assurance setup for the project.

## Overview

The project uses a comprehensive development tooling setup including:

- **ESLint** for code quality and consistency
- **Prettier** for code formatting
- **TypeScript** with strict mode for type safety
- **Development scripts** for automated quality checks

## ESLint Configuration

### Features
- TypeScript-aware linting with type information
- React and React Hooks specific rules
- Code quality rules (prefer-const, no-var, object-shorthand, etc.)
- Automatic fixing for many issues

### Usage
```bash
# Run linting
npm run lint

# Run linting with auto-fix
npm run lint:fix
```

### Key Rules
- `@typescript-eslint/no-unused-vars`: Prevents unused variables
- `@typescript-eslint/prefer-optional-chain`: Enforces optional chaining
- `react-hooks/exhaustive-deps`: Ensures proper dependency arrays
- `no-console`: Warns about console statements (useful for production)
- `prefer-template`: Enforces template literals over string concatenation

## Prettier Configuration

### Features
- Consistent code formatting across the entire codebase
- Configured for modern JavaScript/TypeScript standards
- Integrates with ESLint to avoid conflicts

### Usage
```bash
# Check formatting
npm run format:check

# Apply formatting
npm run format
```

### Configuration
- Single quotes for strings
- No semicolons
- 80 character line width
- 2 space indentation
- Trailing commas in ES5-compatible locations

## TypeScript Configuration

### Standard Mode (`tsconfig.app.json`)
- Strict mode enabled
- Modern ES2020 target
- Path mapping for clean imports
- Comprehensive type checking

### Strict Mode (`tsconfig.strict.json`)
- Additional strict options for enhanced type safety
- `exactOptionalPropertyTypes`: Requires exact optional property types
- `noImplicitReturns`: Ensures all code paths return values
- `noPropertyAccessFromIndexSignature`: Prevents unsafe property access
- `noUncheckedIndexedAccess`: Adds undefined to indexed access types

### Usage
```bash
# Standard type checking
npm run type-check

# Strict type checking
npm run type-check:strict
```

## Development Scripts

### Quality Assurance Scripts
```bash
# Run all quality checks
npm run quality

# Run all quality checks with auto-fix
npm run quality:fix

# Run strict quality checks
npm run quality:strict

# CI-friendly quality check
npm run quality:ci

# Pre-commit hook (auto-fix and check)
npm run pre-commit
```

### Individual Scripts
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking only
npm run type-check

# Linting only
npm run lint

# Formatting only
npm run format
```

## Recommended Workflow

### During Development
1. Use `npm run dev` to start the development server
2. Run `npm run quality:fix` before committing changes
3. Use `npm run type-check:strict` periodically to catch type issues early

### Before Committing
```bash
# Recommended pre-commit workflow
npm run pre-commit
```

This will:
1. Run TypeScript type checking
2. Fix linting issues automatically
3. Format code consistently

### CI/CD Integration
```bash
# For continuous integration
npm run quality:ci
```

This runs all checks without auto-fixing, suitable for CI environments.

## IDE Integration

### VS Code
The project includes VS Code configuration for optimal development experience:
- ESLint extension integration
- Prettier extension integration
- TypeScript language server
- Automatic formatting on save (recommended)

### Recommended Extensions
- ESLint
- Prettier - Code formatter
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

## Troubleshooting

### Common Issues

#### ESLint Errors
- **Type information errors**: Ensure `parserOptions.project` is correctly configured
- **Import resolution**: Check TypeScript path mapping in `tsconfig.app.json`

#### TypeScript Errors
- **Strict mode issues**: Use `npm run type-check` first, then `npm run type-check:strict`
- **Path mapping**: Ensure imports use the configured path aliases

#### Prettier Conflicts
- **ESLint vs Prettier**: The configuration is designed to avoid conflicts
- **File not formatted**: Check if the file type is included in Prettier configuration

### Performance Tips
- Use `npm run lint:fix` instead of manual fixes
- Run `npm run type-check` frequently during development
- Use IDE integration for real-time feedback

## Configuration Files

- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier configuration  
- `.prettierignore` - Files to ignore for formatting
- `tsconfig.app.json` - Main TypeScript configuration
- `tsconfig.strict.json` - Strict TypeScript configuration
- `tsconfig.node.json` - Node.js specific TypeScript configuration

## Best Practices

1. **Always run quality checks before committing**
2. **Use TypeScript strict mode for new code**
3. **Fix linting warnings, don't just ignore them**
4. **Keep console statements out of production code**
5. **Use proper TypeScript types instead of `any`**
6. **Follow the established code formatting rules**
7. **Use the provided development scripts consistently**

## Future Enhancements

Potential improvements to consider:
- Husky for git hooks automation
- Lint-staged for pre-commit linting
- Jest for unit testing integration
- Commitlint for conventional commits
- Bundle analyzer integration