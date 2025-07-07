"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, LoaderCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Status = 'connected' | 'disconnected' | 'checking';

export function BackendStatusCard() {
  const [status, setStatus] = useState<Status>('checking');
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        setStatus('connected');
        return true;
      } else {
        setStatus('disconnected');
        return false;
      }
    } catch (error) {
      setStatus('disconnected');
      return false;
    }
  }, []);

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [checkStatus]);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setStatus('checking');
    const isConnected = await checkStatus();
    setIsTesting(false);
    toast({
      title: isConnected ? 'Connection Successful' : 'Connection Failed',
      description: isConnected ? 'The backend is responding correctly.' : 'Could not connect to the backend.',
      variant: isConnected ? 'default' : 'destructive',
    });
  };

  const statusConfig = {
    connected: { text: "Connected", icon: <Wifi className="h-4 w-4" />, badgeVariant: "default", color: "text-green-500" },
    disconnected: { text: "Disconnected", icon: <WifiOff className="h-4 w-4" />, badgeVariant: "destructive", color: "text-red-500" },
    checking: { text: "Checking...", icon: <LoaderCircle className="h-4 w-4 animate-spin" />, badgeVariant: "secondary", color: "text-yellow-500" },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend Status</CardTitle>
        <CardDescription>Real-time backend connectivity status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">Status</span>
          <Badge variant={currentStatus.badgeVariant} className={`flex items-center gap-2 ${currentStatus.color}`}>
            {currentStatus.icon}
            {currentStatus.text}
          </Badge>
        </div>
        <Button onClick={handleTestConnection} disabled={isTesting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          {isTesting ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Zap className="mr-2 h-4 w-4" />
          )}
          Test Connection
        </Button>
      </CardContent>
    </Card>
  );
}
