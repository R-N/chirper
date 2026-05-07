# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs php serve, queue worker, pail logs, and vite concurrently)
composer dev

# Frontend only
npm run dev          # Vite dev server
npm run build        # Production build (sourcemaps on, minify off)

# Backend
php artisan serve
php artisan queue:listen --tries=1
php artisan pail --timeout=0    # Real-time log viewer

# Tests
php artisan test                  # All tests
php artisan test --filter=TestName  # Single test
rtk php artisan test              # Failures only

# Linting
rtk vendor/bin/pint --test        # Dry-run PHP code style

# Database
php artisan migrate
php artisan migrate:rollback

# Export frontend lang/validation files (runs automatically in vite.config.js)
php artisan lang:export
php artisan validation:export
```

## Architecture

**Stack**: Laravel 11 + Vue 3 + Inertia.js + Vuetify 3 + TypeScript. SQLite default, MySQL supported.

**Routing**: Split into `routes/web.php` (guest/auth pages), `routes/hybrid.php` (all CRUD endpoints + API). `hybrid.php` handles both web Inertia responses and API calls.

### Backend: BaseModel pattern

All models extend `BaseModel` (`app/Models/BaseModel.php`). Models define a `columns()` method returning field metadata (label, type, filter, sort, search, rules). This single definition drives:
- `query2()` — auto-generates Spatie QueryBuilder filters/sorts from columns
- `rules()` — auto-generates validation rules from columns
- `collection()` / `toExportArray()` — export with human-readable headers

Models use constants for `TABLE` and `FILLABLE`. Example: `app/Models/Chirp.php`.

Traits: `HasRelationshipEntities` (eager-loads relations), `Validable`.

Controllers are thin — they delegate to `BaseModel::query2()` for listing and `BaseModel::rules()` for validation.

### Frontend: Module-based Inertia pages

Inertia resolves pages via `resources/js/modules/{name}.vue` using a glob on `modules/**/pages/*.vue`. Module naming follows the route/controller structure:

- `modules/user/auth/pages/` — Login, Register, etc.
- `modules/user/profile/pages/` — Profile edit/show
- `modules/chirps/pages/` — Chirp CRUD
- `modules/system/users/pages/` — User management
- `modules/system/backups/pages/` — Backup management
- `modules/system/settings/pages/` — Settings

### Frontend: Composition API with composables

All Vue components use `<script setup>` with Composition API. Reusable logic lives in composables (`resources/js/composables/`):

- `useBase()` — appStore, tabStore, settings, user, auth_token from page props
- `useAuth()` — authStore, isLoggedIn, userRoles, userName (calls useBase internally)
- `useWorking(props)` — busy state, waitBusy(), showError(), releaseBusy() (calls useAuth internally)
- `useViewBase(props)` — useWorking + clearBreadcrumbs on mount
- `useFormBase(props, emit)` — formData, valid, validate(), reset(), submit(), getForm()
- `useDialog(props, emit, deps)` — myDialog computed, close()
- `useEditableCell(props, emit, deps)` — value editing, finish(), validate()
- `useCrud({ client, waitBusy, nameField })` — fetch(), create(), delete2(), setField(), etc.
- `useCrudView({ client, waitBusy, ... })` — useCrud + table state (pagination, search, export, selection)
- `useCrudForm({ client, formData, data })` — submit() with store/update logic
- `useModel(name, props, emit)` — writable computed for v-model

Key views:
- `CrudView` — toolbar UI (create button, refresh, search, export toggles, bulk actions)
- `DeclarativeCrudView` — config-driven table. Takes `fields`, `actions`, `bulkActions`, `rules` props. Uses `GenericField` for each cell.

Most CRUD pages use `DeclarativeCrudView` and declare fields/actions declaratively.

### Frontend: Plugins & state

- `resources/js/plugins/axios.js` — Axios with CSRF handling
- `resources/js/plugins/i18n.js` — Vue I18n (lang exported from Laravel)
- `resources/js/plugins/vuetify.js` — Vuetify with auto-import
- `resources/js/stores/` — Pinia stores (auth, tab, app) with persistence
- `resources/js/libs/validation.js` — `parseLaravelRules()` translates backend rules to Vuetify rules
- `resources/js/libs/util.js` — helpers (`getByPath`, `setByPath`, `combineCollection`, `makeBindings`)

### Path aliases

`@` and `/@/` both resolve to `resources/js/`.

## Key patterns

- **Declarative CRUD**: Define `columns()` on model, `fields`/`actions` on frontend → full CRUD with filtering, sorting, search, export, inline editing, bulk actions.
- **Validation**: Backend rules in `columns()` → auto-extracted for requests. Frontend `parseLaravelRules()` mirrors them for Vuetify form validation.
- **Auth**: Laravel Fortify + Sanctum. `auth:sanctum` + `jetstream.auth_session` middleware on protected routes.
- **Permissions**: Spatie `laravel-permission` package. Role/permission middleware on system routes.
- **Exports**: Excel (maatwebsite/excel), PDF (dompdf), CSV — controller `export()` method uses `BaseModel::collection()`.

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%)
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->