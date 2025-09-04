import type { Hono } from 'hono';
import { z } from 'zod';
import { env } from '../config/env.js';
import { retrieveSchema } from '../services/vectorstore.js';
import { generateSQLFromContext } from '../llm/chain.js';
import { enforceReadOnly } from '../utils/sql.js';
import type { SQLDialect } from '../types.js';

const GenerateBody = z.object({
  userId: z.string().min(1),
  dbId: z.string().min(1),
  question: z.string().min(3),
  dialect: z.enum(["postgres","mysql","sqlite","mssql","bigquery"]).optional(),
  k: z.number().int().min(1).max(12).optional(),
});

export default function registerGenerate(app: Hono) {
  app.post('/generate/sql', async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body) return c.json({ error: 'Invalid JSON' }, 400);
    const parsed = GenerateBody.safeParse(body);
    if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

    const { userId, dbId, question } = parsed.data;
    const dialect: SQLDialect = parsed.data.dialect ?? env.DEFAULT_DIALECT;
    const k = parsed.data.k ?? 6;

    const hits = await retrieveSchema(userId, dbId, question, k);
    console.log(hits,29);
    
    const snippets = hits.map(h => h.pageContent);
    console.log(snippets,32);
    
    var sql = await generateSQLFromContext(question, snippets, dialect);
    sql = sql.replace(/```sql/i, "").replace(/```/g, "").trim();
    let finalSQL: string;
    try {
      finalSQL = enforceReadOnly(sql);
    } catch (e: any) {
      return c.json({ error: e.message, candidate: sql }, 400);
    }

    return c.json({ sql: finalSQL, dialect, contextChunks: snippets.length });
  });
}