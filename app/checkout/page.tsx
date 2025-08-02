"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  useEffect(() => {
    const handleCheckout = async () => {
      try {
        const response = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            successUrl: window.location.origin + "/",
            cancelUrl: window.location.origin + "/",
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
        // Redirect back to home page on error
        window.location.href = "/";
      }
    };

    // Start checkout immediately
    handleCheckout();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-transparent mx-auto"></div>
        <p className="text-sm text-slate-600">Preparing checkout...</p>
      </div>
    </div>
  );
} 