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

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedFiles, setLoadedFiles] = useState<string[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        setLoadedFiles([]);
        
        const dataFiles = ['B0006.json', 'B0007.json', 'B0018.json'];
        const loadedData: any = {};
        const successfulFiles: string[] = [];
        
        // Load all three data files
        for (const filename of dataFiles) {
          try {
            console.log(`Loading ${filename}...`);
            const response = await fetch(`/${filename}`);
            
            if (response.ok) {
              const jsonData = await response.json();
              loadedData[filename.replace('.json', '')] = jsonData;
              successfulFiles.push(filename);
              console.log(`✅ Successfully loaded ${filename}:`, Object.keys(jsonData));
            } else {
              console.warn(`⚠️ Failed to load ${filename}: HTTP ${response.status}`);
            }
          } catch (err) {
            console.warn(`⚠️ Error loading ${filename}:`, err);
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
          throw new Error('No data files could be loaded');
        }
        
      } catch (err) {
        console.warn('Failed to load data files, using sample data:', err);
        setError('Using sample data - data files failed to load');
        setData(sampleBatteryData);
        setLoadedFiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error, loadedFiles }}>
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