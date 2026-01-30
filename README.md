# Personal Nutrition

A clean, modern meal planning application for two, built with Angular and Supabase.

## Features (First Milestone)

- 🔐 Google-only authentication via Supabase Auth
- 🎨 Beautiful Tailwind UI with dark mode support
- 📱 Fully responsive mobile design
- 🏗️ Scalable project architecture with feature modules
- ⚡ Angular signals for reactive state management
- 🔒 Protected routes with auth guards

## Tech Stack

- **Frontend Framework**: Angular 21 (standalone components)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **State Management**: Angular Signals
- **Language**: TypeScript (strict mode)

## Prerequisites

- Node.js (v18 or higher)
- npm
- A Supabase account and project

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Google OAuth provider in Supabase Dashboard:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add authorized redirect URL: `http://localhost:4200/auth/callback`
3. Get your project credentials from Settings > API

### 3. Update Environment Variables

Edit `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-anon-key-here',
};
```

For production, update `src/environments/environment.ts`.

### 4. Run the Application

```bash
npm start
```

The app will be available at `http://localhost:4200`

## Project Structure

```
src/app/
├── core/                      # Singleton services & global providers
│   ├── auth/                  # Authentication logic
│   │   ├── supabase.client.ts # Supabase client instance
│   │   ├── auth.service.ts    # Auth operations
│   │   ├── auth.guard.ts      # Route protection
│   │   ├── auth.interceptor.ts # HTTP interceptor (placeholder)
│   │   └── session.store.ts   # Session state management
│   └── config/
│       └── env.ts             # Environment configuration
├── shared/                    # Reusable components & utilities
│   ├── ui/                    # UI primitives
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   └── spinner/
│   ├── layout/                # Layout components
│   │   ├── auth-layout/
│   │   └── app-shell/
│   └── utils/
│       └── cn.ts              # className utility
├── features/                  # Feature modules
│   ├── auth/                  # Authentication feature
│   │   ├── pages/
│   │   │   ├── login.page.ts
│   │   │   └── callback.page.ts
│   │   ├── components/
│   │   │   └── google-login-button.ts
│   │   └── auth.routes.ts
│   └── home/                  # Home feature
│       ├── pages/
│       │   └── home.page.ts
│       └── home.routes.ts
├── app.routes.ts              # Main routing configuration
└── app.config.ts              # App configuration
```

## Authentication Flow

1. **Login** (`/login`): User clicks "Continue with Google"
2. **OAuth**: Redirects to Google for authentication
3. **Callback** (`/auth/callback`): Handles OAuth response, establishes session
4. **Protected Routes**: All routes under `/` require authentication
5. **Session Management**: Uses signals for reactive auth state

## Dark Mode

Dark mode is configured and ready. To toggle:

- Add `class="dark"` to the `<html>` element
- Future: Add theme toggle service/component

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Next Steps

Once authentication is working:

- [ ] Implement meal planning features
- [ ] Add recipe management
- [ ] Build shopping list functionality
- [ ] Add nutrition tracking
- [ ] Implement backend API integration

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
