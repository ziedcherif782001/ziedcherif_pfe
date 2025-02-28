import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { HttpClient } from '@angular/common/http';

interface TemperatureEntry {
  timestamp: string;
  value: number;
}

interface HumidityEntry {
  timestamp: string;
 value: number;
}

interface ElectricityEntry {
  timestamp: string;
  value: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class BarChartComponent implements OnInit {
  options = {
    maintainAspectRatio: false
  };

  chartBarData: ChartData = { labels: [], datasets: [{ label: 'Temperature', backgroundColor: '#f87979', data: [] }] };
  chartBarData2: ChartData = { labels: [], datasets: [{ label: 'Humidity', backgroundColor: '#79a6f8', data: [] }] };
  chartBarData3: ChartData = { labels: [], datasets: [{ label: 'Electricity Consumption', backgroundColor: '#79f88c', data: [] }] };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTemperatureData();
    this.loadHumidityData();
    this.loadElectricityData();
  }

  loadTemperatureData() {
   
      this.http.get<any>('assets/temperature_data.json').subscribe(data => {
        this.chartBarData = { labels: [], datasets: [{ label: 'Temperature', backgroundColor: '#f87979', data: [] }] };

        const temperatureData: TemperatureEntry[] = data.data;
        const labels = temperatureData.map(entry => this.formatTime(entry.timestamp));
        const temperatures = temperatureData.map(entry => entry.value);

        this.chartBarData.labels = labels;
        this.chartBarData.datasets[0].data = temperatures;

       
      });
    
  }

  loadHumidityData() {
      this.http.get<any>('assets/humidity_sensor.json').subscribe(data => {
        const humidityData: HumidityEntry[] = data.data;
        this.chartBarData2= { labels: [], datasets: [{ label: 'Humidity', backgroundColor: '#79a6f8', data: [] }] };
        const labels = humidityData.map(entry => this.formatTime(entry.timestamp));
        const humidities = humidityData.map(entry => entry.value);

        this.chartBarData2.labels = labels;
        this.chartBarData2.datasets[0].data = humidities;

        
      });
    
  }

  loadElectricityData() {
   
      this.http.get<any>('assets/electricity_sensor.json').subscribe(data => {
        this.chartBarData3 = { labels: [], datasets: [{ label: 'Electricity Consumption', backgroundColor: '#79f88c', data: [] }] };
        const electricityData: ElectricityEntry[] = data.data;
        const labels = electricityData.map(entry => this.formatTime(entry.timestamp));
        const consumption = electricityData.map(entry => entry.value);

        this.chartBarData3.labels = labels;
        this.chartBarData3.datasets[0].data = consumption;

      });
    
  }
  
  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
  
  
}
