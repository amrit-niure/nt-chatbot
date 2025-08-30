"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchDatasets, fetchSuggestedQueries } from "@/lib/api"
import { DatasetSelector } from "@/components/dataset-selector"
import { QueryInput } from "@/components/query-input"
import { ResponsePanel } from "@/components/response-panel"
import { SuggestedQuestions } from "@/components/suggested-questions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { QueryResult } from "@/lib/types"

export default function ChatbotPage() {
  const [selectedDataset, setSelectedDataset] = useState<string>("")
  const [queryHistory, setQueryHistory] = useState<QueryResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { data: datasets, isLoading: datasetsLoading } = useQuery({
    queryKey: ["datasets"],
    queryFn: fetchDatasets,
  })

  const { data: suggestedQueries } = useQuery({
    queryKey: ["suggested-queries"],
    queryFn: () => fetchSuggestedQueries(),
  })

  const handleQuerySubmit = async (result: QueryResult) => {
    setQueryHistory((prev) => [result, ...prev])
  }

  const handleSuggestedQuery = (queryText: string) => {
    // This will be handled by the QueryInput component
    const event = new CustomEvent("suggested-query", { detail: queryText })
    window.dispatchEvent(event)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">ASTRA Chatbot</h1>
        <p className="text-muted-foreground text-pretty">
          Ask questions about government data and receive trustworthy, transparent answers with full audit trails.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dataset Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Dataset</CardTitle>
              <CardDescription>Choose which government dataset you want to query</CardDescription>
            </CardHeader>
            <CardContent>
              <DatasetSelector
                datasets={datasets || []}
                selectedDataset={selectedDataset}
                onDatasetChange={setSelectedDataset}
                isLoading={datasetsLoading}
              />
            </CardContent>
          </Card>

          {/* Query Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ask Your Question</CardTitle>
              <CardDescription>Enter your query in natural language</CardDescription>
            </CardHeader>
            <CardContent>
              <QueryInput
                selectedDataset={selectedDataset}
                onQuerySubmit={handleQuerySubmit}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </CardContent>
          </Card>

          {/* Query Results */}
          <div className="space-y-4">
            {queryHistory.map((result, index) => (
              <ResponsePanel key={result.id} result={result} isLatest={index === 0} />
            ))}
            {queryHistory.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">No queries yet</p>
                    <p className="text-sm text-muted-foreground">Select a dataset and ask a question to get started</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Questions</CardTitle>
              <CardDescription>Try these example queries to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <SuggestedQuestions
                queries={suggestedQueries || []}
                onQuerySelect={handleSuggestedQuery}
                disabled={!selectedDataset}
              />
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="font-medium text-foreground">Be specific:</p>
                <p className="text-muted-foreground text-pretty">
                  Include time periods, amounts, or categories in your questions
                </p>
              </div>
              <Separator />
              <div className="text-sm space-y-2">
                <p className="font-medium text-foreground">Use natural language:</p>
                <p className="text-muted-foreground text-pretty">Ask questions as you would to a human analyst</p>
              </div>
              <Separator />
              <div className="text-sm space-y-2">
                <p className="font-medium text-foreground">Check trust scores:</p>
                <p className="text-muted-foreground text-pretty">
                  Review confidence levels and audit trails for important decisions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
