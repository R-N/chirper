# Chirper

A Laravel 11 + Vue 3 starter/admin app combining Inertia.js, Vuetify 3 and TypeScript. It ships a columns-driven CRUD engine, a dual web/API response layer, role-based access control, and a switchable Inertia-or-SPA frontend.

## Goals

The project is built to make general features **easy to develop declaratively** (one `columns()` definition drives query, validation and exports; config-driven CRUD views and services) while staying **flexible, extendable and scalable** for custom logic and optimization (custom filters, registrable field types, caching, escape hatches on the generic path). It aims to be **consistent** — backend and frontend mirror the same patterns and stay type-synced — and **user-friendly, fluid and intuitive** through shared composables for loading, errors and i18n. It balances **strictness** (validation rules, permission-gated routes, hierarchy authorization) with **robustness/leeway** (idempotent operations, CSRF refresh-and-retry, safe update semantics). It is **secure by access control** — every state-changing endpoint sits behind layered authentication, email verification, permission and ownership checks, with mass-assignment limited to each model's fillable fields. Underneath: **clean, decoupled, testable** code — thin controllers, cross-cutting logic in traits/utils, covered by backend feature tests and frontend Vitest tests. See [`CLAUDE.md` → Design goals](CLAUDE.md#design-goals) for how each aim maps to concrete mechanisms.

## Stack

- **Backend**: Laravel 11, Fortify (auth + 2FA), Sanctum (API tokens), Spatie Permission (RBAC), Spatie Activity Log + Backup.
- **Frontend**: Vue 3 (`<script setup>`), Inertia.js, Vuetify 3 (auto-import, labs), Pinia, Vue Router (SPA mode), Vite, TypeScript.
- **Database**: SQLite by default, MySQL supported.

## Requirements

- PHP 8.2+, Composer
- Node 18+, npm

## Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed        # creates tables, seeds roles/permissions
php artisan storage:link
php artisan make:admin-user        # interactive: creates an admin user
```

## Running

```bash
composer dev    # runs php serve + queue worker + pail logs + vite concurrently
```

Or individually:

```bash
php artisan serve
npm run dev
```

## Common commands

```bash
php artisan test                          # run tests
php artisan test --filter=RoleApiTest     # single test
vendor/bin/pint --test                    # PHP code-style dry-run
npm run build                             # production frontend build
clear.bat                                 # (Windows) clear all Laravel caches
php artisan db:seed --class=RolePermissionSeeder   # roles & permissions only
```

## Frontend mode

Set `VITE_APP_MODE` in `.env`:

- `inertia` (default) — server returns a full page component per visit.
- `spa` — Vue Router handles navigation client-side; Laravel serves a single HTML shell.

Always use the Ziggy `route('name')` helper for links so navigation works in both modes.

## Key concepts

- **Columns-driven models** — each model's `columns()` method drives query filters/sorts, validation rules, and exports (`HasColumnDefinitions` trait).
- **Dual web/API responses** — `routes/hybrid.php` endpoints serve both Inertia (web) and JSON (API) via `ResponseUtil`.
- **RBAC** — level-based role hierarchy enforced by `App\Support\RoleAuthorization`; routes gated with Spatie `permission:` middleware. Seeded roles: `admin` (level 10), `chirper` (level 0).
- **Access control** — layered gates (`auth:sanctum` → `verified` → `permission:*`), owner-scoped reads/writes for user-owned resources (no IDOR), server-side CSRF enforced, and traversal-safe static file serving.

## Testing

```bash
php artisan test     # backend (PHPUnit, in-memory sqlite)
npm test             # frontend (Vitest: pure logic + jsdom component tests)
```

## Documentation

Deep architecture notes, file map, and debugging pitfalls live in [`CLAUDE.md`](CLAUDE.md) (and the identical [`AGENTS.md`](AGENTS.md)) — read these before making non-trivial changes.
