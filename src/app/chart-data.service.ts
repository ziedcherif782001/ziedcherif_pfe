import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface TemperatureEntry {
  timestamp: string;
  temperature: number;
}

interface HumidityEntry {
  timestamp: string;
  humidity: number;
}

interface ElectricityEntry {
  timestamp: string;
  consumption: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private temperatureDataSubject = new BehaviorSubject<any>(null);
  private humidityDataSubject = new BehaviorSubject<any>(null);
  private electricityDataSubject = new BehaviorSubject<any>(null);

  temperatureData$ = this.temperatureDataSubject.asObservable();
  humidityData$ = this.humidityDataSubject.asObservable();
  electricityData$ = this.electricityDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadTemperatureData() {
    this.http.get<any>('assets/temperature_data.json').subscribe((data) => {
      const temperatureData: TemperatureEntry[] = data.data;
      const labels = temperatureData.map((entry) => this.formatTime(entry.timestamp));
      const temperatures = temperatureData.map((entry) => entry.temperature);
      this.temperatureDataSubject.next({ labels, data: temperatures });
    });
  }

  loadHumidityData() {
    this.http.get<any>('assets/humidity_sensor.json').subscribe((data) => {
      const humidityData: HumidityEntry[] = data.data;
      const labels = humidityData.map((entry) => this.formatTime(entry.timestamp));
      const humidities = humidityData.map((entry) => entry.humidity);
      this.humidityDataSubject.next({ labels, data: humidities });
    });
  }

  loadElectricityData() {
    this.http.get<any>('assets/electricity_sensor.json').subscribe((data) => {
      const electricityData: ElectricityEntry[] = data.data;
      const labels = electricityData.map((entry) => this.formatTime(entry.timestamp));
      const consumption = electricityData.map((entry) => entry.consumption);
      this.electricityDataSubject.next({ labels, data: consumption });
    });
  }

  private formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.getHours() + ':00'; // Extracting only hours from timestamp
  }
}
