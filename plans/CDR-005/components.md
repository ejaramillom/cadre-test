# CDR-005 — Component Hierarchy

## Atoms (src/shared/ui/atoms/)

### Input
Wraps `<input>`. Accepts all HTML input attributes. Error ring when `aria-invalid="true"`.

### Button
Re-exports Button from `@/components/ui/button`. Allows FSD import discipline.

## Molecules (src/shared/ui/molecules/)

### FormField
Props: `id`, `label`, `type?`, `placeholder?`, `value`, `onChange`, `disabled?`, `error?`
Composes: label + Input + optional `<p role="alert">` for error text.
Error element id: `${id}-error` for aria-describedby linking.

## Organisms (src/features/auth/ui/)

### LoginForm (client component)
Composes: two FormField molecules (email, password) + Button + link to /sign-up
State via useLoginForm hook.
On ok=true: router.push("/profile"). On ok=false: shows error, never reveals which field.

### RegisterForm (client component)
Composes: three FormField molecules (name, email, password) + Button + link to /sign-in
State via useRegisterForm hook.
On 201: auto-login via POST /api/auth/login → router.push("/profile").

### LoginPage (server-compatible)
Card shell + wordmark + LoginForm organism.

### RegisterPage (server-compatible)
Card shell + wordmark + RegisterForm organism.

## Pages (src/app/)

### app/sign-in/page.tsx
Thin wrapper. Mounts LoginPage from features/auth.

### app/sign-up/page.tsx
Thin wrapper. Mounts RegisterPage from features/auth.

### app/(protected)/layout.tsx
Calls auth(). If null: redirect("/sign-in"). Else: renders children.

### app/(protected)/profile/page.tsx
Server component. auth() + prisma.user.findUnique. Renders Card with name, email.

## Dependency Flow

```
app/sign-in/page → features/auth/ui/LoginPage → features/auth/ui/LoginForm (client)
                                                  ├── features/auth/model/useLoginForm
                                                  ├── shared/ui/molecules/FormField
                                                  │    └── shared/ui/atoms/Input
                                                  └── shared/ui/atoms/Button
```
