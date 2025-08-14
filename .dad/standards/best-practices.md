# Development Best Practices

> **Status**: Generic Guidelines
> **Customize with**: Project-specific practices as your codebase evolves

## About This File

This file contains universal development principles that apply to most projects. As your project grows, add specific practices tailored to your tech stack and team.

## Core Principles

### Keep It Simple
- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones
- Prefer composition over inheritance

### Optimize for Readability
- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what"
- Use consistent formatting and naming conventions

### DRY (Don't Repeat Yourself)
- Extract repeated business logic to reusable functions
- Create shared components for common UI patterns
- Use utility functions for common operations
- Centralize configuration and constants

### Single Responsibility
- Keep functions focused on one task
- Keep files focused on a single domain
- Separate concerns clearly
- Organize code by feature, not by file type

## Code Organization

### File Structure
- Group related functionality together
- Use consistent naming conventions
- Keep directory structure shallow and intuitive
- Separate business logic from UI components

### Testing Strategy
- Write tests for critical business logic
- Test edge cases and error conditions
- Keep tests simple and focused
- Use descriptive test names

### Error Handling
- Fail fast and provide clear error messages
- Handle errors at the appropriate level
- Log errors with sufficient context
- Provide graceful fallbacks where possible

## Dependencies

### Choose Libraries Wisely
- Select actively maintained libraries
- Prefer libraries with good documentation
- Consider bundle size impact
- Evaluate security and licensing

### Version Management
- Lock dependency versions in production
- Keep dependencies up to date
- Review security advisories regularly
- Document major version upgrade decisions

## Performance

### Optimization Strategy
- Measure before optimizing
- Focus on the biggest bottlenecks first
- Consider user experience impact
- Document performance requirements

### Resource Management
- Optimize database queries
- Minimize network requests
- Use appropriate caching strategies
- Monitor memory usage

## Security

### Basic Security Practices
- Validate all user inputs
- Use parameterized queries
- Implement proper authentication
- Keep sensitive data secure
- Follow principle of least privilege

## Customization Guidelines

As your project evolves, add sections for:
- **Framework-Specific Practices**: React hooks, Vue composition, etc.
- **Team Conventions**: Code review process, naming standards
- **Architecture Patterns**: How to structure your specific app type
- **Performance Requirements**: Your specific metrics and goals

## AI Development Tips

When working with AI assistants:
- Reference these practices in your task specifications
- Ask AI to follow these guidelines in implementations
- Use AI to help identify violations of these practices
- Iterate on these practices based on what works for your team

---

*This file should evolve with your project. Add specific practices that emerge from your development experience.*