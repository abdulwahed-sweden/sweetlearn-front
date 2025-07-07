"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ClipboardCopy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const endpoints = [
  { method: 'GET', path: '/api/health', description: 'Check backend health' },
  { method: 'GET', path: '/api/users', description: 'Retrieve user list' },
  { method: 'POST', path: '/api/register', description: 'Register a new user' },
];

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast({ title: "Copied!", description: `${textToCopy} copied to clipboard.` });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({ title: "Error", description: "Failed to copy to clipboard.", variant: 'destructive' });
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label={`Copy ${textToCopy}`}>
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
    </Button>
  );
};

export function ApiEndpointsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Endpoints</CardTitle>
        <CardDescription>Key endpoints for backend interaction.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {endpoints.map((endpoint) => (
            <li key={endpoint.path} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold w-12 text-center rounded-md px-2 py-1 ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {endpoint.method}
                </span>
                <div>
                  <p className="font-mono text-sm font-medium text-foreground">{endpoint.path}</p>
                  <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                </div>
              </div>
              <CopyButton textToCopy={endpoint.path} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
