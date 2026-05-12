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

# Custom artisan commands
php artisan make:admin-user {email?} {password?} {name?}  # Interactive if args omitted

# Export frontend lang/validation/columns files (runs automatically in vite.config.js)
php artisan lang:export
php artisan validation:export
php artisan columns:export

# Database seeding
php artisan db:seed                    # All seeders
php artisan db:seed --class=RolePermissionSeeder  # Roles & permissions only

# Permissions (Spatie)
rtk php artisan permission:create-role "admin"      # Create a role
rtk php artisan permission:create-permission "edit"  # Create a permission
rtk php artisan permission:cache-reset                # Clear cached permissions
rtk php artisan permission:show                       # List roles/permissions table

# Backups (Spatie)
rtk php artisan backup:run          # Run backup now
rtk php artisan backup:list          # List all backups
rtk php artisan backup:monitor       # Check backup health
rtk php artisan backup:clean          # Remove old backups per config

# Activity log (Spatie)
rtk php artisan activitylog:clean     # Purge old activity records (runs daily via schedule)

# Cache, config, routes
rtk php artisan config:cache   # Cache config for production
rtk php artisan route:cache    # Cache routes
rtk php artisan view:cache     # Compile Blade views
rtk php artisan optimize       # Bootstrap/config/metadata cache

