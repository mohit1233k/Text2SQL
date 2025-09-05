import { useState } from "react";
import Header from "./components/Header";
import SchemaUploader from "./components/SchemaUploader";
import QuestionBox from "./components/QuestionBox";
import ResponseBox from "./components/ResponseBox";
import Footer from "./components/Footer";
import axios from "axios";

const DIALECTS = [
  { value: "postgres", label: "Postgres" },
  { value: "mysql", label: "MySQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "mssql", label: "MSSQL" },
  { value: "bigquery", label: "BigQuery" },
];

export default function App() {
  const [userId] = useState("user-" + Math.floor(Math.random() * 10000));
  const [dbId, setDbId] = useState("db1");
  const [dialect, setDialect] = useState("postgres");
  const [schemaText, setSchema] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [schemaUploaded, setSchemaUploaded] = useState(false);

  async function handleUploadSchema() {
    if (!schemaText.trim()) {
      setResponse({ error: "Please paste your schema first!" });
      return;
    }
    setLoading(true);
    setResponse(null);
    try {
      await axios.post(
        "http://localhost:8787/schema/upsert",
        {
          userId,
          dbId,
          dialect,
          schemaText,
        },
        {
          headers: { "x-api-key": "keepitsecret" },
        }
      );
      setSchemaUploaded(true);
      setResponse({ message: "✅ Schema ingested successfully!" });
    } catch (err: any) {
      let errorMsg = "Schema upload failed ❌";
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.message) {
        errorMsg = err.message;
      }
      setResponse({ error: errorMsg });
    } finally {
      setLoading(false);
    }
  }

  async function handleAsk() {
    if (!schemaUploaded) {
      setResponse({ error: "Please upload schema first!" });
      return;
    }
    if (!question.trim()) {
      setResponse({ error: "Please enter a question!" });
      return;
    }
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post(
        "http://localhost:8787/generate/sql",
        {
          userId,
          dbId,
          question,
          dialect,
        },
        {
          headers: { "x-api-key": "keepitsecret" },
        }
      );
      setResponse(res.data);
    } catch (err: any) {
      setResponse(err.response?.data ?? { error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center overflow-x-hidden">
    <div className="w-full px-4 py-10 flex flex-col gap-10">
      <Header />
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <SchemaUploader
          schemaText={schemaText}
          setSchema={setSchema}
          dbId={dbId}
          setDbId={setDbId}
          dialect={dialect}
          setDialect={setDialect}
          loading={loading}
          handleUploadSchema={handleUploadSchema}
          DIALECTS={DIALECTS}
        />

        <QuestionBox
          question={question}
          setQuestion={setQuestion}
          loading={loading}
          handleAsk={handleAsk}
        />
      </div>
      {/* Response Box */}
      <ResponseBox response={response} />
      <Footer />
    </div>
  </div>
);

}
