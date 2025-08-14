# Standards Directory

> **Purpose**: Define and maintain your project's development standards
> **Status**: Generic framework ready for customization

## About This Directory

The standards directory contains guidelines that ensure consistent, high-quality development across your project. These files serve as reference documents for both human developers and AI assistants.

## Current Standards Files

### 📋 **best-practices.md**
Universal development principles that apply to most projects.
- Code organization
- Testing strategy
- Performance guidelines
- Security basics

### 🏗️ **tech-stack.md** 
Your project-specific technology stack and architecture guidelines.
- Framework choices and patterns
- Development tools setup
- Deployment standards
- Integration approaches

### 🧪 **testing-guidelines.md**
Testing strategy and implementation patterns.
- Testing pyramid approach
- Tool-specific guidelines
- Coverage requirements
- CI/CD integration

## Organizing Your Standards

### Recommended Structure

As your project grows, consider adding:

```
standards/
├── README.md                    # This file
├── best-practices.md           # Universal principles
├── tech-stack.md              # Architecture guidelines
├── testing-guidelines.md      # Testing practices
├── style-guide.md            # Formatting and naming conventions (optional)
├── security.md               # Security requirements
├── performance.md            # Performance standards
├── accessibility.md          # A11y guidelines
└── frameworks/               # Framework-specific standards
    ├── react-patterns.md
    ├── api-design.md
    └── database-schema.md
```

### When to Create New Standards Files

Create new standard files for:
- **Framework-Specific Patterns**: React hooks, Vue composition, Django models
- **Domain-Specific Guidelines**: API design, database schema, UI/UX patterns
- **Team Processes**: Code review checklist, deployment procedures
- **Compliance Requirements**: Security standards, accessibility requirements

## Writing Effective Standards

### Standards Should Be:

#### ✅ **Actionable**
```markdown
# Good
- Use TypeScript strict mode for all new files
- Write tests for all public API endpoints

# Bad  
- Code should be good
- Try to test things
```

#### ✅ **Specific to Your Context**
```markdown
# Good
- Use React Query for API state management
- Store images in Cloudflare R2 with automatic optimization

# Bad
- Use a state management library
- Store files somewhere
```

#### ✅ **Justifiable**
```markdown
# Good
## Why We Use TypeScript
- Catches errors at compile time
- Improves IDE autocompletion
- Makes refactoring safer

# Bad
## TypeScript
Use TypeScript.
```

#### ✅ **Evolvable**
```markdown
# Good
> Last updated: 2024-01-15
> Review date: 2024-04-15

# Include version info and review dates
```

## AI Integration Tips

### Making Standards AI-Friendly

1. **Use Clear Headings**: Help AI parse different sections
2. **Include Examples**: Show correct and incorrect patterns
3. **Add Context**: Explain the "why" behind decisions
4. **Reference Standards**: Link related documents

### AI Prompt Integration

Train AI assistants to use your standards:

```
"Follow the coding standards in .dad/standards/ when implementing this feature"

"Review this code against our best practices in .dad/standards/best-practices.md"

"Generate tests following our testing guidelines in .dad/standards/testing-guidelines.md"
```

## Iteration and Maintenance

### Regular Review Process

1. **Monthly Reviews**: Check if standards reflect current practices
2. **Feature Retrospectives**: Update standards based on lessons learned
3. **Team Feedback**: Collect input on standard effectiveness
4. **Tool Updates**: Adjust standards when tools change

### Collaborative Evolution

- **Discussion Before Changes**: Standards affect the whole team
- **Version Control**: Track changes to understand evolution
- **Migration Guides**: Help transition when standards change
- **Deprecation Notices**: Phase out old practices gradually

### AI-Assisted Maintenance

Use AI to help maintain standards:
- **Consistency Checks**: "Review our standards for contradictions"
- **Gap Analysis**: "What standards are missing for our tech stack?"
- **Example Generation**: "Create examples for this coding standard"
- **Update Assistance**: "Update this standard for the new framework version"

## Getting Started

### For New Projects
1. Run `plan-product` to populate tech-stack.md with your specific choices
2. Review and customize best-practices.md for your team
3. Update testing-guidelines.md with your chosen testing tools
4. Add framework-specific standards as needed

### For Existing Projects
1. Run `analyze-product` to infer current practices
2. Document existing patterns in appropriate standard files
3. Identify inconsistencies and create migration plans
4. Establish regular review cadence

## Integration with Other DAD Components

### How Standards Connect to:

- **📋 Product Mission**: Standards should support product goals
- **🗺️ Roadmap**: Technical standards enable roadmap execution
- **📝 Task Specs**: Reference standards in feature specifications
- **🏗️ Instructions**: AI workflows should follow these standards

---

*This directory should evolve with your project. Regular updates ensure standards remain relevant and useful.*