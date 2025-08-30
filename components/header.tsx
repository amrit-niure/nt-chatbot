"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">
                  A
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ASTRA</h1>
                <p className="text-xs text-muted-foreground">
                  Data Interaction Platform
                </p>
              </div>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {pathname !== "/" && (
              <Link href="/">
                <Button variant="default" size="sm">
                  Home
                </Button>
              </Link>
            )}
            {pathname !== "/chatbot" && (
              <Link href="/chatbot">
                <Button variant="default" size="sm">
                  Launch Chatbot
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
