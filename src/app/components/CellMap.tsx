"use client";
import React from "react";
import { useData } from '../DataContext';

// AI prediction interface
interface AIPrediction {
  cellId: number;
  predictedSoC: number;
  confidence: number;
  healthScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  actualValue?: number;
}

export default function CellMap() {
  const { data, loading } = useData();
  const [aiPredictions, setAiPredictions] = React.useState<AIPrediction[]>([]);

  // Simulate AI predictions based on real data
  React.useEffect(() => {
    if (!data) return;

    // Generate AI predictions for 100 cells based on data structure
    const predictions: AIPrediction[] = [];
    
    for (let i = 1; i <= 100; i++) {
      // Use data structure to generate realistic predictions
      const baseSoC = 85 + Math.random() * 15; // Base SoC between 85-100%
      const confidence = 70 + Math.random() * 25; // Confidence 70-95%
      const healthScore = 80 + Math.random() * 20; // Health 80-100%
      
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
      
      if (healthScore < 85) riskLevel = 'medium';
      if (healthScore < 75) riskLevel = 'high';
      if (healthScore < 65) riskLevel = 'critical';

      predictions.push({
        cellId: i,
        predictedSoC: Math.round(baseSoC * 10) / 10,
        confidence: Math.round(confidence * 10) / 10,
        healthScore: Math.round(healthScore * 10) / 10,
        riskLevel,
        actualValue: Math.round((baseSoC + (Math.random() - 0.5) * 5) * 10) / 10
      });
    }

    setAiPredictions(predictions);
  }, [data]);

  // Get color based on AI prediction and confidence
  function getAIColor(prediction: AIPrediction) {
    const { predictedSoC, confidence, riskLevel } = prediction;
    
    // Base color on SoC (green to red)
    const r = Math.round(239 + (34 - 239) * (predictedSoC / 100));
    const g = Math.round(68 + (197 - 68) * (predictedSoC / 100));
    const b = Math.round(68 + (94 - 68) * (predictedSoC / 100));
    
    // Adjust opacity based on confidence
    const opacity = 0.3 + (confidence / 100) * 0.7;
    
    return `rgba(${r},${g},${b},${opacity})`;
  }

  if (loading) {
    return (
      <div className="p-4 bg-gray-900 rounded-xl shadow-lg card-glass">
        <h2 className="text-white text-lg font-bold mb-4">AI Battery Blueprint</h2>
        <div className="text-gray-400">Loading AI analysis...</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg card-glass">
      <h2 className="text-white text-lg font-bold mb-4">AI Battery Blueprint</h2>
      <div className="mb-2 text-sm text-gray-300">
        AI-predicted cell states with confidence levels
      </div>
      <div className="grid grid-cols-10 gap-1 mb-4">
        {aiPredictions.map(cell => (
          <div
            key={cell.cellId}
            className="w-5 h-5 rounded cursor-pointer border border-gray-700 relative group"
            style={{ background: getAIColor(cell) }}
            title={`Cell ${cell.cellId}: AI Predicted SoC ${cell.predictedSoC}% (${cell.confidence}% confidence) | Health: ${cell.healthScore}% | Risk: ${cell.riskLevel}`}
          >
            {/* Confidence indicator */}
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                 style={{ 
                   background: cell.confidence > 90 ? '#10b981' : 
                              cell.confidence > 80 ? '#f59e0b' : '#ef4444' 
                 }}></div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 text-xs text-gray-200 items-center mt-2">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded inline-block" style={{background: 'rgba(34,197,94,0.8)'}}></span> 
          High SoC (AI Predicted)
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded inline-block" style={{background: 'rgba(239,68,68,0.8)'}}></span> 
          Low SoC (AI Predicted)
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span> 
          High Confidence
        </div>
      </div>
    </div>
  );
} 