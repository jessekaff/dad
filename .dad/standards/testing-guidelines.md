# Testing Guidelines

> **Status**: Generic Framework
> **Customize with**: Your specific testing tools and requirements

## About This File

This file provides a framework for testing practices. Customize it based on your chosen testing tools (Jest, Vitest, Cypress, Playwright, etc.).

## Testing Philosophy

### Core Principles
1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Comprehensive Coverage**: Aim for high coverage but prioritize critical paths
3. **Maintainable Tests**: Write clear, readable tests that serve as documentation
4. **Fast Feedback**: Unit tests should run quickly, integration tests validate workflows

### Testing Pyramid
- **Unit Tests (70%)**: Fast, isolated tests for individual functions/components
- **Integration Tests (20%)**: Test interactions between modules
- **End-to-End Tests (10%)**: Test complete user workflows

## Test Types

### Unit Tests
**When to use**: Testing individual functions, components, or modules
**Tools**: Jest, Vitest, Mocha, etc.
**Focus on**:
- Pure functions and business logic
- Component behavior and props
- Error handling and edge cases
- Utility functions

### Integration Tests
**When to use**: Testing interactions between components/services
**Tools**: Testing Library, Supertest, etc.
**Focus on**:
- API endpoint functionality
- Database interactions
- Third-party service integrations
- Component integration

### End-to-End Tests
**When to use**: Testing critical user journeys
**Tools**: Playwright, Cypress, Selenium
**Focus on**:
- User registration/login flows
- Core business workflows
- Cross-browser compatibility
- Performance under load

## Naming Conventions

### Test Files
```
src/
  components/
    Button.tsx
    Button.test.tsx         # Unit tests
  utils/
    validation.ts
    validation.test.ts      # Unit tests
  e2e/
    auth.spec.ts           # E2E tests
    checkout.spec.ts       # E2E tests
```

### Test Structure
```javascript
describe('ComponentName', () => {
  describe('when condition', () => {
    it('should expected behavior', () => {
      // Test implementation
    });
  });
});
```

## Writing Good Tests

### Test Organization
- Group related tests with `describe` blocks
- Use descriptive test names that explain the scenario
- Follow AAA pattern: Arrange, Act, Assert
- Keep tests focused and independent

### Common Patterns
```javascript
// Good: Descriptive and specific
it('should show error message when email is invalid')

// Bad: Vague
it('should work')

// Good: Clear setup and assertion
it('should calculate total with tax', () => {
  const items = [{ price: 100 }, { price: 200 }];
  const taxRate = 0.1;
  
  const total = calculateTotal(items, taxRate);
  
  expect(total).toBe(330);
});
```

## Coverage Guidelines

### Target Coverage
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

### Focus Areas
- Critical business logic (100% coverage)
- User-facing features (high coverage)
- Error handling paths
- Security-related functions

## Mocking Strategy

### When to Mock
- External API calls
- Database connections
- File system operations
- Time-dependent functions
- Complex dependencies

### When NOT to Mock
- Simple utility functions
- Internal business logic
- Constants and configuration

## Continuous Integration

### Test Pipeline
1. **Lint and Format**: Check code style
2. **Unit Tests**: Run all unit tests
3. **Integration Tests**: Test API endpoints
4. **Build**: Ensure code compiles
5. **E2E Tests**: Run critical user flows

## Customization for Your Project

Add sections specific to your tech stack:

### Frontend Testing
- Component testing patterns
- State management testing
- Route testing
- Accessibility testing

### Backend Testing
- API testing strategies
- Database testing patterns
- Authentication testing
- Performance testing

### Mobile Testing
- Device-specific testing
- Platform differences
- Offline scenarios
- Push notification testing

## AI Development Integration

When working with AI assistants:
- Ask AI to generate tests along with implementation code
- Use AI to review test coverage and suggest improvements
- Request AI to create test data and mock scenarios
- Have AI explain complex testing patterns

---

*Customize this file based on your chosen testing tools and project requirements.*