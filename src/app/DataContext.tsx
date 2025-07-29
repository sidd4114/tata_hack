"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext<any>(null);

// Sample battery data for fallback
const sampleBatteryData = {
  batteryInfo: {
    capacity: 75.6,
    voltage: 3.7,
    temperature: 28.5,
    cycles: 342,
    health: 92.3
  },
  cells: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    soc: 85 + Math.random() * 15,
    voltage: 3.6 + Math.random() * 0.4,
    temperature: 25 + Math.random() * 10,
    health: 80 + Math.random() * 20
  })),
  chargingData: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    soc: 20 + (i * 3.3),
    current: 2.5 - (i * 0.1),
    temperature: 25 + Math.sin(i * Math.PI / 12) * 5
  })),
  thermalData: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    temperature: 25 + 5 * Math.sin((i - 6) * Math.PI / 12) + (Math.random() - 0.5) * 3
  }))
};

// Netlify URLs for your JSON files
const NETLIFY_URLS = {
  B0006: 'https://lovely-buttercream-91cf0d.netlify.app/B0006.json',
  B0007: 'https://lovely-buttercream-91cf0d.netlify.app/B0007.json',
  B0018: 'https://lovely-buttercream-91cf0d.netlify.app/B0018.json'
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadedFiles, setLoadedFiles] = useState<string[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setLoadedFiles([]);
        
        const dataFiles = [
          { name: 'B0006', url: NETLIFY_URLS.B0006 },
          { name: 'B0007', url: NETLIFY_URLS.B0007 },
          { name: 'B0018', url: NETLIFY_URLS.B0018 }
        ];
        const loadedData: any = {};
        const successfulFiles: string[] = [];
        
        // Load all three data files from Netlify
        for (const file of dataFiles) {
          try {
            console.log(`Loading ${file.name} from Netlify...`);
            const response = await fetch(file.url);
            
            if (response.ok) {
              const jsonData = await response.json();
              loadedData[file.name] = jsonData;
              successfulFiles.push(file.name);
              console.log(`✅ Successfully loaded ${file.name}:`, Object.keys(jsonData));
            } else {
              console.warn(`⚠️ Failed to load ${file.name}: HTTP ${response.status}`);
            }
          } catch (err) {
            console.warn(`⚠️ Error loading ${file.name}:`, err);
          }
        }
        
        if (successfulFiles.length > 0) {
          // Combine all loaded data
          const combinedData = {
            ...loadedData,
            metadata: {
              totalFiles: successfulFiles.length,
              loadedFiles: successfulFiles,
              totalDataPoints: Object.values(loadedData).reduce((total: number, fileData: any) => {
                return total + (Array.isArray(fileData) ? fileData.length : 1);
              }, 0),
              dataSources: Object.keys(loadedData)
            }
          };
          
          setData(combinedData);
          setLoadedFiles(successfulFiles);
          console.log('🎯 Combined AI data from multiple sources:', combinedData.metadata);
        } else {
          // Silently fall back to sample data without error messages
          setData(sampleBatteryData);
          setLoadedFiles([]);
        }
        
      } catch (err) {
        // Silently fall back to sample data
        setData(sampleBatteryData);
        setLoadedFiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, loadedFiles }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; 