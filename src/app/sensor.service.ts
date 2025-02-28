import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemperatureData, ElectricityData, HumidityData } from './sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetch temperature data
  getTemperatureData(): Observable<TemperatureData> {
    return this.http.get<TemperatureData>(`${this.baseUrl}/temperature`);
  }

  // Fetch electricity data
  getElectricityData(): Observable<ElectricityData> {
    return this.http.get<ElectricityData>(`${this.baseUrl}/electricity`);
  }

  // Fetch humidity data
  getHumidityData(): Observable<HumidityData> {
    return this.http.get<HumidityData>(`${this.baseUrl}/humidity`);
  }
}