# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Plus fraîche ma ville is a French government startup (startup d'état) that helps local authorities choose sustainable urban cooling solutions. This repository contains V2 of the website at https://plusfraichemaville.fr.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Database**: PostgreSQL with Prisma ORM (custom output path: `src/generated/prisma/client`)
- **Authentication**: NextAuth.js with Agent Connect integration
- **CMS**: External Strapi CMS (separate repository: https://github.com/incubateur-ademe/plusfraichemaville-cms)
- **Styling**: Tailwind CSS + DSFR (Système de Design de l'État français via `@codegouvfr/react-dsfr`)
- **State Management**: Zustand (stores in `src/stores/`)
- **Forms**: React Hook Form + Zod validation
- **Analytics**: Matomo + HubSpot tracking
- **Error Tracking**: Sentry
- **Package Manager**: pnpm (enforced via preinstall script)

## Development Commands

```bash
# Start development server (uses Turbopack)
npm run develop  # or pnpm run dev:start

# Start local server simulating production
npm run localAsProd  # or pnpm run dev:localAsProd

# Database operations
pnpm run dev:db:migrate      # Create and apply migration
pnpm run dev:db:push         # Push schema changes without migration
pnpm run dev:db:generateClient  # Generate Prisma client
pnpm run db:migrate          # Deploy migrations in production

# Code quality
pnpm run lint                # ESLint
pnpm run prettier            # Check formatting
pnpm run fixPrettier         # Fix formatting

# Build
pnpm run build               # Production build
pnpm run start               # Start production server

# Utility scripts
pnpm run hubspot-sync        # Sync data with HubSpot
pnpm run csm-mail-batch      # Send batch emails
pnpm run connect-sync        # Sync with Connect CRM
```

## Architecture

### App Router Structure

The app uses Next.js 15 App Router with route groups:
- **`(auth)/`**: Authentication pages
- **`(site-vitrine)/`**: Public-facing pages (marketing site)
- **`(static)/`**: Static pages (legal, cookies, etc.)
- **`(private)/`**: Authenticated pages (espace-projet, info-perso, statut-perso)
- **`api/`**: API routes (minimal use - prefer Server Actions)

### Server Components First

The project maximizes use of React Server Components for content pages. Client components are used only when necessary for interactivity.

### Data Layer Architecture

**Content (CMS):**
- All editorial content fetched from external Strapi CMS
- GraphQL queries in `src/lib/strapi/queries/`
- Type-safe Strapi types in `src/lib/strapi/types/`
- Images served via CDN at `cdn.plusfraichemaville.fr`
- Cache revalidation via tags system

**Application Data (Database):**
- PostgreSQL database using custom Prisma schema (`prisma/schema.prisma`)
- Prisma client generated to custom path: `src/generated/prisma/client`
- **All database queries isolated in** `src/lib/prisma/prisma[Domain]Queries.ts` files
- Never call Prisma directly from components or actions

**Server Actions Pattern:**
- All mutations use Server Actions (not API routes)
- Located in `src/actions/[domain]/` directories
- Must include `"use server"` directive
- Return type: `ResponseAction<T>` from `actions-types.ts`
- Structure:
  ```typescript
  export async function myAction(input: InputType): Promise<ResponseAction<ReturnType>> {
    // 1. Validate session/auth
    // 2. Validate input with Zod
    // 3. Call isolated Prisma query function
    // 4. Return { type: "success" | "error", message: string, data?: T }
  }
  ```

### External Integrations

**Services** (`src/services/`):
- `brevo/`: Email service (transactional emails)
- `hubspot/`: CRM and analytics
- `connect/`: CRM Connect synchronization
- `mattermost/`: Team notifications

**External APIs:**
- Aides Territoires API: Funding opportunities
- API Adresse (BAN): French address geocoding
- Sirene API (INSEE): French business registry
- Strapi CMS: Content management

### Authentication Flow

- **NextAuth.js** with custom configuration in `src/lib/next-auth/auth.ts`
- **Agent Connect** OAuth provider for government employees
- Middleware protects private routes (regex: `/espace-projet.*`, `/info-perso.*`)
- User creation triggers:
  1. Fetch organization info from Sirene API
  2. Auto-attach to collectivité if applicable
  3. Attach pending project invitations by email
  4. Send welcome email via Brevo

### Security

- Content Security Policy configured in middleware with nonce
- CSP headers include trusted domains for Matomo, HubSpot, maps
- Protected routes require authentication
- CSRF protection via NextAuth
- Sentry error tracking for production

## Key Patterns & Conventions

### File Naming
- Use `kebab-case` for all files: `my-component.tsx`, `user-queries.ts`
- Named exports for components and functions
- Default exports only for Next.js pages/layouts

### Component Structure
```tsx
import clsx from "clsx";

type MyComponentProps = {
  label: string;
  isActive?: boolean;
};

export const MyComponent = ({ label, isActive }: MyComponentProps) => {
  return (
    <div className={clsx("base-class", { "active-class": isActive })}>
      {label}
    </div>
  );
};
```

### Styling
- Tailwind utility classes primarily
- DSFR classes prefixed with `fr-` (French Design System)
- Use `clsx` for conditional classes
- Buttons should include `rounded-3xl` class

### Forms
- React Hook Form with Controller wrapper
- Zod schemas in `src/forms/[domain]/`
- Reusable form field components in `src/components/common/`

### Error Handling
- Wrap Server Actions in try/catch
- Use `captureError` or `customCaptureException` from `src/lib/sentry/sentryCustomMessage`
- Return structured error responses with `ResponseAction` type

### TypeScript
- Strict mode enabled
- Avoid `any` types
- Define types/interfaces adjacent to usage or in `src/types/`
- Prisma custom types in `src/lib/prisma/prismaCustomTypes.d.ts`

## Environment Setup

1. Copy `.env.dist` to `.env.local`
2. Configure required variables:
   - `NEXT_PUBLIC_STRAPI_URL` and `STRAPI_TOKEN` (CMS access)
   - `DATABASE_URL` (PostgreSQL with PFMV schema)
   - `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
   - `AGENT_CONNECT_*` (OAuth credentials)
   - External API keys: BREVO, HUBSPOT, AIDES_TERRITOIRES, INSEE
3. Run `pnpm install`
4. Run `pnpm run dev:db:generateClient` to generate Prisma client
5. Run `pnpm run develop` to start dev server

## Important Notes

- **Node version**: 22.14.0 (enforced in package.json engines)
- **pnpm version**: 10.8.1 (enforced, no other package managers allowed)
- **Route groups** use parentheses syntax: `(private)`, `(auth)`
- **Strapi cache** TTL configured via `CMS_CACHE_TTL` env var
- **Server Actions** are the primary data mutation pattern (not API routes)
- **Middleware** handles both authentication and CSP headers
- Always run icon updates before build: `react-dsfr update-icons`

## Testing Locally

To test with production-like behavior:
```bash
pnpm run localAsProd
```
This cleans `.next`, builds, and starts the production server locally.

## Database Migrations

Development workflow:
```bash
# Make schema changes in prisma/schema.prisma
pnpm run dev:db:migrate  # Creates migration file and applies it
pnpm run dev:db:generateClient  # Regenerate Prisma client
```

Production deployment:
```bash
pnpm run db:migrate  # Applies pending migrations
```
