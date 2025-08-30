import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Database,
  Search,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-xs font-normal">
            Government Data Platform
          </Badge>
          <h1 className="text-4xl font-bold text-balance text-foreground">
            ASTRA
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            An Accurate and Trustworthy Chatbot for Data Interactions
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Interact with government datasets through natural language queries
            while maintaining transparency and trust through comprehensive audit
            trails and confidence indicators.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chatbot">
            <Button size="lg" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Start Querying Data
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-transparent"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Documentation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
          <p className="text-muted-foreground text-pretty">
            Built for transparency, accuracy, and accessibility in government
            data analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Trust Indicators</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-pretty">
                Every response includes confidence scores and trust levels to
                help you assess the reliability of the information provided.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Multiple Datasets</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-pretty">
                Access government spending data, vendor payments, public
                contracts, and other official datasets through a unified
                interface.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Audit Trails</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-pretty">
                Complete transparency with detailed reasoning steps, data
                sources, and methodology for every query response.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Levels Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Understanding Trust Levels
          </h2>
          <p className="text-muted-foreground text-pretty">
            Our system provides clear indicators to help you evaluate response
            reliability
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-chart-2">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-chart-2" />
                <CardTitle className="text-lg text-chart-2">
                  High Trust
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-pretty">
                Data verified across multiple sources with high confidence
                scores. Suitable for policy decisions and official reporting.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-accent">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg text-accent">
                  Medium Trust
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-pretty">
                Generally reliable information with some limitations. Additional
                verification recommended for critical decisions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle className="text-lg text-destructive">
                  Low Trust
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-pretty">
                Limited data availability or conflicting sources. Use with
                caution and seek additional verification.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 bg-muted rounded-lg">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Begin exploring government data with natural language queries. Our
            chatbot provides transparent, trustworthy insights with full audit
            trails.
          </p>
        </div>
        <Link href="/chatbot">
          <Button size="lg">
            <Search className="mr-2 h-4 w-4" />
            Launch ASTRA Chatbot
          </Button>
        </Link>
      </section>
    </div>
  );
}
