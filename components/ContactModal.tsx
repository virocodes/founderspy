"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Linkedin, Github } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const handleEmailClick = () => {
    window.open('mailto:dbellan1291@gmail.com?subject=Interested in Founders Data', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 border-slate-200 shadow-sm">
        <div className="p-8">
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Information</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Get in Touch
              </h2>
              <p className="text-sm text-slate-600">
                Interested in the founders data or have questions? Reach out below.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-12 border-slate-300 hover:bg-slate-50"
                onClick={handleEmailClick}
              >
                <Mail className="h-5 w-5 mr-2" />
                dbellan1291@gmail.com
              </Button>
              
              {/* You can add more contact links here */}
              {/* <Button
                variant="outline"
                className="w-full h-12 border-slate-300 hover:bg-slate-50"
                onClick={() => window.open('https://linkedin.com/in/yourprofile', '_blank')}
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </Button> */}
              
              {/* <Button
                variant="outline"
                className="w-full h-12 border-slate-300 hover:bg-slate-50"
                onClick={() => window.open('https://github.com/yourusername', '_blank')}
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Button> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 