import 'dotenv/config';
import { z } from 'zod';


const EnvSchema = z.object({
PORT: z.string().default('8787'),
NODE_ENV: z.string().optional(),
API_KEYS: z.string().optional(),
GOOGLE_API_KEY: z.string(),
GEMINI_MODEL: z.string().default('gemini-2.0-flash'),
GEMINI_EMBED_MODEL: z.string().default('text-embedding-004'),
QDRANT_URL: z.string().default('http://localhost:6333'),
QDRANT_API_KEY: z.string().optional(),
QDRANT_COLLECTION: z.string().default('schemas_text2sql'),
DEFAULT_DIALECT: z.enum(["postgres","mysql","sqlite","mssql","bigquery"]).default('postgres'),
});


export const env = EnvSchema.parse(process.env);


export const parsedApiKeys = (env.API_KEYS ?? '')
.split(',')
.map(s => s.trim())
.filter(Boolean);