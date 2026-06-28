# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs php serve, queue worker, pail logs, and vite concurrently)
composer dev

# Frontend only
npm run dev          # Vite dev server
npm run build        # Production build (sourcemaps on, minify off)
npm test             # Vitest (run once) — unit tests under resources/js/**/*.spec.js
npm run test:watch   # Vitest watch mode

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

# Cache & config (Windows shortcut: run `clear.bat` to clear all at once)
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan event:clear
php artisan optimize:clear

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

## Design goals

The architecture exists to serve these aims. When extending the codebase, preserve them — prefer the declarative path, and reach for custom code only where the generic path can't express the need.

- **Declarative by default** — general features should be data, not boilerplate. A model's `columns()` drives query/filter/sort, validation `rules()`, and exports at once; `DeclarativeCrudView` builds a full CRUD page from `fields`/`actions`/`rules` props; services are configured with a single options object; field types are looked up in `fieldRegistry`. Add a column, not a controller method.
- **Flexible & extendable** — escape hatches everywhere the declarative path runs out: `filter: 'custom'` + `filter_class`, `registerFieldType()`, custom `component` on a field, overridable model methods (`update()`, `defaultSort()`), trait composition. New behavior plugs in without forking the core.
- **Scalable for custom stuff & optimization** — `Cacher` prefix-keyed caching, `query2()` Spatie QueryBuilder pipeline, dual web/API responses, and the Inertia-or-SPA switch let features grow and be tuned independently.
- **Consistent in code and usage** — backend and frontend mirror each other: `BaseModel`/`CrudController`/`CrudService`/`useCrud` share the same shape, and `columns:export` keeps TypeScript field consts in lockstep with backend `columns()`. Same patterns top to bottom, so usage is predictable.
- **User-friendly, fluid, intuitive** — composables layer UX concerns (busy overlays via `useBusy`, error dialogs, i18n, idle/session handling) so pages stay focused; navigation and loading state are uniform.
- **Strict yet robust (leeway)** — strictness via `rules()` validation and `permission:`-gated routes + `RoleAuthorization` asserts; leeway/idempotency via `Validable` dropping `required` on updates, `firstOrCreate`/`syncPermissions`/`updateOrCreate` in seeders, `_method` spoofing for multipart PUT, and the axios CSRF refresh+retry/queue and token-refresh flows. Wrong input is rejected; safe retries don't break.
- **Clean, decoupled, testable** — thin controllers delegate to models; cross-cutting logic lives in traits, `Support/`, `Utils/`, and `Filters/`; behavior is exercised by backend feature tests (`tests/Feature/*`) and frontend unit tests (Vitest, `resources/js/**/*.spec.js`). Each piece is verifiable in isolation.
- **Secure by access control** — every state-changing endpoint should sit behind explicit authentication, email verification, and a permission/ownership check. Access is layered: route middleware (`auth:sanctum` → `verified` → `permission:*`), hierarchy enforcement via `RoleAuthorization` (you can't act on equal/higher levels), and mass-assignment limited to each model's `FILLABLE` (validation filtered to fillable by `Validable::validateRequest()`). New endpoints inherit nothing implicitly — they must declare their own gate. See **Backend: Security & access control**.

## Architecture

**Stack**: Laravel 11 + Vue 3 + Inertia.js + Vuetify 3 + TypeScript. SQLite default, MySQL supported.

**Routing**: Four route files:
- `routes/web.php` — guest/auth pages (Inertia), SPA catch-all, and a `storage/{filepath}` route for serving uploaded files (PHP built-in server doesn't follow symlinks)
- `routes/api.php` — API-only routes (notifications CRUD, settings types, user roles/permissions, token refresh, validation rules, lang, debug, bootstrap). Includes `hybrid.php`.
- `routes/hybrid.php` — shared CRUD endpoints included by both web.php and api.php. Handles both Inertia responses and JSON via `ResponseUtil`.
- `routes/console.php` — scheduled tasks

### Backend: BaseModel pattern

Models define a `columns()` method returning field metadata (label, type, filter, sort, search, rules). This single definition drives:
- `query2()` — auto-generates Spatie QueryBuilder filters/sorts from columns
- `rules()` — auto-generates validation rules from columns
- `collection()` / `toExportArray()` — export with human-readable headers

The columns-driven logic lives in the `HasColumnDefinitions` trait (`app/Models/Traits/HasColumnDefinitions.php`). `BaseModel` uses it. Models that can't extend BaseModel (e.g., `User` which extends `Authenticatable`) use the trait directly.

All models use `columns()`: `Chirp` (extends BaseModel), `Setting` (extends BaseModel), `User` (uses trait, extends Authenticatable), `Role` (uses trait, extends Spatie's `SpatieRole`). `Activity` extends Spatie's `SpatieActivity` for activity log.

Custom filter support in `columns()`: set `filter: 'custom'` with `filter_class` (FQCN) and optional `filter_column`. Sort on a different column via `sort_column`, or `sort: 'custom:relation.column'` for relation sorting (e.g. `Role::columns()` `permissions.name` uses `sort: 'custom:permissions.name'`). Example in `User::columns()` for `verified` using `NotNullFilter` on `email_verified_at`.

Models use constants for `TABLE` and `FILLABLE`. Example: `app/Models/Chirp.php`.

`HasRelationshipEntities` trait: models define static `$relationshipEntities` array (e.g., `User` has `['roles', 'permissions']`). `query2()` auto-calls `withEntities()` if the trait is present. Also provides `loadEntities()` for eager-loading after fetch.

`defaultSort()` — optional method on models. `query2()` applies it via Spatie QueryBuilder when defined (e.g., `User::defaultSort()` returns `['name']`).

Traits: `HasColumnDefinitions` (columns-driven query/rules/export), `HasRelationshipEntities` (eager-loads relations), `Validable`.

Controllers live in namespaced subdirs under `app/Http/Controllers/`: `Auth/`, `Chirps/`, `System/` (users, roles, settings, activity, backups, bootstrap, language, debug, validation rules), `User/` (profile, notifications, api tokens), `General/`, `Guest/`.

Generic CRUD controllers extend `CrudController` (`app/Http/Controllers/CrudController.php`) — an abstract class providing `index`, `store`, `show`, `update`, `destroy`, `bulkDestroy`, `export` (e.g. `Chirps\ChirpController`, `System\ActivityController`). Subclasses set `$modelClass`, `$resourcePagePath`, `$routeBase`, `$translationKey`, `$mayExport`, `$userOwned`. Thin — they delegate to `BaseModel::query2()` for listing and `BaseModel::rules()` for validation. Extension points:
- `$permissions` — opt-in `action => permission` map; `authorizeAction()` enforces it (403) at the start of each action. Layers on top of route middleware and `$userOwned` ownership scoping.
- `beforeCreate()` / `beforeUpdate()` — hooks to mutate validated data (e.g. file uploads) without reimplementing `store()`/`update()`. `ChirpController` uses them for photo handling.
- `findItem()` — scopes single-record lookups to the owner when `$userOwned`, preventing IDOR on update/destroy.

Controllers with bespoke authorization or per-field logic (`System\RoleController`, `System\UserController`) extend the base `Controller` instead and call `RoleAuthorization` asserts directly.

`Validable` trait (`app/Models/Traits/Validable.php`) provides `validateRequest()` — filters `rules()` to FILLABLE fields, then drops `required` rules on updates.

### Backend: Dual-response pattern (hybrid routes)

Routes in `routes/hybrid.php` serve both web (Inertia) and API (JSON) clients. Controllers use `ResponseUtil`:
- `jsonInertiaResponse($data, $view)` — returns Inertia render for web, JSON for API
- `jsonRedirectResponse($data, $route, $status)` — redirect for web, `{redirect: url}` in JSON for API
- `jsonStayResponse($data, $status)` — returns JSON without redirect (for modals/dialogs)
- Request detects JSON via `$request->wantsJson()` or `$request->expectsJson()`

This allows a single endpoint to power both SPA page loads and pure API calls.

### Backend: Custom filters

Custom Spatie QueryBuilder filter classes in `app/Filters/`:
- `GlobalSearch` — cross-model search via `model->searchableFields()` or fallback to `getFillable()`. Supports nested relations (e.g., `user->name` resolves to `orWhereHas('user', …)`).
- `NotNullFilter` — `whereNotNull`/`whereNull` on a column. Used by `User::columns()` for `verified` field filtering on `email_verified_at`.
- `DateFromFilter` / `DateToFilter` — date range filters on `created_at`.

### Backend: Exception system

Custom exception classes in `app/Exceptions/` use PHP 8.1 enums for error codes and traits for behavior. Pattern:

1. **Exception code enum** (e.g., `AuthExceptionCode`) — cases map to `statusCode()`, `getMessage()` returning translation keys. Implements `JsonSerializable` via `SerializableEnum`.
2. **Exception class** (e.g., `AuthException`) — extends a Laravel exception, uses traits: `Displayable` (show flag, `toArray()`), `HasErrorCode` (status code/title/message from enum), `HasStatus`, `Redirects`.

Traits in `app/Exceptions/Traits/`: `Displayable`, `HasErrorCode`, `HasStatus`, `HasStatusCode`, `HasTitle`, `Redirects`, `ShowTrace`.

`ExceptionUtil` in `bootstrap/app.php` handles these traits — `shouldShow()` auto-sets `show = true` on auth, validation, throttle, and HTTP exceptions. Exceptions carry `show` (triggers error dialog), `redirect` (triggers redirect response), or `showTrace` (includes file/line/trace) properties.

### Backend: Middleware

Custom middleware in `app/Http/Middleware/`:
- `SetUserLocale` — sets app locale from user preference or session fallback
- `InjectSettingsIntoResponse` — appends `Setting::fetchDict()` to all JSON responses
- `EnsureTokenIsNotExpired` — validates API token expiry on API routes
- `HandleInertiaRequests` — Inertia middleware (shared props via `share()` method)

Spatie Permission middleware is aliased in `bootstrap/app.php` as `role`, `permission`, `role_or_permission` — used to gate route groups (e.g. `permission:role.view`).

### Backend: Support classes

`app/Support/Cacher.php` — prefix-keyed cache layer. `Cacher` (static facade) and `CacherInstance` (instance) provide `remember()`, `get()`, `put()`, `forget()`, `forgetAll()`. Tracks keys in a list so `forgetAll()` can flush everything under a prefix. Used by `Setting::fetchDict()` and `Setting::get()`/`::set()`.

`app/Support/Decimal.php` — cents-stored decimal value object (`POW=2`, `MUL=100`). Methods: `fromFloat()`, `toFloat()`, `fromDatabase()`, `toDatabase()`. Arithmetic: `__add`, `__sub`, `__mul`, `__div`. Comparison: `__eq`, `__neq`, `__lt`, `__lte`, `__gt`, `__gte`. Used by `Setting::getValueAttribute()` for `type: 'decimal'`.

### Backend: Utils

Utility classes in `app/Utils/`:
- `ResponseUtil` — `jsonInertiaResponse()`, `jsonRedirectResponse()`, `jsonStayResponse()`, `jsonRefreshResponse()`, `jsonBackResponse()` for dual web/API responses. All detect JSON vs web via `$request->wantsJson()` / `expectsJson()`.
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

`HandleInertiaRequests::share()` only injects `ziggy` (route definitions). Auth and Jetstream props are commented out — `user`, `settings`, `notifications` are shared via `AppServiceProvider::boot()` instead.

### Backend: Custom login

`CustomLoginResponse` bound as singleton in `AppServiceProvider`. On login, creates a Sanctum personal access token (`auth_token`) and returns it along with the user (via `loadEntities()`) through `ResponseUtil::jsonRedirectResponse()`, redirecting to dashboard.

### Backend: Auth actions (Fortify)

Fortify action classes in `app/Actions/Fortify/`: `CreateNewUser`, `UpdateUserProfileInformation`, `UpdateUserPassword`, `ResetUserPassword`. Registered by `FortifyServiceProvider` with login rate limiter (5 attempts/min).

### Backend: Role-based authorization (RBAC)

Spatie Permission powers roles/permissions. Middleware aliases registered in `bootstrap/app.php`: `role`, `permission`, `role_or_permission`. Routes are gated with `->middleware('permission:role.edit')` etc. (see `routes/hybrid.php` for `system/users` and `system/roles` groups).

**`Role` model** (`app/Models/Role.php`) — extends `SpatieRole`, uses `HasColumnDefinitions` + `HasRelationshipEntities` (`['permissions']`) + `Validable`. Adds `level` (int hierarchy rank) and `can_manage_peers` (bool) columns beyond Spatie defaults. `defaultSort()` → `['name']`. `booted()` defaults `guard_name` to `web` on create.

**`RoleAuthorization`** (`app/Support/RoleAuthorization.php`) — static level-based hierarchy enforcement. Core idea: each user's effective rank is the **max `level`** of their roles; you may only manage targets at a strictly lower level, unless one of your roles has `can_manage_peers` (then you may also manage same-level "peers", with restrictions). Key methods:
- `highestLevel($user)`, `canManagePeers($user)`, `isTargetPeer($actor, $target)`
- `assignableRoles($user)` / `assignablePermissions($user)` — what the actor may grant (roles below own level, plus own level if `can_manage_peers`; permissions limited to those the actor already holds)
- `canCreate/Edit/DeleteRole()`, `canEditUserRoles()`, `canRemoveUserRole/Permission()` — boolean checks
- `assertRoleCreate/Update/Delete()`, `assertUserRoles()`, `assertUserPermissions()` — throw `AuthorizationException` (translation keys in `role.*` / `user.*`). Peers can't have their level or `can_manage_peers` changed, and can't be assigned a level ≥ the actor's.

`System\RoleController` (extends `Controller`, not `CrudController`) — `index`/`store`/`update`/`destroy`/`setPermissions`/`getAvailablePermissions`/`export`. Calls `RoleAuthorization::assert*` before mutating. `normalizeRelationInput()` coerces permission objects to name strings. `System\UserController` likewise asserts via `RoleAuthorization` in `store`/`update`/`setRoles`/`setPermissions`, and `getAvailableRoles`/`getAvailablePermissions` return `assignableRoles`/`assignablePermissions`.

`RolePermissionSeeder` (`php artisan db:seed --class=RolePermissionSeeder`) — seeds `admin` (level 10, `can_manage_peers = true`, all `user.*` + `role.*` + system perms `setting.view`/`setting.edit`/`activity.view`/`backup.manage`) and `chirper` (level 0, `chirp.*` permissions). Migration `*_add_can_manage_peers_to_roles_table` adds the column. System route groups (`system/settings`, `system/activity`, `system/backups`) are gated on these permissions in `routes/hybrid.php`.

### Backend: Security & access control

Intended layering — every protected endpoint should stack these gates explicitly (no implicit inheritance):

1. **Authentication** — `auth:sanctum` + `config('jetstream.auth_session')`. API tokens (`auth_token`, never expiring) or stateful session for `SANCTUM_STATEFUL_DOMAINS`.
2. **Email verification** — `verified` middleware on all app route groups.
3. **Permission** — Spatie `permission:<name>` middleware (e.g. `permission:user.edit`, `role.view`). Permissions are seeded per role; the frontend mirrors with `meta.permission` route guards and `hasPermission()` UI gating (defense in depth, not a substitute for server checks).
4. **Hierarchy** — `RoleAuthorization` asserts inside controllers prevent acting on equal-or-higher levels even when the permission is held (a low admin can't edit a higher admin).
5. **Ownership** — resources tied to a user (`$userOwned` on `CrudController`) must be scoped to `$request->user()` for read/update/delete, not just create.
6. **Mass-assignment** — `Validable::validateRequest()` filters `rules()` to `FILLABLE` before write, so only whitelisted fields persist.

**CSRF**: server-side `validateCsrfTokens` is **commented out** in `bootstrap/app.php` — protection currently relies entirely on the axios 419 refresh-and-retry flow (client side). This is a deliberate but load-bearing trade-off; re-enabling server CSRF is the stricter posture.

**File serving**: the `storage/{filepath}` route (`routes/web.php`) reads from `storage/app/public/`. Because `filepath` is `.*`, it is sanitized against directory traversal — the resolved `realpath` must stay under the public disk or it 404s. Keep that guard if you touch the route.

When adding an endpoint: pick its permission, gate the route, add a `RoleAuthorization` assert if it touches roles/users, and scope by owner if `$userOwned`. A route under `auth`+`verified` only is reachable by **every** verified user.

### Backend: Model-specific behaviors

**User** (`app/Models/User.php`) — extends `Authenticatable`, uses trait directly instead of BaseModel. `$appends = ['profile_photo_url', 'verified']`. `update()` override syncs roles/permissions and handles email change (resets verification). `refreshToken()` deletes old Sanctum token, creates new `auth_token`.

**Setting** (`app/Models/Setting.php`) — key-value store with typed values (`TYPES` array). `getValueAttribute()` casts raw value based on `type` column (uses `Decimal` for decimal, `Carbon` for dates). All reads cached via `Cacher`. `update()` override validates then flushes cache.

**Chirp** (`app/Models/Chirp.php`) — extends BaseModel. `$dispatchesEvents = ['created' => ChirpCreated::class]` — Laravel auto-dispatches on model events, not manual `::dispatch()`.

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

**Inertia page resolution** (`app.js`): `resolvePageComponent` resolves `./modules/${name}.vue` against eager glob `./modules/**/pages/*.vue`. Page component names map to paths: `chirps/Index` → `resources/js/modules/chirps/pages/Index.vue`. Inertia page components live in `resources/js/modules/**/pages/*.vue`.

**Route definitions** (`resources/js/router/index.js`):
- Guest routes have `meta: { guest: true }`
- Authenticated routes have breadcrumb metadata
- SPA fallback in `routes/web.php` (last route) — `Route::view('/{any}', 'app')->where('any', '.*')`

**Guards** (`router/guards.js`):
- Guest route + logged in → redirect to dashboard
- Protected route + not logged in → redirect to login with `redirect` query
- `meta.permission` set + logged in lacking that permission → redirect to dashboard (e.g. `system.roles.index` has `meta.permission: 'role.view'`)
- After each navigation, breadcrumbs set from `route.meta.breadcrumbs`
- `routerBusy` flag toggled on navigation start/end (used by loading overlays)

**Critical navigation rule**: Always use `route('name')` helper from Ziggy for hrefs. Hardcoded paths (`'/'`, `'/register'`) bypass router and cause 403 errors in SPA mode. The `route()` helper resolves to the correct base path and works in both modes.

### Frontend: Composition API with composables

All Vue components use `<script setup>` with Composition API. Composables in `resources/js/composables/` build on each other in layers:

- **Base**: `useBase()` → `useAuth()` → `useWorking()` → `useViewBase()` — each wraps the previous. `useAuth()` exposes `user`, `userRoles`, `userPermissions`, `userPermissionNames` (Set), `hasPermission(name)`, `hasAnyPermission([...])`, `userRolesText` — used to permission-gate nav items (`SideNavDrawer.vue`) and UI actions.
- **Forms**: `useFormBase()` + `useDialog()` → `useCrudForm()` → `useCrudFormDialog()` — bundles 4 composables for form dialog boilerplate
- **CRUD**: `useCrud()` (fetch/create/delete/setField/toggleField) → `useCrudView()` (adds table state: pagination, search, export, selection)
- **Context**: `useCrudContext()` — provide/inject for CRUD context, used by `GenericField`

`useBusy()` — global singleton busy counter via provide/inject. Prefer `run(fn)` over `start()/end()` (try/finally safety).

Most CRUD pages use `DeclarativeCrudView` — config-driven table taking `fields`, `actions`, `bulkActions`, `rules` props. Renders `<GenericField>` per cell, `<FormDialog>` for create/edit.

### Frontend: Field system

**Field definitions** — normalised by `normalizeField()` in `fieldSchema.js`. Defaults: `type: "text"`, `table: true`, `editable: false`, `form: true`. Extra props pass through via spread.

**GenericField** (`components/form/GenericField.vue`) — three rendering branches:
1. **Custom component** — `field.component` set → renders component directly, no edit chrome
2. **Bypass mode** — form/modal, renders thin Field component with v-model. `CrudForm` sets `bypassEditableCell: true`
3. **Table mode** — inline edit with pencil/check/cancel buttons + `ConfirmationSlot`

**`makeBindings(f, item)`** — only spreads `f.props`. Properties like `items`, `multiple`, `itemTitle` must go inside `props`, not at field root level.

**`fieldRegistry.js`** maps types to components: `text`/`string`, `textarea`, `select`, `multiselect` (→ `FieldMultiSelect.vue`, used for role permissions), `number`/`integer`, `bool`/`boolean`, `date`/`datetime`, `currency`, `json`, `relational`. Register new types via `registerFieldType(type, components)`.

**`CrudForm`** — iterates field definitions, renders `<GenericField>` per field with `bypassEditableCell` and `:show-title`.

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
- `resources/js/libs/util.js` — 40+ helpers: `getByPath`, `setByPath`, `combineCollection`, `makeBindings`, `filterObject`, `getData`, `selectFilled`, `isObject`, `daysBetween`, `deepAssign`, `deepMerge`, `jsonToFormData`, `arraysEqual`, `formatDate`, `checkCsrfError`, `isInertiaForm`, etc.
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

Domain services: `notification.js`, `activity.js` — extend `CrudService`.

### Path aliases

`@` and `/@/` both resolve to `resources/js/`.


## Environment & configuration

**Key env vars** (`.env.example`):
- `VITE_API_BASE_URL` — Backend API URL for axios (frontend)
- `VITE_APP_MODE` — `inertia` (default) or `spa` — switches frontend routing mode
- `APP_URL` — application base URL
- `SESSION_DRIVER=database` — sessions stored in DB (allows invalidation)
- `SANCTUM_STATEFUL_DOMAINS` — domains that receive session auth instead of tokens

**Fortify** (`config/fortify.php`): features enabled — registration, resetPasswords, emailVerification, updateProfileInformation, updatePasswords, twoFactorAuthentication (with confirmation). Login rate limit: 5 attempts/min. Username: email.

**Permission** (`config/permission.php`): 24h cache, team permissions disabled, wildcard permissions disabled.

**App configuration** (`config/app.php`):
- `'spa_mode'` — derived from `VITE_APP_MODE` via `env()`
- Locale settings: `APP_LOCALE`, `APP_FALLBACK_LOCALE`
- Timezone: `APP_TIMEZONE=UTC`

**Frontend build**: `vite.config.js` — dev server on `localhost:5173` (HMR `localhost`). Build: `minify: false`, `sourcemap: true`. Plugins: `laravel`, `vue` (with `transformAssetUrls` + babel `decorators` parser plugin), `vuetify` (auto-import with `labs: true`), `vueDevTools`. Aliases: `@` and `/@/` → `resources/js`. Auto-runs `php artisan lang:export`, `validation:export`, `columns:export` on every dev/build start. This keeps TypeScript types and Vue i18n JSON in sync with backend models/validation.

**Sanctum**: API tokens never expire (`expiration: null` in `config/sanctum.php`). Middleware: `api`, `authenticate_session`, `encrypt_cookies`, `validate_csrf_token`.

**CSRF**: `validateCsrfTokens` middleware is **commented out** in `bootstrap/app.php`. CSRF protection relies entirely on the axios response interceptor handling 419 responses — it refreshes the CSRF token once via `/sanctum/csrf-cookie` and retries queued requests. If the refresh fails, the session is cleared and user redirected to login. Missing CSRF cookie triggers a page reload in `axios.js:initXsrf()`.

**Session**: Database driver, table `sessions`, 120 min lifetime. Timeout handled on frontend: 300s idle + 300s logout countdown (SharedIdle + IdleOverlay components).

## Critical file locations

| Path | Purpose |
|------|---------|
| `bootstrap/app.php` | Middleware stack, exception handler registration |
| `routes/web.php` | Guest + authenticated Inertia routes, storage file serving, SPA catch-all |
| `routes/api.php` | API-only endpoints (notifications, settings, lang, validation, debug) |
| `routes/hybrid.php` | Shared CRUD endpoints for both web and API |
| `routes/console.php` | Scheduled tasks |
| `clear.bat` | Windows shortcut: clears all Laravel caches at once |
| `app/Models/Traits/HasColumnDefinitions.php` | Core columns-driven query/rules/export logic |
| `app/Models/BaseModel.php` | Base model using HasColumnDefinitions |
| `app/Models/Setting.php` | Key-value typed settings with Cacher integration |
| `app/Models/User.php` | User model with roles, permissions, 2FA, profile photo |
| `app/Models/Role.php` | Role model (extends SpatieRole) with `level` + `can_manage_peers` |
| `app/Support/RoleAuthorization.php` | Level-based RBAC hierarchy enforcement (assert*/can*/assignable*) |
| `app/Http/Controllers/System/RoleController.php` | Role CRUD + permission sync (extends base Controller) |
| `app/Support/Cacher.php` | Prefix-keyed cache layer with key tracking |
| `app/Support/Decimal.php` | Cents-stored decimal value object |
| `app/Exceptions/` | Exception classes with enum error codes + traits |
| `app/Filters/` | Custom Spatie filters: GlobalSearch, NotNullFilter, DateFrom/To |
| `app/Actions/Fortify/` | Fortify auth action classes (CreateNewUser, etc.) |
| `app/Http/Controllers/CrudController.php` | Abstract CRUD controller (index/store/show/update/destroy/bulkDestroy/export) |
| `app/Utils/ResponseUtil.php` | Dual-response helpers (jsonInertiaResponse, jsonRedirectResponse, etc.) |
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

**SPA mode catch-all** — `routes/web.php` `Route::view('/{any}', 'app')->where('any', '.*')` MUST be last (guarded by `config('app.spa_mode')`). The `storage/{filepath}` route is defined before it. Any routes defined after the catch-all are unreachable.

**columns() mismatch** — Backend `columns()` keys must match frontend field `value`/`name` props. `php artisan columns:export` generates TypeScript consts in `resources/js/types/generated/` — use these to avoid typos.

**Auth redirect loops** — SPA guard redirects logged-in users from guest routes to `dashboard`. Ensure guest pages have `meta: { guest: true }` in `router/index.js`.

**Uploaded file 404s** — The `storage/{filepath}` route in `routes/web.php` serves files from `storage/app/public/` directly. PHP built-in server doesn't follow the `public/storage` symlink, and Apache may block `/storage/` URIs. This route is the fallback for both cases.

