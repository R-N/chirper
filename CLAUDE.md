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
```

## Architecture

**Stack**: Laravel 11 + Vue 3 + Inertia.js + Vuetify 3 + TypeScript. SQLite default, MySQL supported.

**Routing**: Three route files:
- `routes/web.php` — guest/auth pages (Inertia), plus all CRUD endpoints for authenticated users
- `routes/api.php` — API-only routes (notifications CRUD, settings types, user roles/permissions, token refresh, validation rules, lang, debug). Includes `hybrid.php`.
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

Traits: `HasColumnDefinitions` (columns-driven query/rules/export), `HasRelationshipEntities` (eager-loads relations), `Validable`.

Controllers extend `CrudController` (`app/Http/Controllers/CrudController.php`) — an abstract class providing `index`, `store`, `show`, `update`, `destroy`, `bulkDestroy`, `export`. Subclasses set `$modelClass`, `$resourcePagePath`, `$routeBase`, `$translationKey`, `$mayExport`, `$userOwned`. Thin — they delegate to `BaseModel::query2()` for listing and `BaseModel::rules()` for validation.

`Validable` trait (`app/Models/Traits/Validable.php`) provides `validateRequest()` — filters `rules()` to FILLABLE fields, then drops `required` rules on updates.

### Backend: Middleware

Custom middleware in `app/Http/Middleware/`:
- `SetUserLocale` — sets app locale from user preference or session fallback
- `InjectSettingsIntoResponse` — appends `Setting::fetchDict()` to all JSON responses
- `EnsureTokenIsNotExpired` — validates API token expiry on API routes
- `HandleInertiaRequests` — Inertia middleware (shared props via `share()` method)

### Backend: Utils

Utility classes in `app/Utils/`:
- `ResponseUtil` — `jsonInertiaResponse()`, `jsonRedirectResponse()`, `jsonStayResponse()` for dual web/API responses
- `ExceptionUtil` — `shouldShow()`, `toArray()`, `getStatusCode()` for exception rendering in `bootstrap/app.php`
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

### Backend: Inertia shared props

`AppServiceProvider::boot()` shares globally to all Inertia pages: `settings` (from `Setting::fetchDict()`), `user`, `notifications`.

### Backend: Custom login

`CustomLoginResponse` bound as singleton in `AppServiceProvider` — customizes post-login redirect.

### Frontend: Module-based Inertia pages

Inertia resolves pages via `resources/js/modules/{name}.vue` using a glob on `modules/**/pages/*.vue`. Module naming follows the route/controller structure:

- `modules/guest/pages/` — Welcome, PrivacyPolicy, TermsOfService
- `modules/general/pages/` — Dashboard, NotFound
- `modules/user/auth/pages/` — Login, Register, ForgotPassword, ResetPassword, VerifyEmail, TwoFactorChallenge, ConfirmPassword
- `modules/user/profile/pages/` — Profile edit/show
- `modules/user/api/pages/` — API token management
- `modules/chirps/pages/` — Chirp CRUD (Index, Index2, Chirp)
- `modules/system/users/pages/` — User management (Index, Show)
- `modules/system/backups/pages/` — Backup management
- `modules/system/settings/pages/` — Settings
- `modules/system/activity/pages/` — Activity log (Index, Show)

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

### Path aliases

`@` and `/@/` both resolve to `resources/js/`.

### Frontend: Additional services

- `notification.js` — extends `CrudService` for notifications
- `activity.js` — extends `CrudService` for activity log

## Key patterns

- **Declarative CRUD**: Define `columns()` on model, `fields`/`actions` on frontend → full CRUD with filtering, sorting, search, export, inline editing, bulk actions.
- **Validation**: Backend rules in `columns()` → auto-extracted for requests. Frontend `parseLaravelRules()` mirrors them for Vuetify form validation.
- **Auth**: Laravel Fortify + Sanctum. `auth:sanctum` + `jetstream.auth_session` middleware on protected routes. Session: database driver, 120 min lifetime. `EnsureTokenIsNotExpired` middleware on API routes. Session timeout: 300s idle + 300s logout countdown (SharedIdle + IdleOverlay). Expired sessions caught by axios 401/403/419 interceptor (redirects to `/login`, refreshes CSRF if recoverable). Loading overlay has 30s timeout fallback showing "Session may have expired".
- **Testing**: PHPUnit with SQLite in-memory DB, sync queue, array cache/session. Standard `tests/Unit` and `tests/Feature` suites.
- **Permissions**: Spatie `laravel-permission` package. Role/permission middleware on system routes.
- **Exports**: Excel (maatwebsite/excel), PDF (dompdf), CSV — controller `export()` method uses `BaseModel::collection()`.
- **Activity log**: Spatie `laravel-activitylog`. Cleaned daily via scheduled command. Pages at `system/activity`.
- **Backups**: Spatie `laravel-backup`. Managed at `system/backups`.

<!-- rtk-instructions v2 -->
RTK is installed globally (`~/.claude/CLAUDE.md`). Always prefix shell commands with `rtk`. If RTK has a dedicated filter it uses it; if not it passes through unchanged. Even in command chains: `rtk git add . && rtk git commit -m "msg"`.
<!-- /rtk-instructions -->
