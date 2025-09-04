import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function chunkSchemaText(text: string) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100
  });
  return splitter.splitText(text);
}

export function guessTables(text: string): string[] {
  const tables = new Set<string>();
  const regex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w\."]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const raw = m[1];
    tables.add(raw.replace(/"/g,'').split('.').pop() || raw);
  }
  return Array.from(tables).slice(0, 64);
}
