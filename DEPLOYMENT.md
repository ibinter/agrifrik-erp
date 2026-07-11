# Deployment Guide — AGRIFRIK ERP

## Environment Variables

Create `.env.local` in `agrifrik-erp/`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Auth
JWT_SECRET=your-secret-key-min-32-chars

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@agrifrik.com

# Weather
OPENWEATHER_API_KEY=your-key

# App
NEXT_PUBLIC_APP_URL=https://erp.agrifrik.com
```

## Supabase Setup

1. Create a new Supabase project
2. Run migrations:
```bash
supabase db push
# or manually run supabase/migrations/001_initial_schema.sql
```
3. Run seed data:
```bash
psql $DATABASE_URL < supabase/seed.sql
```

## Vercel Deployment

```bash
vercel --cwd agrifrik-erp
```

Or push to GitHub and connect to Vercel for automatic deployments.

## Production Checklist

- [ ] Environment variables configured
- [ ] Supabase database migrated
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics (Vercel Analytics) enabled
- [ ] Backup schedule configured
