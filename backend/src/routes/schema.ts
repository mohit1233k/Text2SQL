import type { Hono } from 'hono';
import { z } from 'zod';
import { Document } from 'langchain/document';
import { chunkSchemaText, guessTables } from '../services/chunk.js';
import { upsertSchemaDocs, listDbIdsForUser } from '../services/vectorstore.js';
import { env } from '../config/env.js';
import type { SchemaDocMeta, SQLDialect } from '../types.js';

const UpsertSchema = z.object({
  userId: z.string().min(1),
  dbId: z.string().min(1),
  dialect: z.enum(["postgres","mysql","sqlite","mssql","bigquery"]).optional(),
  schemaText: z.string().min(5)
});

export default function registerSchema(app: Hono) {
  app.post('/schema/upsert', async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body) return c.json({ error: 'Invalid JSON' }, 400);

    const parsed = UpsertSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

    const { userId, dbId, schemaText } = parsed.data;
    const dialect: SQLDialect = parsed.data.dialect ?? env.DEFAULT_DIALECT;
    console.log(userId,dbId,schemaText);
    
    const chunks = await chunkSchemaText(schemaText)
    const tables = guessTables(schemaText);
    const docs = 
    chunks.map((text, i) => new Document<SchemaDocMeta>({
      pageContent: text,
      metadata: { userId, dbId, dialect, tableHints: tables, chunkIndex: i }
    }));

    await upsertSchemaDocs(docs);
    return c.json({ ok: true, chunks: docs.length, tables });
  });

  app.get('/schema/list', async (c) => {
    const userId = c.req.query('userId');
    if (!userId) return c.json({ error: 'userId required' }, 400);
    const dbs = await listDbIdsForUser(userId);
    return c.json({ userId, dbs });
  });
}