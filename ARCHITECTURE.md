# Architecture Overview

This document explains the architecture decisions and patterns used in Personal Nutrition.

## Architecture Principles

### 1. Feature-Based Structure

The application is organized by features rather than technical layers:

```
features/
  ├── auth/          # Authentication feature
  ├── home/          # Home/dashboard feature
  └── ...future features
```

**Benefits**:

- Each feature is self-contained and can be developed independently
- Easy to navigate and understand the codebase
- Natural lazy-loading boundaries
- Clear ownership and responsibility

### 2. Core vs Shared vs Features

#### Core (`core/`)

- **Purpose**: Singleton services and global state
- **Examples**: AuthService, SessionStore, configuration
- **Rule**: Should be provided at root level

#### Shared (`shared/`)

- **Purpose**: Reusable, generic components and utilities
- **Examples**: Button, Card, layouts, utilities
- **Rule**: No feature-specific logic or business rules

#### Features (`features/`)

- **Purpose**: Feature-specific pages, components, and logic
- **Examples**: LoginPage, HomePage, feature routes
- **Rule**: Can use core and shared, but not other features

## State Management

### Signals-Based Architecture

We use Angular signals for all state management:

```typescript
// SessionStore example
class SessionStore {
  private readonly _status = signal<AuthStatus>('loading');
  readonly status = this._status.asReadonly();
  readonly isAuthenticated = computed(() => this._status() === 'authenticated');
}
```

**Why Signals?**

- Fine-grained reactivity
- Better performance than Zone.js change detection
- Simpler than RxJS for local state
- Built-in to Angular (no external dependencies)

**Guidelines**:

- Private writable signals with public readonly versions
- Use `computed()` for derived state
- Use `effect()` for side effects
- Never mutate signal values directly

## Routing Strategy

### Lazy Loading

All features are lazy-loaded:

```typescript
{
  path: 'auth',
  loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
}
```

**Benefits**:

- Smaller initial bundle size
- Faster initial load
- Code splitting at feature boundaries

### Route Guards

Authentication is handled via functional guards:

```typescript
export const authGuard: CanActivateFn = () => {
  const sessionStore = inject(SessionStore);
  const router = inject(Router);
  return sessionStore.isAuthenticated() || router.createUrlTree(['/login']);
};
```

**Why Functional Guards?**

- Composable and testable
- No class boilerplate
- Direct injection via `inject()`

## Component Patterns

### Standalone Components

All components are standalone (no NgModules):

```typescript
@Component({
  selector: 'app-button',
  imports: [/* direct dependencies */],
  template: `...`
})
```

**Benefits**:

- Simpler mental model
- Clear dependencies
- No need for modules
- Easier to understand component requirements

### Input/Output Functions

Using modern input/output functions:

```typescript
class MyComponent {
  // Instead of @Input()
  name = input<string>();
  count = input.required<number>();

  // Instead of @Output()
  clicked = output<void>();
}
```

**Benefits**:

- Better type safety
- Signal-based by default
- Cleaner syntax
- Required inputs are enforced

### Smart vs Presentational

**Smart Components** (Pages):

- Inject services
- Manage state
- Handle business logic
- Example: `LoginPage`

**Presentational Components** (UI):

- Input/output only
- No service injection
- Pure presentation
- Example: `ButtonComponent`

## Authentication Flow

### Session Management

```
1. App Init → AuthService constructor
2. AuthService → getSession() from Supabase
3. AuthService → onAuthStateChange subscription
4. Any auth change → SessionStore.setSession()
5. Components → reactive to SessionStore signals
```

### OAuth Flow

```
1. User clicks "Sign in with Google"
2. AuthService.signInWithGoogle()
3. Redirect to Google OAuth
4. Google callback → /auth/callback
5. CallbackPage waits for session
6. SessionStore updates → navigate to /
```

## Styling Architecture

### Tailwind Utility-First

Using Tailwind CSS with a custom design system:

```scss
// CSS Variables for theming
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  // ... more variables
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  // ... dark theme overrides
}
```

### Class Composition Utility

Using `cn()` utility for conditional classes:

```typescript
cn('base-classes', condition && 'conditional-classes', props.class());
```

**Benefits**:

- Type-safe class names
- Automatic conflict resolution
- Clean conditional logic

## Type Safety

