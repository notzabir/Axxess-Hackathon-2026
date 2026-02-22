"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SummarizePage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string>("")

  function handleFile(file: File | null) {
    if (!file) return
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.")
      return
    }

    setError(null)
    setResult("")
    setSelectedFile(file)
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)

    const droppedFile = event.dataTransfer.files?.[0] ?? null
    handleFile(droppedFile)
  }

  async function onSubmit() {
    if (!selectedFile) {
      setError("Select a PDF first.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Failed to summarize document.")
      }

      setResult(data?.result || "No summary returned.")
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Something went wrong."
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clinical Document Summarizer</h1>
          <p className="text-sm text-muted-foreground">Upload a PDF and get an AI-generated summary.</p>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">
            Back Home
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>Drag and drop your file, or click to browse.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-muted" : "border-border"
            }`}
          >
            <p className="text-sm text-muted-foreground">Drop PDF here or click to select</p>
            {selectedFile ? <p className="mt-2 text-sm font-medium">{selectedFile.name}</p> : null}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          />

          <Button onClick={onSubmit} disabled={!selectedFile || isSubmitting}>
            {isSubmitting ? "Summarizing..." : "Summarize Document"}
          </Button>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Summary</CardTitle>
          <CardDescription>Response from the Featherless-backed API route.</CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{result}</div>
          ) : (
            <p className="text-sm text-muted-foreground">Your summary will appear here after upload.</p>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
