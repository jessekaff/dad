# Tech Stack Guidelines

> **Status**: Awaiting Configuration
> **Initialize with**: `plan-product` or `analyze-product` command

## About This File

This file will contain your project's specific tech stack guidelines and architecture decisions after initialization.

## What Will Be Generated

When you run DAD initialization commands, this file will be customized with:

### 1. **Project Architecture**
- Monorepo vs single-repo structure
- Application layout
- Package organization
- Shared library strategy

### 2. **Frontend Guidelines**
- Framework choice (React, Vue, Angular, etc.)
- State management approach
- Styling methodology
- Component patterns

### 3. **Backend Architecture**
- Server framework selection
- API design patterns (REST/GraphQL/tRPC)
- Database integration patterns
- Authentication strategy

### 4. **Development Tools**
- Build tools and bundlers
- Testing frameworks
- Linting and formatting
- Type checking setup

### 5. **Deployment Standards**
- CI/CD pipeline configuration
- Environment management
- Monitoring and logging
- Performance requirements

## Common Patterns

DAD supports various tech stack patterns:

### **Full-Stack JavaScript**
- Frontend: Next.js/React + TypeScript
- Backend: Node.js + Express/Fastify
- Database: PostgreSQL + Prisma
- Deployment: Vercel/Netlify + Railway/Supabase

### **Enterprise .NET**
- Frontend: Blazor or Angular + TypeScript
- Backend: ASP.NET Core + Entity Framework
- Database: SQL Server or PostgreSQL
- Deployment: Azure DevOps + Azure App Service

### **Ruby on Rails**
- Full-Stack: Rails + Hotwire + TypeScript
- Database: PostgreSQL + Redis
- Deployment: Heroku or DigitalOcean

### **Python Django**
- Backend: Django + Django REST Framework
- Frontend: React/Vue + TypeScript
- Database: PostgreSQL + Celery/Redis
- Deployment: Railway/Heroku + Vercel

## Getting Started

Your tech stack guidelines will be created based on:
- Project type and requirements
- Team expertise
- Performance needs
- Scalability requirements

**To generate your guidelines:**
```
Tell your AI: "Run plan-product" (new projects)
Tell your AI: "Run analyze-product" (existing projects)
```

---

*This is a DAD placeholder file. It will be replaced with your project-specific tech stack guidelines when you initialize your project.*