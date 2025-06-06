"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

export function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          successUrl: window.location.href,
          cancelUrl: window.location.href,
          mode: "payment"
        }),
      });
      
      const data = await response.json();
      
      if (!data.url) {
        throw new Error("No checkout URL received");
      }
      
      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      toast.error("Failed to start checkout. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={isLoading}
      className="bg-primary hover:bg-primary/90"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs mr-2" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )}
      Buy Now - $50
    </Button>
  );
} 