### Strict TypeScript

`tsconfig.json` has strict mode enabled:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

### Type Patterns

**Prefer Type Inference**:

```typescript
const name = 'John'; // Type inferred as string
```

**Explicit When Needed**:

```typescript
const status = signal<AuthStatus>('loading'); // Explicit generic
```

**Avoid Any**:

```typescript
// Bad
function process(data: any) {}

// Good
function process(data: unknown) {}
```

## Error Handling

### User-Facing Errors

```typescript
try {
  await authService.signInWithGoogle();
} catch (error) {
  console.error('Login error:', error);
  errorMessage.set('User-friendly error message');
}
```

**Principles**:

- Log technical errors to console
- Show user-friendly messages
- Always have a fallback/retry option

## Performance Considerations

### Change Detection

All components use `OnPush`:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

**Why?**

- Signals trigger precise updates
- No need for Zone.js overhead
- Better performance with large apps

### Bundle Size

- Lazy loading reduces initial bundle
- Tree-shaking removes unused code
- Tailwind purges unused styles in production

## Testing Strategy (Future)

### Planned Testing Approach

**Unit Tests**:

- Services with Vitest
- Pure functions and utilities
- State management logic

**Component Tests**:

- Presentational components in isolation
- Input/output behavior
- UI rendering

**Integration Tests**:

- Feature flows
- Auth flow end-to-end
- Route navigation

## Security Considerations

### Client-Side Security

1. **Supabase Anon Key**: Safe for client use, protected by RLS
2. **Auth Tokens**: Stored in Supabase SDK (httpOnly cookies)
3. **Route Guards**: Prevent unauthorized access to protected routes
4. **HTTPS Only**: Production must use HTTPS

### Future Backend Security

When adding backend:

- Use auth interceptor to add Bearer tokens
- Validate tokens on server
- Implement RLS policies in Supabase
- Rate limiting on API endpoints

## Scalability

### How to Add a New Feature

1. Create feature folder: `features/my-feature/`
2. Add pages: `features/my-feature/pages/`
3. Add components: `features/my-feature/components/`
4. Create routes: `features/my-feature/my-feature.routes.ts`
5. Add to main routes: `app.routes.ts`

Example:

```typescript
// features/meal-planning/meal-planning.routes.ts
export const mealPlanningRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/meal-list.page').then(m => m.MealListPage)
  }
];

// app.routes.ts
{
  path: 'meals',
  loadChildren: () => import('./features/meal-planning/meal-planning.routes')
    .then(m => m.mealPlanningRoutes),
  canActivate: [authGuard]
}
```

### State Composition

For complex state, compose stores:

```typescript
// Multiple stores
class MealStore {}
class ShoppingListStore {}
class PreferencesStore {}

// Composed in component
class MealPlanningPage {
  private readonly mealStore = inject(MealStore);
  private readonly shoppingStore = inject(ShoppingListStore);
}
```

## Folder Structure Conventions

```
feature-name/
├── pages/              # Route components (smart)
│   └── *.page.ts       # Suffix: .page.ts
├── components/         # Feature-specific components
│   └── *.component.ts  # Suffix: .component.ts
├── services/           # Feature-specific services
│   └── *.service.ts    # Suffix: .service.ts
├── models/             # TypeScript interfaces/types
│   └── *.model.ts      # Suffix: .model.ts
└── feature.routes.ts   # Feature routes
```

## Dependencies

### Core Dependencies

- `@angular/*`: Framework
- `@supabase/supabase-js`: Auth and backend
- `rxjs`: Observables (minimal use)

### UI Dependencies

- `tailwindcss`: Styling
- `clsx`: Class composition
- `tailwind-merge`: Tailwind conflict resolution

### Why These Choices?

- **Supabase**: Full backend-as-a-service, easy auth, good DX
- **Tailwind**: Utility-first, great DX, small production bundle
- **Signals**: Angular-native, performant, simple API
- **Standalone Components**: Modern Angular, simpler architecture

## Future Enhancements

### Phase 2 (Post-Auth)

- Meal planning CRUD
- Recipe database
- Shopping list generation

### Phase 3

- Nutrition tracking
- Meal scheduling
- Collaborative features (for two people)

### Phase 4

- Progressive Web App (PWA)
- Offline support
- Push notifications
