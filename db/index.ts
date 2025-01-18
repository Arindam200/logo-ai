import { drizzle } from 'drizzle-orm/vercel-postgres';
import { config } from 'dotenv';

config({ path: '.env' }); // or .env

export const db = drizzle();

