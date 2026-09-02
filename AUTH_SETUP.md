# Odysha authentication and privacy setup

1. Create a Supabase project in the team-owned organisation (not a personal local database).
2. In **Authentication**, enable Email and Google. Keep email confirmation enabled. Add your local and production URLs to Redirect URLs.
3. Run `supabase/migrations/20260902_initial_privacy_schema.sql` in the Supabase SQL Editor.
4. Copy `.env.example` to `.env.local` and add only the project URL and publishable key. Do not commit `.env.local` and never use a `service_role` key in the browser.
5. Before launch, configure SMTP with a team-owned sender domain, CAPTCHA/rate limits, database backups, and MFA for all Supabase administrators.
6. Add a privacy policy, consent wording for optional safety requests, data-retention rules, and an account-deletion request flow before collecting real travellers' data.

The RLS rules are the access boundary: every user can read and change only rows with their own authenticated user ID.
