# DAD - Development Accelerator Documents

AI-assisted development system for Claude Code, Cursor, and other AI coding assistants.

## 🚀 Quick Start

### Install globally (recommended)
```bash
# Install once, use anywhere
npm install -g dad

# Initialize in any project
dad init
```

### Or directly use npx
```bash
# Always uses latest version
npx dad@latest init
```

This will:
1. Create a `.dad` folder with structured documentation templates
2. Optionally set up integrations for Claude Code and/or Cursor
3. Configure your project for AI-assisted development

## 🎯 What is DAD?

DAD (Development Accelerator Documents) provides AI assistants with comprehensive, structured context about your project to enable fast, accurate, and consistent development assistance.

### Key Features

- **Structured Documentation**: Organized templates for product vision, technical standards, and task specifications
- **AI Integration**: Native support for Claude Code, Cursor, and other AI assistants
- **Workflow Commands**: Predefined commands for common development tasks
- **Living Documentation**: Evolves with your project as it grows

## 📁 Structure

After installation, DAD creates the following structure:

```
.dad/
├── product/        # Product vision, roadmap, decisions
├── standards/      # Coding conventions, best practices
├── instructions/   # AI workflow commands
├── tasks/         # Task specifications
└── context/       # Project-specific patterns
```

## 🤖 AI Commands

Use these commands with your AI assistant:

- `plan-product` - Initialize DAD for a new project
- `analyze-product` - Install DAD in existing codebase
- `plan-task` - Create detailed feature specifications
- `execute-task` - Implement features systematically

## 🔧 Configuration

### Claude Code Integration
```bash
npx dad init --claude
```

Adds:
- `.claude/` folder with custom commands
- Optimized settings for Claude Code
- Task-specific agents

### Cursor Integration
```bash
npx dad init --cursor
```

Adds:
- `.cursor/` folder configuration
- `.cursorignore` for context optimization
- Cursor-specific workflows

## 📚 Documentation

Full documentation available at: https://github.com/jessekaff/dad

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📄 License

ISC License - see LICENSE file for details
