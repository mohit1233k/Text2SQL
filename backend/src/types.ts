export type SQLDialect = "postgres" | "mysql" | "sqlite" | "mssql" | "bigquery";


export interface UpsertSchemaBody {
userId: string; // your tenant/user id
dbId: string; // logical id for a database connection/project
dialect?: SQLDialect; // optional override per db
schemaText: string; // raw DDL text or introspection output
}


export interface GenerateSQLBody {
userId: string;
dbId: string;
question: string; // natural language prompt
dialect?: SQLDialect; // optional override
k?: number; // top-k schema chunks to retrieve
}


export interface SchemaDocMeta {
userId: string;
dbId: string;
dialect: SQLDialect;
tableHints?: string[];
chunkIndex: number;
}