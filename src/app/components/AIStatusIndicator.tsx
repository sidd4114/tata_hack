"use client";
import React, { useEffect, useState } from "react";

export default function AIStatusIndicator() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastCheck, setLastCheck] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Start analyzing
      setIsAnalyzing(true);
      
      // Simulate AI processing time (10 seconds)
      setTimeout(() => {
        setIsAnalyzing(false);
        setLastCheck(new Date());
      }, 10000);
    }, 30000); // AI checks every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
          <span className="text-xs text-white font-medium">
            {isAnalyzing ? 'AI Analyzing...' : 'AI Active'}
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Last check: {lastCheck.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
} 