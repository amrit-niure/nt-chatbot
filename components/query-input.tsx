"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { submitQuery } from "@/lib/api";
import {
  queryInputSchema,
  type QueryInput as QueryInputType,
  type QueryResult,
} from "@/lib/types";
import { ScreenReaderOnly } from "@/components/accessibility/screen-reader-only";
import { Send, Loader2 } from "lucide-react";

interface QueryInputProps {
  selectedDataset: string;
  onQuerySubmit: (result: QueryResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  chatGptStyle?: boolean;
}

export function QueryInput({
  selectedDataset,
  onQuerySubmit,
  isLoading,
  setIsLoading,
  chatGptStyle,
}: QueryInputProps) {
  const form = useForm<QueryInputType>({
    resolver: zodResolver(queryInputSchema),
    defaultValues: {
      query: "",
      datasetId: selectedDataset,
    },
  });

  // Update form when dataset changes
  useEffect(() => {
    form.setValue("datasetId", selectedDataset);
  }, [selectedDataset, form]);

  // Listen for suggested query events
  useEffect(() => {
    const handleSuggestedQuery = (event: CustomEvent) => {
      form.setValue("query", event.detail);
    };

    window.addEventListener(
      "suggested-query",
      handleSuggestedQuery as EventListener
    );
    return () =>
      window.removeEventListener(
        "suggested-query",
        handleSuggestedQuery as EventListener
      );
  }, [form]);

  const onSubmit = async (data: QueryInputType) => {
    if (!selectedDataset) {
      form.setError("datasetId", { message: "Please select a dataset first" });
      return;
    }

    setIsLoading(true);
    try {
      const result = await submitQuery(data.query, data.datasetId);
      onQuerySubmit(result);
      form.reset({ query: "", datasetId: selectedDataset });

      // Announce success to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent =
        "Query submitted successfully. Results are now available.";
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    } catch (error) {
      console.error("Query submission failed:", error);
      form.setError("query", {
        message: "Failed to submit query. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (chatGptStyle) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="relative flex items-end">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Query Input</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Message ASTRA..."
                      className="min-h-[48px] max-h-40 pr-12 rounded-2xl border bg-muted/50 focus:bg-background resize-none shadow-inner text-base"
                      disabled={isLoading || !selectedDataset}
                      aria-describedby="query-help query-status"
                      {...field}
                      onKeyDown={(e) => {
                        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-2 right-2 rounded-full p-2 h-9 w-9"
              disabled={
                isLoading || !selectedDataset || !form.watch("query").trim()
              }
              aria-describedby="submit-help"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <div
            id="query-status"
            className="text-xs text-muted-foreground px-1"
            aria-live="polite"
          >
            {!selectedDataset && "Select a dataset to enable querying"}
            {selectedDataset &&
              !isLoading &&
              "Press Ctrl+Enter or Cmd+Enter to submit"}
            {isLoading && "Processing your query..."}
          </div>
        </form>
      </Form>
    );
  }
  // Default (non-ChatGPT) UI
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Query Input</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ask a question about the selected dataset... (e.g., 'Show me the top 10 vendors by payment amount this year')"
                  className="min-h-[100px] resize-none"
                  disabled={isLoading || !selectedDataset}
                  aria-describedby="query-help query-status"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div
            id="query-status"
            className="text-sm text-muted-foreground"
            aria-live="polite"
          >
            {!selectedDataset && "Select a dataset to enable querying"}
            {selectedDataset &&
              !isLoading &&
              "Press Enter + Cmd/Ctrl to submit"}
            {isLoading && "Processing your query..."}
          </div>
          <Button
            type="submit"
            disabled={
              isLoading || !selectedDataset || !form.watch("query").trim()
            }
            aria-describedby="submit-help"
          >
            {isLoading ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                <ScreenReaderOnly>
                  Processing query, please wait
                </ScreenReaderOnly>
                Processing
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                Submit Query
              </>
            )}
          </Button>
          <p id="submit-help" className="sr-only">
            Submit your query to get AI-powered insights from the selected
            government dataset
          </p>
        </div>
      </form>
    </Form>
  );
}
