"use client";
import React, { useEffect, useState } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const cellIds = [1, 2, 3, 4, 5, 6];
const severities = ["info", "warning", "critical"] as const;
const issues = [
  "Overheating risk",
  "Microfracture detected",
  "Voltage drop",
  "Impedance spike",
  "Cell degradation",
  "Thermal runaway risk",
  "Capacity fade detected",
  "Internal resistance increase"
];

type Alert = {
  cell: number;
  severity: "info" | "warning" | "critical";
  issue: string;
  timestamp: string;
  details: string;
};

// Simulate realistic battery parameters
const batteryParams = {
  voltage: 3.7,
  temperature: 25,
  impedance: 0.1,
  cycles: 450
};

function generateRealisticAlert(): Alert | null {
  // Only generate alerts based on realistic thresholds
  const voltageThreshold = batteryParams.voltage < 3.2 || batteryParams.voltage > 4.2;
  const tempThreshold = batteryParams.temperature > 45;
  const impedanceThreshold = batteryParams.impedance > 0.15;
  const cycleThreshold = batteryParams.cycles > 800;

  if (!voltageThreshold && !tempThreshold && !impedanceThreshold && !cycleThreshold) {
    return null; // No alert needed
  }

  const cell = cellIds[Math.floor(Math.random() * cellIds.length)];
  let severity: "info" | "warning" | "critical" = "info";
  let issue = "";
  let details = "";

  if (tempThreshold) {
    severity = "critical";
    issue = "Overheating risk";
    details = `Cell ${cell} temperature exceeded 45°C. Current temp: ${batteryParams.temperature.toFixed(1)}°C. Immediate cooling required.`;
  } else if (voltageThreshold) {
    severity = "warning";
    issue = "Voltage drop";
    details = `Cell ${cell} voltage at ${batteryParams.voltage.toFixed(2)}V. Operating outside optimal range.`;
  } else if (impedanceThreshold) {
    severity = "warning";
    issue = "Impedance spike";
    details = `Cell ${cell} impedance increased to ${batteryParams.impedance.toFixed(3)}Ω. Degradation pattern detected.`;
  } else if (cycleThreshold) {
    severity = "info";
    issue = "Capacity fade detected";
    details = `Cell ${cell} has completed ${batteryParams.cycles} cycles. Capacity reduced by ${((batteryParams.cycles - 500) / 10).toFixed(1)}%.`;
  }

  return {
    cell,
    severity,
    issue,
    timestamp: new Date().toLocaleTimeString(),
    details
  };
}

export default function AlertCard() {
  const [alert, setAlert] = useState<Alert | null>(null);

  useEffect(() => {
    // Initial check
    const initialAlert = generateRealisticAlert();
    setAlert(initialAlert);

    // AI checks every 30 seconds
    const interval = setInterval(() => {
      const newAlert = generateRealisticAlert();
      if (newAlert) {
        setAlert(newAlert);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!alert) {
    return (
      <div className="card-glass rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-8 border-green-500 animate-fade-in-up ring-2 ring-green-400/30 ring-offset-2 bg-gradient-to-br from-green-900/40 to-green-800/30 min-h-40 justify-center">
        <div className="flex items-center justify-between mb-2">
          <span className="uppercase text-xs font-bold tracking-wider text-green-300 flex items-center gap-1">
            <CheckCircledIcon className="w-4 h-4 text-green-400 animate-pulse" />
            AI Status
          </span>
          <span className="text-xs text-green-200">{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-semibold text-green-100 flex items-center gap-2">
            All Systems Normal
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-1 rounded text-xs font-bold uppercase bg-green-600 text-white shadow-green-400/30 shadow-sm">Healthy</span>
          <span className="text-xs text-green-200">No alerts</span>
        </div>
        <div className="text-xs text-green-300 mt-2">
          All battery cells are operating within optimal parameters. No action required.
        </div>
      </div>
    );
  }

  const severityColor = {
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    critical: "bg-red-600",
  }[alert.severity];

  const severityClass = {
    info: "border-blue-500",
    warning: "border-yellow-500",
    critical: "border-red-600",
  }[alert.severity];

  return (
    <div className={`card-glass rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-8 ${severityClass} animate-fade-in-up ${alert.severity === 'critical' ? 'alert-pulse' : ''}`}> 
      <div className="flex items-center justify-between">
        <span className="uppercase text-xs font-bold tracking-wider text-white/80 status-indicator">AI Alert</span>
        <span className="text-xs text-white/60">{alert.timestamp}</span>
      </div>
      <div className="text-lg font-semibold text-white">{alert.issue} in Cell {alert.cell}</div>
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${severityColor} text-white`}>{alert.severity}</span>
        <span className="text-xs text-white/60">Cell ID: {alert.cell}</span>
      </div>
    </div>
  );
} 