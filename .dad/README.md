# Development Accelerator Documentation (DAD)

> **Status**: Ready for Configuration
> **Initialize with**: `plan-product` or `analyze-product` command

The **Development Accelerator Documentation (DAD)** system provides AI assistants with comprehensive, structured context about your project to enable fast, accurate, and consistent development assistance.

## 🚀 Quick Start

**This DAD installation is ready to be configured for your project.**

### For New Projects:
```
Tell your AI: "Run plan-product"
```

### For Existing Projects:
```
Tell your AI: "Run analyze-product"
```

The AI will ask you about your project and populate all the documentation below.

## 🎯 How to Use DAD

### Available Commands

DAD provides structured workflows for different stages of development. Use these commands with your AI assistant:

#### **`plan-product`**

Initialize DAD for a brand new project from scratch.

- **When to use**: Starting a new project with no existing code
- **What it does**: Creates comprehensive product documentation
- **Outputs**:
  - Product mission and vision
  - Technology stack decisions
  - Development roadmap
  - Decision log

#### **`analyze-product`**

Install DAD into an existing codebase.

- **When to use**: Adding DAD to a project that already has code
- **What it does**: Analyzes your codebase and creates tailored documentation
- **Outputs**: Same as plan-product, but customized to reflect existing implementation

#### **`plan-task`**

Plan a detailed specification for a new feature.

- **When to use**: Before implementing any new feature or major functionality
- **What it does**: Creates comprehensive requirements and technical specifications based off DAD
- **Outputs**:
  - Feature specification with user stories
  - Technical implementation details
  - Database/API specs (if needed)
  - Task breakdown for implementation

#### **`execute-task`**

Implement a complete task with all its subtasks.

- **When to use**: After running plan-task and you're ready to build
- **What it does**: Systematically implements a task and all its subtasks from a specification
- **Outputs**:
  - Complete task implementation
  - Passing tests
  - Git commits and PR (optional)

#### **`execute-subtask`**

Implement subtasks for a parent task.

- **When to use**: For targeted implementation of specific subtasks
- **What it does**: Executes subtasks with TDD approach
- **Note**: Usually called automatically by execute-task

### Typical Workflow

1. **New Project**: Run `plan-product` to establish foundation
2. **Existing Project**: Run `analyze-product` to install DAD
3. **New Feature**: Run `plan-task` to create specification
4. **Build Feature**: Run `execute-task` to implement everything

### Example Usage

```bash
# Planning a new feature
"Run plan-task for user authentication system"
# AI creates detailed spec with tasks

# Building the feature
"Run execute-task for the user authentication spec"
# AI implements everything systematically
```

## 📁 DAD Structure

Your DAD documentation lives in the `.dad/` directory:

- **`product/`** - Product vision, roadmap, and decisions
- **`standards/`** - Coding conventions and best practices
- **`instructions/`** - Workflow commands and procedures
- **`tasks/`** - Task specifications (created by plan-task)
- **`context/`** - Project-specific context and patterns

## 🔄 Maintaining DAD

DAD is a living system that evolves with your project:

### Update Product Context When:

- Product vision changes
- New features are planned
- Technical decisions are made

### Refine Standards When:

- Code patterns emerge
- Style preferences evolve
- New technologies are adopted

### Review Specs After:

- Features are completed
- Requirements change
- Lessons are learned

## 💡 Best Practices

1. **Plan Before Building**: Always run `plan-task` before `execute-tasks`
2. **Keep Context Current**: Update DAD files as decisions are made
3. **Be Specific**: Include concrete examples in your documentation
4. **Follow the System**: Let DAD guide consistent development

## 🤖 For AI Assistants

### Context Loading Strategy

1. Start with `.dad/product/mission-lite.md` for project overview
2. Load relevant standards from `.dad/standards/`
3. Follow instructions in `.dad/instructions/core/`
4. Reference specs in `.dad/specs/` for feature details

### Key Principles

- **Context-Aware**: Check if information is already loaded before re-reading
- **Task-Specific**: Load only relevant DAD sections for current task
- **Standards-First**: Apply project conventions consistently
- **Improvement Loop**: Analyze and suggest DAD improvements after tasks

---

**Remember**: DAD ensures every line of code aligns with your product vision and technical standards. Keep it updated, and it will accelerate your development.
