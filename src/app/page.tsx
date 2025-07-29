"use client";
import React, { useState } from "react";
import AlertCard from "./components/AlertCard";
import AlertModal from "./components/AlertModal";
import CellMap from "./components/CellMap";
import ChargingScheduler from "./components/ChargingScheduler";
import HeatmapChart from "./components/HeatmapChart";
import ChargeProfileChart from "./components/ChargeProfileChart";
import BatteryPassport from "./components/BatteryPassport";
import AIStatusIndicator from "./components/AIStatusIndicator";
import AIAgent from "./components/AIAgent";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState("");

  // Example: handle alert click (replace with real data from AlertCard if needed)
  const handleAlertClick = () => {
    setModalDetails("Cell 4 degraded due to 15 fast-charges in last 30 cycles.\nAI detected abnormal impedance pattern.");
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-black p-8">
      <AIStatusIndicator />
      <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in-up">Battery Intelligence Center</h1>
      <div className="mb-8 text-sm text-[#60a5fa] font-mono tracking-wide animate-fade-in-up">
        Battery Type: <span className="font-semibold text-[#f3f4f6]">Li-ion (NMC)</span>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div onClick={handleAlertClick} className="cursor-pointer">
          <AlertCard />
        </div>
        <AIAgent />
        <CellMap />
        <ChargingScheduler />
        <HeatmapChart />
        <ChargeProfileChart />
        <BatteryPassport />
      </section>
      
      {/* Car Information Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in-up">About Your Car</h2>
        <div className="bg-gray-900 rounded-xl shadow-lg card-glass p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Car Image */}
            <div className="w-96 h-72 rounded-lg overflow-hidden">
              <img 
                src="/punchev.png" 
                alt="Tata Punch EV" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Car Details */}
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-white text-xl font-bold mb-2">Punch EV</h3>
                <p className="text-gray-400 text-lg">Electric Compact SUV</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Battery Capacity:</span>
                    <span className="text-white font-semibold">35-38.3 kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Range:</span>
                    <span className="text-white font-semibold">315-421 km (ARAI)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Power:</span>
                    <span className="text-white font-semibold">82-122 hp</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">0-100 km/h:</span>
                    <span className="text-white font-semibold">~9.5s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Top Speed:</span>
                    <span className="text-white font-semibold">140 km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Body Style:</span>
                    <span className="text-white font-semibold">Compact SUV</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-300 text-sm">
                  Your Punch EV is Tata's first all-electric compact SUV, built on the advanced Gen 2 EV architecture. It features a high ground clearance, practical urban design, and a robust battery management system for optimal performance and range. The Punch EV is designed for city agility and long-range comfort, making it a perfect fit for modern electric mobility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      


      
      <AlertModal open={modalOpen} onOpenChange={setModalOpen} details={modalDetails} />
    </main>
  );
}
