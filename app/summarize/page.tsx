"use client"

import { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SummarizePage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAsking, setIsAsking] = useState(false);
  const [qnaError, setQnaError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [isGeneratingEMR, setIsGeneratingEMR] = useState(false);
  const [emrError, setEmrError] = useState<string | null>(null);

  // Generate EMR data from conversation log and download as PDF
  async function onGenerateEMR() {
    setIsGeneratingEMR(true);
    setEmrError(null);
    try {
      const response = await fetch("/api/generate-emr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      if (!response.ok) {
        // Try to parse error JSON
        let errorMsg = "Failed to generate EMR PDF.";
        try {
          const data = await response.json();
          errorMsg = data?.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'emr-report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setEmrError(err.message || "Something went wrong.");
    } finally {
      setIsGeneratingEMR(false);
    }
  }

  // Send message handler (general chat)
  async function onSendMessage() {
    const question = input.trim();
    if (!question) return;
    setIsAsking(true);
    setQnaError(null);
    setInput("");
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: question }]);
    try {
      const response = await fetch("/api/general-qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: question }] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to get answer.");
      setMessages(prev => [...prev, { role: "assistant", content: data?.answer || "No answer returned." }]);
    } catch (err: any) {
      setQnaError(err.message || "Something went wrong.");
    } finally {
      setIsAsking(false);
    }
  }

  function handleFile(file: File | null) {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setError(null);
    setSelectedFile(file);
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)

    const droppedFile = event.dataTransfer.files?.[0] ?? null
    handleFile(droppedFile)
  }

  async function onSubmit() {
    if (!selectedFile) {
      setError("Select a PDF first.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to summarize document.");
      }
      // Append summary as assistant message
      setMessages(prev => [...prev, { role: "assistant", content: data?.result || "No summary returned." }]);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clinical Document Summarizer</h1>
          <p className="text-sm text-muted-foreground">Chat with the AI or upload a PDF for summarization.</p>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">Back Home</Button>
        </Link>
      </div>

      {/* Chat history */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-72 overflow-y-auto flex flex-col gap-2 p-2 bg-muted rounded">
            {messages.length === 0 && <p className="text-sm text-muted-foreground">Start a conversation or upload a PDF to summarize.</p>}
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {msg.role === "assistant" ? (
                  <span className={`inline-block px-3 py-2 rounded bg-card/70 text-foreground whitespace-pre-wrap max-w-full text-left`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </span>
                ) : (
                  <span className={`inline-block px-3 py-2 rounded bg-primary/80 text-white whitespace-pre-wrap max-w-full`}>
                    {msg.content}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat input bar with PDF upload, summarize, and EMR generation */}
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              className="flex-1 rounded border px-3 py-2 text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") onSendMessage(); }}
              disabled={isAsking}
            />
            <Button onClick={onSendMessage} disabled={isAsking || !input.trim()}>
              {isAsking ? "Sending..." : "Send"}
            </Button>
            <div className="relative">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
                style={{ width: 40, height: 40 }}
                onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
                tabIndex={-1}
              />
              <Button
                variant={selectedFile ? "default" : "outline"}
                size="icon"
                asChild
                tabIndex={0}
                title={selectedFile ? selectedFile.name : "Upload PDF"}
              >
                <span role="img" aria-label="Upload PDF">📄</span>
              </Button>
            </div>
            <Button onClick={onSubmit} disabled={!selectedFile || isSubmitting}>
              {isSubmitting ? "Summarizing..." : "Summarize Document"}
            </Button>
            <Button onClick={onGenerateEMR} disabled={isGeneratingEMR || messages.length === 0}>
              {isGeneratingEMR ? "Generating..." : "Generate EMR data"}
            </Button>
          </div>
          {/* Show selected file name */}
          {selectedFile && (
            <div className="text-xs text-muted-foreground">Selected: {selectedFile.name}</div>
          )}
          {/* Show errors */}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {qnaError && <p className="text-sm text-destructive">{qnaError}</p>}
          {emrError && <p className="text-sm text-destructive">{emrError}</p>}
        </CardContent>
      </Card>
    </main>
  )
}
