import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import env from './src/utils/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: env.DB_URL },
});
