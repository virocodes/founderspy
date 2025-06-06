import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";

export const steps = [
  {
    title: "Quickstart",
    description: "Set up your development environment and clone the template",
    content: [
      {
        title: "Prerequisites",
        items: [
          "Node.js 18+ installed",
          "Git installed",
          "A code editor (Cursor recommended)",
          "A GitHub account"
        ]
      },
      {
        title: "Clone the Template",
        code: "git clone https://github.com/virocodes/quik.git [saas name]\ncd [saas name]\nnpm install\ngit remote remove origin\nnpm run dev",
        description: "This will set up the base template with all dependencies",
        warning: "⚠️ The application will show errors when you run it because the database isn't set up yet - we'll fix that in the next step."
      },
      {
        title: "Environment Setup",
        code: "mv .env.example .env.local",
        description: "Create your environment file and we'll configure it in the next steps"
      }
    ]
  },
  {
    title: "Database/Auth",
    description: "Configure Supabase and Google OAuth",
    content: [
      {
        title: "Create Supabase Project",
        items: [
          "Go to supabase.com and create a new project",
          "Copy your project URL and anon key",
          "Get your service role key from Project Settings > API",
          "Add all three keys to your .env.local file"
        ]
      },
      {
        title: "Set Up Database",
        description: "Run this SQL in your Supabase SQL editor to create the profiles table and set up automatic profile creation on signup. This also sets up Row Level Security (RLS) policies to ensure users can only access their own data.",
        code: `-- Create the profiles table in the public schema
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    image TEXT,
    customer_id TEXT,
    price_id TEXT,
    has_access BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = (now() AT TIME ZONE 'UTC');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Create a function to automatically add a profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, image, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'), 
    NEW.raw_user_meta_data->>'avatar_url',
    (now() AT TIME ZONE 'UTC'), 
    (now() AT TIME ZONE 'UTC')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the handle_new_user function on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to read their own data
CREATE POLICY read_own_profile_data ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Create a policy to allow users to update their own data
CREATE POLICY update_own_profile_data ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create a policy to allow users to insert their own data
CREATE POLICY insert_own_profile_data ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create a policy to allow users to delete their own data
CREATE POLICY delete_own_profile_data ON public.profiles
FOR DELETE
USING (auth.uid() = id);`
      },
      {
        title: "Set Up Google OAuth",
        items: [
          "Create a new project in Google Cloud Console",
          "Navigate to APIs & Services > Credentials",
          "Click 'Configure Consent Screen' and fill in your app information",
          "Add userinfo.email and userinfo.profile to the OAuth scopes",
          "Add yourself as a test user",
          "Go back to Credentials and create a new OAuth Client ID",
          "Select 'Web Application' as the application type",
          "Add these Authorized JavaScript origins:",
          "  • http://localhost:3000",
          "  • https://your-project.supabase.co",
          "Add this Authorized redirect URI:",
          "  • https://your-project.supabase.co/auth/v1/callback",
          "Copy the Client ID and Client Secret",
          "Paste them into your Supabase dashboard under Authentication > Providers > Google"
        ]
      }
    ]
  },
  {
    title: "Payment",
    description: "Set up Stripe for handling payments",
    content: [
      {
        title: "Create Stripe Account",
        items: [
          "Sign up for a Stripe account",
          "Get your API keys from the dashboard",
          "Add them to your .env.local file"
        ]
      },
      {
        title: "Configure Products",
        items: [
          "Create your subscription products in Stripe",
          "Set up your pricing tiers",
          "Configure webhook endpoints"
        ]
      }
    ]
  },
  {
    title: "Building",
    description: "Customize the template for your needs",
    content: [
      {
        title: "Using AI to Build",
        items: [
          "Open the project in Cursor",
          "Use AI to help you customize the UI",
          "Generate new features with AI assistance",
          "Debug and optimize your code"
        ]
      },
      {
        title: "Key Areas to Customize",
        items: [
          "Landing page content",
          "User dashboard features",
          "Subscription plans",
          "Email templates"
        ]
      }
    ]
  },
  {
    title: "Deployment",
    description: "Deploy your SaaS to production",
    content: [
      {
        title: "Choose a Platform",
        items: [
          "Vercel (recommended)",
          "Netlify",
          "Railway",
          "AWS"
        ]
      },
      {
        title: "Deployment Steps",
        items: [
          "Connect your GitHub repository",
          "Configure environment variables",
          "Set up custom domain",
          "Enable SSL"
        ]
      }
    ]
  },
  {
    title: "Marketing",
    description: "Launch and grow your SaaS",
    content: [
      {
        title: "Content Strategy",
        items: [
          "Create short-form videos (TikTok, Reels)",
          "Share your building process",
          "Document your journey",
          "Engage with the community"
        ]
      },
      {
        title: "Growth Tactics",
        items: [
          "Product Hunt launch",
          "Reddit communities",
          "Twitter/X presence",
          "Email marketing"
        ]
      }
    ]
  }
];

export const tabValues = {
  "getting-started": "Quickstart",
  "authentication": "Database/Auth",
  "payments": "Payment",
  "building": "Building",
  "deployment": "Deployment",
  "marketing": "Marketing"
};

interface GuideContentProps {
  step: typeof steps[0];
  index: number;
}

export const GuideContent = ({ step, index }: GuideContentProps) => {
  const tabValue = Object.entries(tabValues).find(
    ([, label]) => label === step.title
  )?.[0];

  return (
    <TabsContent value={tabValue || ""} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
          {index + 1}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      </div>

      <div className="space-y-6 ml-12">
        {step.content.map((item, itemIndex) => (
          <Card key={itemIndex}>
            <CardContent>
              <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
              {item.items ? (
                <ul className="space-y-2">
                  {item.items.map((listItem, listIndex) => (
                    <li key={listIndex} className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  {item.code && (
                    <CodeBlock 
                      code={item.code} 
                      language={step.title === "Quickstart" ? "bash" : "sql"} 
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}; 