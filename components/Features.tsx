import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const features = [
  {
    title: "Complete Guide",
    description: "Step-by-step instructions to build your SaaS in 12 hours",
    icon: "📚"
  },
  {
    title: "Ready-to-Use Code",
    description: "Production-ready Next.js template with all integrations",
    icon: "⚡"
  },
  {
    title: "Best Practices",
    description: "Follow industry standards and proven patterns",
    icon: "✨"
  }
];

export const Features = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors text-2xl">
              {feature.icon}
            </div>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 