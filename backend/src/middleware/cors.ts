import { cors } from 'hono/cors';
export const withCORS = () => cors({
  origin: '*',
  allowMethods: ['GET','POST','OPTIONS'],
  allowHeaders: ['Content-Type','Authorization','x-api-key']
});