# OIDC Provider User Management

This module implements a self-hosted OIDC (OpenID Connect) provider for Daytona using [node-oidc-provider](https://github.com/panva/node-oidc-provider). It enables local user management with email/password authentication while maintaining the dashboard as an OIDC-only client.

## Architecture

### Components

1. **OidcModule** - Main NestJS module that initializes the OIDC provider
2. **OidcProviderController** - Mounts the OIDC provider at `/api/oidc/*` and handles all protocol endpoints
3. **OidcController** - Manages OIDC interaction flows (login, register, consent)
4. **AuthService** - Handles user registration, login, and password management
5. **JwksService** - Manages JSON Web Key Sets (generates and stores keys in database)
6. **OidcAdapter** - TypeORM-based storage adapter for OIDC sessions and tokens
7. **UserCredential Entity** - Stores hashed passwords for local authentication
8. **OidcModel Entity** - Stores OIDC sessions, tokens, and authorization codes
9. **Jwks Entity** - Stores signing keys (persisted across restarts)

### Flow

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│  Dashboard  │                    │   API/OIDC  │                    │  Database   │
│   (Client)  │                    │  Provider   │                    │             │
└──────┬──────┘                    └──────┬──────┘                    └──────┬──────┘
       │                                  │                                   │
       │ 1. /authorize request            │                                   │
       ├─────────────────────────────────>│                                   │
       │                                  │                                   │
       │ 2. Redirect to login page        │                                   │
       │<─────────────────────────────────┤                                   │
       │                                  │                                   │
       │ 3. POST credentials              │                                   │
       ├─────────────────────────────────>│                                   │
       │                                  │ 4. Validate & store session       │
       │                                  ├──────────────────────────────────>│
       │                                  │                                   │
       │ 5. Redirect with auth code       │                                   │
       │<─────────────────────────────────┤                                   │
       │                                  │                                   │
       │ 6. Exchange code for tokens      │                                   │
       ├─────────────────────────────────>│                                   │
       │                                  │                                   │
       │ 7. Access + ID tokens            │                                   │
       │<─────────────────────────────────┤                                   │
       │                                  │                                   │
```

## Configuration

### Environment Variables

Add these variables to your `.env` file:

```bash
# OIDC Provider Configuration
OIDC_PROVIDER_CLIENT_SECRET=your-secure-client-secret-here
OIDC_PROVIDER_COOKIE_SECRET=your-secure-cookie-secret-here

# Update existing OIDC config to point to self
OIDC_ISSUER_BASE_URL=http://localhost:3001/api/oidc
OIDC_CLIENT_ID=daytona
OIDC_AUDIENCE=daytona
```

### Signing Keys (JWKS)

**Keys are automatically generated and stored in the database** on first startup. They persist across restarts, ensuring tokens remain valid.

- Keys are generated using RSA 2048-bit
- Stored in the `jwks` table
- No manual configuration needed
- Keys are automatically rotated (future enhancement)

## Database Migration

Run the migration to create the required tables:

```bash
yarn migration:run
```

This creates:

- `user_credential` - Stores password hashes
- `oidc_model` - Stores OIDC sessions, tokens, and codes
- `jwks` - Stores signing keys

## User Management

### Registration

Users can register through the login page by clicking "Sign Up". Required fields:

- Name
- Email
- Password (minimum 8 characters)

New users are created with:

- `emailVerified: false`
- `role: USER`
- Unique ID format: `local|<random-hex>`

### Login

Users authenticate with email and password. The system:

1. Validates credentials against stored password hash
2. Creates an OIDC session
3. Issues authorization code
4. Dashboard exchanges code for tokens

### Password Management

The `AuthService` provides methods for:

- `changePassword()` - Update user password with validation
- Password requirements: minimum 8 characters
- Passwords are hashed using bcrypt with salt rounds of 10

## API Endpoints

### OIDC Standard Endpoints

- `GET /api/oidc/.well-known/openid-configuration` - Discovery endpoint
- `GET /api/oidc/auth` - Authorization endpoint
- `POST /api/oidc/token` - Token endpoint
- `GET /api/oidc/userinfo` - User info endpoint
- `POST /api/oidc/revoke` - Token revocation
- `GET /api/oidc/jwks` - JSON Web Key Set
- `POST /api/oidc/logout` - RP-initiated logout

### Interaction Endpoints

- `GET /api/oidc/interaction/:uid` - Login/consent UI
- `POST /api/oidc/interaction/:uid/login` - Submit login credentials
- `POST /api/oidc/interaction/:uid/register` - Register new user
- `POST /api/oidc/interaction/:uid/confirm` - Confirm consent
- `POST /api/oidc/interaction/:uid/abort` - Cancel authorization

## Security Considerations

### Password Storage

- Passwords are hashed using bcrypt
- Salt rounds: 10
- Never store plain text passwords

### Session Management

- Sessions stored in database via OidcModel
- Configurable TTLs:
  - Access Token: 1 hour
  - Refresh Token: 7 days
  - Session: 14 days
  - Authorization Code: 10 minutes

### PKCE Support

- Supports S256 method
- Not required by default (can be enabled in config)

### Client Authentication

- Uses `client_secret_post` method
- Secret stored in environment variable

## Customization

### Branding

Update the login/consent pages in [oidc.controller.ts](./oidc.controller.ts):

- `renderLoginPage()` - Customize login UI
- `renderConsentPage()` - Customize consent UI

### Claims

Add custom claims in [oidc-provider.config.ts](./oidc-provider.config.ts):

```typescript
claims: {
  openid: ['sub'],
  email: ['email', 'email_verified'],
  profile: ['name', 'picture'],
  custom: ['custom_claim'],  // Add your claims
}
```

Then update `AuthService.getUserWithClaims()` to include the new claims.

### Token TTLs

Adjust token lifetimes in [oidc-provider.config.ts](./oidc-provider.config.ts):

```typescript
ttl: {
  AccessToken: 1 * 60 * 60,      // 1 hour
  RefreshToken: 7 * 24 * 60 * 60, // 7 days
  // ... other TTLs
}
```

## Dashboard Integration

The dashboard (`apps/dashboard`) is already configured as an OIDC client. No changes needed if:

1. `DASHBOARD_URL` environment variable is set correctly
2. OIDC issuer points to `http://your-api:3001/api/oidc`

The dashboard uses:

- `react-oidc-context` for OIDC client
- Authorization Code flow with PKCE
- Automatic token refresh

## Troubleshooting

### "OIDC provider not initialized"

Check that:

1. `OidcModule` is imported in `app.module.ts`
2. Database connection is working
3. Required environment variables are set

### Login page not showing

Verify:

1. OIDC provider controller is registered in `OidcModule`
2. Provider is properly initialized in `onModuleInit`
3. Controller is properly initialized with provider instance

### Token validation fails

Ensure:

1. JWKS keys were generated (check `jwks` table in database)
2. Issuer URL matches in both provider and dashboard config (`/api/oidc`)
3. Client ID and secret match across configs

### Database errors

Check:

1. Migrations have been run (`yarn migration:run`)
2. Database schema is up to date
3. TypeORM entities are properly registered

## Development vs Production

### Development

- Keys auto-generated and stored in database
- HTTP allowed
- Cookie secrets can be simple strings

### Production

- Keys auto-generated on first startup (persisted in database)
- **Must** use HTTPS
- **Must** use strong, random cookie secrets (environment variables)
- Consider using environment-specific secrets management (Vault, AWS Secrets Manager, etc.)
- Backup `jwks` table for disaster recovery

## Migration from External OIDC

If migrating from an external OIDC provider (like Dex):

1. Keep both systems running initially
2. Migrate users gradually:
   - Create user accounts with matching emails
   - Set `emailVerified: true` for migrated users
   - Optionally require password change on first login
3. Update dashboard OIDC config to point to new provider
4. Decommission old OIDC provider once migration is complete

## Additional Resources

- [node-oidc-provider Documentation](https://github.com/panva/node-oidc-provider/tree/main/docs)
- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)
- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [PKCE RFC](https://tools.ietf.org/html/rfc7636)
