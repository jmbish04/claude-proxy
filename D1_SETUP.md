# D1 Database Setup Instructions

## Prerequisites

Before deploying, you need to create a D1 database on Cloudflare:

1. Create a D1 database:
   ```bash
   wrangler d1 create claude-proxy-db
   ```

2. Copy the database ID from the output and update `wrangler.toml` and `wrangler.jsonc`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "claude-proxy-db"
   database_id = "YOUR_DATABASE_ID_HERE"  # Replace with actual ID
   ```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Drizzle migrations:
   ```bash
   npm run drizzle:generate
   ```

3. Apply migrations locally (for testing):
   ```bash
   npm run migrate:local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

Use the automated deployment script that handles everything:

```bash
npm run deploy
```

This script will:
1. Generate Drizzle migrations (`npm run drizzle:generate`)
2. Apply migrations to remote D1 database (`npm run migrate:remote`)
3. Deploy the worker to Cloudflare (`wrangler deploy`)

## Manual Migration Steps

If you need to run migrations manually:

```bash
# Apply migrations to remote database
npm run migrate:remote

# Or apply to local database for testing
npm run migrate:local
```

## Database Schema

The `request_trace` table tracks all incoming requests and outgoing responses with the following fields:

- **Request Information**: ID, timestamp, method, URL, path, headers, body
- **Model Information**: Claude model, target model, target base URL
- **Response Information**: Status, headers, body
- **Performance Metrics**: Duration in milliseconds, token usage
- **Client Information**: IP address, user agent
- **Error Tracking**: Error messages for failed requests

## Viewing Logs and Traces

1. View real-time logs during development:
   ```bash
   wrangler tail
   ```

2. Query the D1 database:
   ```bash
   # Open interactive shell
   wrangler d1 execute claude-proxy-db --remote --command "SELECT * FROM request_trace LIMIT 10"
   ```

3. Use Drizzle Studio to browse the database:
   ```bash
   npm run db:studio
   ```

## Configuration Files

- **wrangler.toml**: TOML configuration (traditional format)
- **wrangler.jsonc**: JSONC configuration (verbose format with comments)
- **drizzle.config.ts**: Drizzle Kit configuration for migrations
- **src/db/schema.ts**: Database schema definition

Both wrangler config files are maintained for flexibility. Wrangler will use the TOML file by default, but you can specify JSONC with `--config wrangler.jsonc`.

## Observability

Verbose observability is enabled in both configuration files:
- All logs are sent to the Cloudflare dashboard
- Invocation logs track every function call
- Request/response traces are stored in D1 for analysis

Access logs at: https://dash.cloudflare.com/
