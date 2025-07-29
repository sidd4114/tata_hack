"use client";
import React, { useEffect, useState } from "react";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simulate realistic battery degradation
let cycleCount = randomInt(400, 600);
let soh = randomInt(85, 95);
let rebirth = randomInt(70, 85);
let tempHistory = Array.from({ length: 10 }, () => randomInt(20, 35));

function updateBatteryMetrics() {
  // Gradually increase cycle count
  cycleCount += randomInt(1, 3);
  
  // SoH decreases gradually with cycles
  const cycleDegradation = (cycleCount - 400) * 0.02; // 2% degradation per 100 cycles
  soh = Math.max(60, 95 - cycleDegradation + (Math.random() - 0.5) * 2);
  
  // Rebirth score based on SoH and cycles
  rebirth = Math.max(50, Math.min(100, soh - (cycleCount - 400) * 0.01 + (Math.random() - 0.5) * 5));
  
  // Update temperature history with realistic fluctuations
  tempHistory = tempHistory.map(temp => {
    const change = (Math.random() - 0.5) * 3; // ±1.5°C change
    return Math.max(15, Math.min(45, temp + change));
  });
}

export default function BatteryPassport() {
  const [cycleCountState, setCycleCount] = useState(cycleCount);
  const [sohState, setSoh] = useState(soh);
  const [rebirthState, setRebirth] = useState(rebirth);
  const [tempHistoryState, setTempHistory] = useState<number[]>(tempHistory);

  useEffect(() => {
    // AI checks every 30 seconds
    const interval = setInterval(() => {
      updateBatteryMetrics();
      setCycleCount(cycleCount);
      setSoh(soh);
      setRebirth(rebirth);
      setTempHistory([...tempHistory]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getRebirthStatus = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "bg-green-600" };
    if (score >= 70) return { text: "Good", color: "bg-blue-600" };
    if (score >= 60) return { text: "Fair", color: "bg-yellow-600" };
    return { text: "Poor", color: "bg-red-600" };
  };

  const rebirthStatus = getRebirthStatus(rebirthState);
  const avgTemp = tempHistoryState.reduce((a, b) => a + b, 0) / tempHistoryState.length;

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg card-glass">
      <h2 className="text-white text-lg font-bold mb-4">Digital Battery Passport</h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Cycle Count</span>
          <span className="font-bold text-blue-400">{cycleCountState}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">State of Health (SoH)</span>
          <span className="font-bold text-green-400">{sohState.toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Rebirth Score</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-pink-400">{rebirthState.toFixed(0)}/100</span>
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${rebirthStatus.color} text-white`}>
              {rebirthStatus.text}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Temperature History</span>
            <span className="text-xs text-gray-300">Avg: {avgTemp.toFixed(1)}°C</span>
          </div>
          <div className="flex gap-1">
            {tempHistoryState.map((t, i) => (
              <div 
                key={i} 
                className="w-6 h-2 rounded bg-blue-400" 
                style={{ opacity: (t - 15) / 30 }} 
                title={`${t.toFixed(1)}°C`} 
              />
            ))}
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Battery Health</span>
            <span className="text-xs text-gray-300">{sohState.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded h-2">
            <div 
              className={`h-2 rounded transition-all duration-500 ${
                sohState > 80 ? 'bg-green-400' : sohState > 60 ? 'bg-yellow-400' : 'bg-red-400'
              }`} 
              style={{ width: `${sohState}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 