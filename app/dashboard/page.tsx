"use client";

import React, { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { getUserAndAccess } from "./actions";
import { UpgradeButton } from "@/components/UpgradeButton";
import { DashboardNav } from "@/components/DashboardNav";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuideContent, steps, tabValues } from "@/components/GuideContent";
import { Features } from "@/components/Features";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const { user, hasAccess } = await getUserAndAccess();
      setUser(user);
      setHasAccess(hasAccess);
      setIsInitialLoading(false);
    };

    loadUserData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav 
        user={user} 
        hasAccess={hasAccess} 
        isInitialLoading={isInitialLoading} 
      />

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto p-8">
          <div className="max-w-4xl mx-auto">
            {hasAccess ? (
              <Tabs defaultValue="getting-started" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  {Object.entries(tabValues).map(([value, label]) => (
                    <TabsTrigger key={value} value={value}>
                      {label.split(" ")[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {steps.map((step, index) => (
                  <GuideContent key={index} step={step} index={index} />
                ))}
              </Tabs>
            ) : (
              <div className="space-y-16">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                  <Badge variant="secondary" className="text-sm">🚀 Launch Your SaaS Faster</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Build Your SaaS in 12 Hours
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    A comprehensive guide to launching your SaaS product using our template. 
                    Get started today and transform your idea into a working product.
                  </p>
                </div>

                {/* Features Grid */}
                <Features />

                {/* Purchase Section */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent h-32" />
                  <div className="relative z-10 bg-muted/50 p-8 rounded-lg border text-center">
                    <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Get instant access to our complete guide and start building your SaaS in just 12 hours. 
                      One-time payment of $50, no subscription required.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <UpgradeButton />
                      <p className="text-sm text-muted-foreground">
                        Instant access • Lifetime updates • Money-back guarantee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
