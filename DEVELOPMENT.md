# Development Guide

This document outlines the development tooling and quality assurance setup for this project.

## Development Tools

### ESLint Configuration

- **File**: `eslint.config.js`
- **Purpose**: Code quality and consistency enforcement
- **Features**:
  - TypeScript support with recommended rules
  - React Hooks linting
  - React Refresh compatibility checks
  - Custom rules for code quality

### Prettier Configuration

- **File**: `.prettierrc`
- **Purpose**: Consistent code formatting
- **Settings**:
  - Single quotes for strings
  - No semicolons
  - 2-space indentation
  - 80 character line width
  - Trailing commas in ES5 contexts

### TypeScript Configuration

- **Main Config**: `tsconfig.app.json`
- **Strict Config**: `tsconfig.strict.json`
- **Features**:
  - Strict mode enabled
  - Path mapping for clean imports
  - Additional strict options available in separate config

## Available Scripts

### Linting

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix auto-fixable linting errors
```

### Formatting

```bash
npm run format        # Format all files with Prettier
npm run format:check  # Check if files are properly formatted
```

### Type Checking

```bash
npm run type-check         # Standard TypeScript checking
npm run type-check:strict  # Strict TypeScript checking with all rules
```

### Quality Assurance

```bash
npm run quality      # Run type-check + lint + format:check
npm run quality:fix  # Run type-check + lint:fix + format
npm run quality:strict # Run strict type-check + lint + format:check
```

## Development Workflow

### Before Committing

1. Run `npm run quality:fix` to fix auto-fixable issues
2. Address any remaining linting or type errors
3. Ensure all tests pass

### Code Quality Standards

- All TypeScript code must pass type checking
- ESLint rules must be followed (warnings are acceptable, errors are not)
- Code must be formatted with Prettier
- Console statements should be avoided in production code

### Gradual Strict Mode Adoption

The project uses a gradual approach to TypeScript strict mode:

- Basic strict mode is enabled by default
- Additional strict options are available in `tsconfig.strict.json`
- Use `npm run quality:strict` to check against all strict rules
- Gradually enable strict options in main config as code is improved

## IDE Integration

### VS Code

Recommended extensions:

- ESLint
- Prettier - Code formatter
- TypeScript Importer

### Settings

Add to your VS Code settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "on"
}
```

## Troubleshooting

### Common Issues

1. **ESLint errors**: Run `npm run lint:fix` to auto-fix many issues
2. **Formatting issues**: Run `npm run format` to fix formatting
3. **Type errors**: Check `tsconfig.app.json` settings and fix type issues
4. **Import errors**: Ensure proper path mapping in TypeScript config

### Performance

- ESLint and Prettier are configured to ignore build outputs and dependencies
- Type checking uses incremental compilation for faster subsequent runs
- Use `npm run quality` for comprehensive checks before commits
