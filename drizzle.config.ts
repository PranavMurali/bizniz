import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
});
