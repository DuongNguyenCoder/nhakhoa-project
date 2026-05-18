<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project Guidelines

## Stack

- Next.js App Router
- JSX only
- TailwindCSS
- Zustand for global state

## Rules

- Do not use TypeScript
- Prefer Server Components
- Use "use client" only when necessary
- Use fetch instead of axios
- Use absolute imports with @/

## Folder Structure

- app/: routes
- components/: shared UI
- features/: business logic
- services/: API calls

## Styling

- Use Tailwind utility classes
- Avoid inline styles

## Forms

- React Hook Form + Zod

## Important

- Avoid hydration mismatch
- Optimize for SEO
<!-- END:nextjs-agent-rules -->
