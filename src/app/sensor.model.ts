export interface TemperatureData {
    sensor_id: string;
    location: string;
    unit: string;
    data: { timestamp: string; temperature: number }[];
  }
  
  export interface ElectricityData {
    sensor: string;
    unit: string;
    data: { timestamp: string; consumption: number }[];
  }
  
  export interface HumidityData {
    sensor: string;
    unit: string;
    data: { timestamp: string; humidity: number }[];
  }