# Schedule
rtk php artisan schedule:list   # Show scheduled tasks
rtk php artisan schedule:run    # Run due tasks (cron calls this)
```

## Architecture

**Stack**: Laravel 11 + Vue 3 + Inertia.js + Vuetify 3 + TypeScript. SQLite default, MySQL supported.

**Routing**: Three route files:
- `routes/web.php` — guest/auth pages (Inertia), plus all CRUD endpoints for authenticated users
- `routes/api.php` — API-only routes (notifications CRUD, settings types, user roles/permissions, token refresh, validation rules, lang, debug, bootstrap). Includes `hybrid.php`.
- `routes/hybrid.php` — shared CRUD endpoints included by both web.php and api.php. Handles both Inertia responses and JSON via `ResponseUtil`.

### Backend: BaseModel pattern

Models define a `columns()` method returning field metadata (label, type, filter, sort, search, rules). This single definition drives:
- `query2()` — auto-generates Spatie QueryBuilder filters/sorts from columns
- `rules()` — auto-generates validation rules from columns
- `collection()` / `toExportArray()` — export with human-readable headers

The columns-driven logic lives in the `HasColumnDefinitions` trait (`app/Models/Traits/HasColumnDefinitions.php`). `BaseModel` uses it. Models that can't extend BaseModel (e.g., `User` which extends `Authenticatable`) use the trait directly.

All models use `columns()`: `Chirp` (extends BaseModel), `Setting` (extends BaseModel), `User` (uses trait, extends Authenticatable). `Activity` extends Spatie's `SpatieActivity` for activity log.

Custom filter support in `columns()`: set `filter: 'custom'` with `filter_class` (FQCN) and optional `filter_column`. Sort on a different column via `sort_column`. Example in `User::columns()` for `verified` using `NotNullFilter` on `email_verified_at`.

Models use constants for `TABLE` and `FILLABLE`. Example: `app/Models/Chirp.php`.

`HasRelationshipEntities` trait: models define static `$relationshipEntities` array (e.g., `User` has `['roles', 'permissions']`). `query2()` auto-calls `withEntities()` if the trait is present. Also provides `loadEntities()` for eager-loading after fetch.

`defaultSort()` — optional method on models. `query2()` applies it via Spatie QueryBuilder when defined (e.g., `User::defaultSort()` returns `['name']`).

Traits: `HasColumnDefinitions` (columns-driven query/rules/export), `HasRelationshipEntities` (eager-loads relations), `Validable`.

Controllers extend `CrudController` (`app/Http/Controllers/CrudController.php`) — an abstract class providing `index`, `store`, `show`, `update`, `destroy`, `bulkDestroy`, `export`. Subclasses set `$modelClass`, `$resourcePagePath`, `$routeBase`, `$translationKey`, `$mayExport`, `$userOwned`. Thin — they delegate to `BaseModel::query2()` for listing and `BaseModel::rules()` for validation.

`Validable` trait (`app/Models/Traits/Validable.php`) provides `validateRequest()` — filters `rules()` to FILLABLE fields, then drops `required` rules on updates.

### Backend: Dual-response pattern (hybrid routes)

Routes in `routes/hybrid.php` serve both web (Inertia) and API (JSON) clients. Controllers use `ResponseUtil`:
- `jsonInertiaResponse($data, $view)` — returns Inertia render for web, JSON for API
- `jsonRedirectResponse($data, $route, $status)` — redirect for web, `{redirect: url}` in JSON for API
- `jsonStayResponse($data, $status)` — returns JSON without redirect (for modals/dialogs)
- Request detects JSON via `$request->wantsJson()` or `$request->expectsJson()`

This allows a single endpoint to power both SPA page loads and pure API calls.

### Backend: Middleware

Custom middleware in `app/Http/Middleware/`:
- `SetUserLocale` — sets app locale from user preference or session fallback
- `InjectSettingsIntoResponse` — appends `Setting::fetchDict()` to all JSON responses
- `EnsureTokenIsNotExpired` — validates API token expiry on API routes
- `HandleInertiaRequests` — Inertia middleware (shared props via `share()` method)

### Backend: Utils

Utility classes in `app/Utils/`:
- `ResponseUtil` — `jsonInertiaResponse()`, `jsonRedirectResponse()`, `jsonStayResponse()` for dual web/API responses
- `ExceptionUtil` — `shouldShow()`, `toArray()`, `getStatusCode()` for exception rendering in `bootstrap/app.php`. Exceptions can carry `show` (triggers error dialog), `redirect` (triggers redirect response), or `showTrace` (includes file/line/trace in output) properties to control rendering behavior. `shouldShow()` auto-sets `show = true` on auth, validation, throttle, and HTTP exceptions.
- `ExportUtil` — export helpers (Excel, PDF, CSV)
- `ValidationUtil` — validation helper methods
- `ArrayUtil`, `QueryUtil` — array/query manipulation helpers

### Backend: Events & Listeners

Registered in `EventServiceProvider`:
- `Registered` → `SetUserDefaults` — assigns 'chirper' role, calls `resetPassword()` on new user
- `ChirpCreated` → `SendChirpCreatedNotifications` — sends `NewChirp` notification

Listeners are **not queued** (no `ShouldQueue` interface).

### Backend: Scheduled tasks

`routes/console.php` schedules `activitylog:clean` daily.

### Backend: Bootstrap endpoint (SPA mode)

`GET /api/bootstrap` (`BootstrapController`) returns initial app state for SPA mode: `user`, `settings`, `notifications`, `ziggy`. Called by `resources/js/router/bootstrap.js` on app init to hydrate `spaPageProps` before mount.

### Backend: Inertia shared props

`AppServiceProvider::boot()` shares globally to all Inertia pages: `settings` (from `Setting::fetchDict()`), `user`, `notifications`. Uses `Schema::hasTable('settings')` guard to avoid errors when settings table doesn't exist (e.g., pre-migration).

`HandleInertiaRequests::share()` additionally injects `ziggy` (route definitions) on every Inertia response.

### Backend: Custom login

`CustomLoginResponse` bound as singleton in `AppServiceProvider`. On login, creates a Sanctum personal access token (`auth_token`) and returns it along with the user (via `loadEntities()`) through `ResponseUtil::jsonRedirectResponse()`, redirecting to dashboard.

### Frontend: Routing — SPA vs Inertia mode

App supports two frontend modes via `VITE_APP_MODE` (`.env`):

| Mode | Behavior |
|------|----------|
| `inertia` (default) | Traditional Inertia.js — server returns full page component for each visit. `<Link>` uses Inertia visits. |
| `spa` | Vue Router handles navigation client-side. Laravel serves a single HTML shell at `/{any}` catch-all. `<Link>` renders Vue RouterLink. |

Mode switch lives in `resources/js/plugins/inertia.js`:
- `IS_SPA_MODE` — boolean flag
- `Link` component — InertiaLink vs RouterLink adapter
- `router` — Inertia router vs Vue Router shim with `visit()`, `get()` etc.
- `vueRouter` — only created in SPA mode, with guards from `router/guards.js`
- `visit(url)` — mode-agnostic navigation helper (uses Inertia router or Vue Router depending on mode)
- `useForm` — Inertia's `useForm` in Inertia mode; reactive SPA shim with `errors`, `processing`, `reset()`, `clearErrors()` in SPA mode

**SPA init flow** (`app.js`): create app → install Pinia → `axios.init()` → install Vuetify/i18n/Ziggy/Vue Router → provide `$page` global → `bootstrap()` fetches `/api/bootstrap` → mount.

**Inertia page resolution** (`app.js`): `resolvePageComponent` resolves `./modules/${name}.vue` against eager glob `./modules/**/pages/*.vue`. Inertia page components live in `resources/js/modules/**/pages/*.vue`.

**Route definitions** (`resources/js/router/index.js`):
- Guest routes have `meta: { guest: true }`
- Authenticated routes have breadcrumb metadata
- SPA fallback in `routes/web.php` (last route) — `Route::view('/{any}', 'app')->where('any', '.*')`

**Guards** (`router/guards.js`):
- Guest route + logged in → redirect to dashboard
- Protected route + not logged in → redirect to login with `redirect` query
- After each navigation, breadcrumbs set from `route.meta.breadcrumbs`
- `routerBusy` flag toggled on navigation start/end (used by loading overlays)

**Critical navigation rule**: Always use `route('name')` helper from Ziggy for hrefs. Hardcoded paths (`'/'`, `'/register'`) bypass router and cause 403 errors in SPA mode. The `route()` helper resolves to the correct base path and works in both modes.

### Frontend: Composition API with composables

All Vue components use `<script setup>` with Composition API. Reusable logic lives in composables (`resources/js/composables/`):

- `useBase()` — appStore, tabStore, settings, user, auth_token from page props
- `useAuth()` — authStore, isLoggedIn, userRoles, userName (calls useBase internally)
- `useWorking(props)` — busy state, waitBusy(), showError() (calls useAuth internally)
- `useBusy()` — busy counter (global singleton via provide/inject). `run(fn)` is safe (try/finally). `start()/end()` lack safety — prefer `run()`.
- `useViewBase(props)` — useWorking + clearBreadcrumbs on mount
- `useFormBase(props, emit)` — formData, valid, validate(), reset(), submit(), getForm()
- `useDialog(props, emit, deps)` — myDialog computed, close()
- `useCrud({ client, waitBusy, nameField })` — fetch(), create(), delete2(), setField(), setFieldConfirmText(), toggleField(), etc.
- `useCrudView({ client, waitBusy, ... })` — useCrud + table state (pagination, search, export, selection)
- `useCrudForm({ client, formData, data })` — submit() with store/update logic
- `useCrudFormDialog(props, emit, { client, initialFormData })` — bundles useWorking + useFormBase + useDialog + useCrudForm for form dialog boilerplate. Modules use this instead of wiring 4 composables manually.
- `useCrudContext()` — provide/inject for CRUD context. `GenericField` uses this as primary source, falls back to `props.crud`.
- `useModel(name, props, emit)` — writable computed for v-model
- `useClearBreadcrumbs()` — clears breadcrumb state on mount

Key views:
- `CrudView` — toolbar UI (create button, refresh, search, export toggles, bulk actions)
- `DeclarativeCrudView` — config-driven table. Takes `fields`, `actions`, `bulkActions`, `rules` props. Renders `<GenericField>` per cell, `<FormDialog>` for create/edit.

Most CRUD pages use `DeclarativeCrudView` and declare fields/actions declaratively.

### Frontend: Field system

**Field definitions** — normalised by `normalizeField()` in `fieldSchema.js`. Sets defaults: `type: "text"`, `table: true`, `editable: false`, `form: true`. Spreads remaining field properties via `...field`, so `component`, `getValue`, `onFinish`, etc. all pass through.

**GenericField** (`components/form/GenericField.vue`) — central component for rendering fields. Three template branches:

1. **Custom component** (`v-if="isCustomComponent"`) — when `field.component` is set. Renders the component directly with `:value`, `:on-finish`, `:bypass`, `:data`. No GenericField editing chrome. Used for `SyncCheckboxField`, `Duration`, etc.
2. **Bypass mode** (`v-else-if="isBypass"`) — form/modal mode. Renders thin Field component with `model-value` / `@update:model-value`. No edit buttons.
3. **Table mode** (`v-else`) — display/edit toggle with pencil/check/cancel IconButtons wrapped in `ConfirmationSlot`. Uses `editing`/`editValue` refs for inline editing state.

`isBypass` = `props.bypassEditableCell || props.field.bypassEditableCell || !!props.field.component`. `CrudForm` sets `bypassEditableCell: true` by default, so fields inside forms use branch 2.

**Field components** (`components/form/field/`) — thin wrappers around Vuetify inputs. Use `modelValue` / `update:modelValue` v-model contract:
- `FieldText.vue` — VTextField (variant: "underlined", density: "compact")
- `FieldSelect.vue` — VSelect
- `FieldTextArea.vue` — VTextarea

`fieldRegistry.js` maps type strings to these components. `resolveCellComponent(type)` returns the Vue component. Register new types via `registerFieldType()`.

**`makeBindings(f, item)`** — only spreads `f.props` onto the component bindings. Top-level field properties like `items`, `multiple`, `itemTitle` must go inside `props`, not at field root level.

**`CrudForm`** (`components/form/CrudForm.vue`) — iterates an array of field definitions, renders a `<GenericField>` per field with `bypassEditableCell` and `:show-title`. Used inside form dialogs.

### Frontend: i18n

Three-layer translation merge (see `resources/js/plugins/i18n.js`):
1. `lang-gen/` — JSON files auto-generated from Laravel lang files by `php artisan lang:export`
2. API-fetched translations — fetched from backend at init time via `route('api.lang.get')`
3. `lang/` — static Vue-side translation JSON files

`php artisan lang:export` and `php artisan validation:export` run automatically in `vite.config.js` on every dev/build start.

### Frontend: API client & error handling

`resources/js/plugins/axios.js` — exports default `api` instance + `createApi()` factory. CSRF cookie handling via `/sanctum/csrf-cookie`. Bearer token injection from authStore. Response interceptor: 401/403 → clear auth + redirect to login; 419 → refresh CSRF once, queue+retry pending requests. `withCredentials` enabled. Base URL from `VITE_API_BASE_URL` env var.

`app.js` error handler: shared `handleError()` used by both `app.config.errorHandler` (Vue lifecycle/event errors) and `window.unhandledrejection` listener (Promise rejections). Catches CSRF errors → auto-refreshes token. Errors with `.show` or `.response.data.show` flag → trigger error dialog via `tabStore.showError()`. Unrecognized errors logged with `console.error`, returned `false` to let Vue fall back to default.

### Frontend: Plugins & state

- `resources/js/plugins/vuetify.js` — Vuetify with auto-import (labs enabled). VBtn defaults: `variant: "elevated"`. IconButton overrides with `variant="plain"`.
- `resources/js/stores/` — Pinia stores (auth, tab, app) with persistence via `pinia-plugin-persistedstate`
- `resources/js/libs/validation.js` — `parseLaravelRules()` translates backend rules to Vuetify rules
- `resources/js/libs/util.js` — helpers (`getByPath`, `setByPath`, `combineCollection`, `makeBindings`, `filterObject`, `getData`)
- `resources/js/libs/actionRegistry.js` — maps action types (`edit`, `delete`) to button components with icons/events
- `resources/js/types/` — TypeScript type definitions. `generated/` contains auto-generated field consts/types from `php artisan columns:export`. Import via `@/types` for `CHIRP_FIELDS`, `USER_FIELDS`, `SETTING_FIELDS`, `FieldOverrides`, and `CrudFields<T>` utility type.

### Frontend: Service layer

Services extend `CrudService` (`resources/js/services/crud.js`) or `BaseService` (`resources/js/services/base.js`). Constructors take a single options object:

```js
class UserService extends CrudService {
  constructor() {
    super({
      name: "User",
      endpoint: "/api/system/users",
      methods: ["get", "post", "patch", "delete", "put"],
      fields: ["email", "name", "verified", "enabled", "roles", "permissions"],
      setters: [...],  // auto-generates set_{field}() methods
      getters: [...],  // auto-generates get_{field}() methods
      actions: [...],  // custom action methods (e.g. clear_password)
    });
  }
}
```

`BaseService.call()` validates the resolved HTTP method against `methods` via `checkMethod()`. Method lists use HTTP names (get/post/put/patch/delete), not aliases.

`__call`/`_call` indirection exists for declarative method dispatch — `createSetters()` builds methods from config strings (e.g., `{field: "enabled", method: "put"}`). Kept intentionally.

**Endpoint resolution**: `endpoint()` in `BaseService` supports named routes (string without `/`) and path strings. Falls back to direct path if `route()` helper unavailable.

**File upload handling**: `checkFiles()` wraps form data; for multipart uploads with PUT/PATCH, sends POST with `_method` spoof header since Laravel doesn't process multipart bodies on PUT.

**Auto error binding**: `call()` detects form objects with `clearErrors`/`setErrors`/`reset` and wires them automatically from API error responses.

### Frontend: Additional services

- `notification.js` — extends `CrudService` for notifications CRUD
- `activity.js` — extends `CrudService` for activity log

### Path aliases

`@` and `/@/` both resolve to `resources/js/`.

## Key patterns

- **Declarative CRUD**: Define `columns()` on model, `fields`/`actions` on frontend → full CRUD with filtering, sorting, search, export, inline editing, bulk actions.
- **Validation**: Backend rules in `columns()` → auto-extracted for requests. Frontend `parseLaravelRules()` mirrors them for Vuetify form validation.
- **Auth**: Laravel Fortify + Sanctum. `auth:sanctum` + `jetstream.auth_session` middleware on protected routes. Session: database driver, 120 min lifetime. `EnsureTokenIsNotExpired` middleware on API routes. Session timeout: 300s idle + 300s logout countdown (SharedIdle + IdleOverlay). Expired sessions caught by axios 401/403/419 interceptor (redirects to `/login`, refreshes CSRF if recoverable). Loading overlay has 30s timeout fallback showing "Session may have expired".
- **Testing**: PHPUnit with SQLite in-memory DB (`:memory:`), sync queue, array cache/session (`phpunit.xml`). Standard `tests/Unit` and `tests/Feature` suites. Feature tests use `$this->actingAs($user)` and standard Laravel HTTP testing methods.
- **Permissions**: Spatie `laravel-permission` package. Role/permission middleware on system routes. Cache reset via `permission:cache-reset`.
- **Exports**: Excel (maatwebsite/excel), PDF (dompdf), CSV — controller `export()` method uses `BaseModel::collection()`.
- **Activity log**: Spatie `laravel-activitylog`. Cleaned daily via scheduled command. Pages at `system/activity`.
- **Backups**: Spatie `laravel-backup`. Managed at `system/backups`.

<!-- /rtk-instructions -->

## Environment & configuration

**Key env vars** (`.env.example`):
- `VITE_API_BASE_URL` — Backend API URL for axios (frontend)
- `VITE_APP_MODE` — `inertia` (default) or `spa` — switches frontend routing mode
- `APP_URL` — application base URL
- `SESSION_DRIVER=database` — sessions stored in DB (allows invalidation)
- `SANCTUM_STATEFUL_DOMAINS` — domains that receive session auth instead of tokens

**App configuration** (`config/app.php`):
- `'spa_mode'` — derived from `VITE_APP_MODE` via `env()`
- Locale settings: `APP_LOCALE`, `APP_FALLBACK_LOCALE`
- Timezone: `APP_TIMEZONE=UTC`

**Frontend build**: `vite.config.js` auto-runs `php artisan lang:export`, `validation:export`, `columns:export` on every dev/build start. This keeps TypeScript types and Vue i18n JSON in sync with backend models/validation.

## Critical file locations

| Path | Purpose |
|------|---------|
| `bootstrap/app.php` | Middleware stack, exception handler registration |
| `routes/web.php` | Guest + authenticated Inertia routes |
| `routes/api.php` | API-only endpoints (notifications, settings, lang, validation, debug) |
| `routes/hybrid.php` | Shared CRUD endpoints for both web and API |
| `routes/console.php` | Scheduled tasks |
| `app/Models/Traits/HasColumnDefinitions.php` | Core columns-driven query/rules/export logic |
| `app/Models/BaseModel.php` | Base model using HasColumnDefinitions |
| `app/Http/Controllers/CrudController.php` | Abstract CRUD controller (index/store/show/update/destroy/bulkDestroy/export) |
| `app/Utils/ResponseUtil.php` | Dual-response helpers (jsonInertiaResponse, jsonRedirectResponse) |
| `app/Helpers/helper.php` | Global helper file (autoloaded via composer `files` array, currently empty) |
| `app/Http/Middleware/` | Custom middleware: SetUserLocale, InjectSettingsIntoResponse, EnsureTokenIsNotExpired, HandleInertiaRequests |
| `resources/js/app.js` | Entry point: Inertia init or SPA init with bootstrap |
| `resources/js/plugins/inertia.js` | Inertia/SPA mode switch, Link component, router adapter |
| `resources/js/router/index.js` | Vue Router route definitions (SPA mode) |
| `resources/js/router/guards.js` | Navigation guards (auth redirects, breadcrumbs) |
| `resources/js/router/bootstrap.js` | SPA mode: fetches `/api/bootstrap` to hydrate initial state |
| `resources/js/plugins/axios.js` | Axios instance with CSRF, auth injection, session expiry handling |
| `resources/js/composables/` | Reusable Vue logic (useCrud, useCrudView, useCrudForm, useDialog, useBusy, useAuth, useBase, etc.) |
| `resources/js/services/` | Service layer: `base.js`, `crud.js`, plus domain services |
| `resources/js/stores/` | Pinia stores: `auth.js`, `tab.js`, `app.js` |
| `resources/js/libs/` | Utilities: `util.js`, `validation.js`, `actionRegistry.js`, `fieldSchema.js`, `fieldRegistry.js` |
| `resources/js/views/` | Reusable view components: `CrudView.vue`, `DeclarativeCrudView.vue` |
| `resources/js/components/form/` | Form components: `GenericField.vue`, `CrudForm.vue`, `field/*.vue` |
| `resources/js/modules/` | Page components organized by feature |

## Debugging & common pitfalls

**403 on navigation** — Likely hardcoded `href="/..."` bypassing router. Use `route('name')` instead. Check `resources/js/plugins/inertia.js` — `Link` component and `route()` helper handle both modes.

**CSRF 419 errors** — Axios auto-refreshes once. If it loops, check Sanctum CSRF cookie endpoint (`/sanctum/csrf-cookie`) is reachable and `SANCTUM_STATEFUL_DOMAINS` matches your domain.

**Session expiry** — 401/403 triggers `clearAuthAndRedirect()` to login. If overlays hang 30s, session likely fully expired.

**SPA mode catch-all** — `routes/web.php` line 48 `Route::view('/{any}', 'app')->where('any', '.*')` MUST be last. Any routes defined after are unreachable.

**columns() mismatch** — Backend `columns()` keys must match frontend field `value`/`name` props. `php artisan columns:export` generates TypeScript consts in `resources/js/types/generated/` — use these to avoid typos.

**Auth redirect loops** — SPA guard redirects logged-in users from guest routes to `dashboard`. Ensure guest pages have `meta: { guest: true }` in `router/index.js`.
