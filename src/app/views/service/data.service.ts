import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  private temperatureData$ = new BehaviorSubject<any[]>([]);
  private humidityData$ = new BehaviorSubject<any[]>([]);
  private electricityData$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  loadAllData() {
    return forkJoin({
      temperature: this.http.get<any>('assets/temperature_data.json'),
      humidity: this.http.get<any>('assets/humidity_sensor.json'),
      electricity: this.http.get<any>('assets/electricity_sensor.json')
    }).pipe(
      tap(({ temperature, humidity, electricity }) => {
        this.temperatureData$.next(temperature.data);
        this.humidityData$.next(humidity.data);
        this.electricityData$.next(electricity.data);
      })
    );
  }

  getTemperatureData() {
    return this.temperatureData$.asObservable();
  }

  getHumidityData() {
    return this.humidityData$.asObservable();
  }

  getElectricityData() {
    return this.electricityData$.asObservable();
  }
}