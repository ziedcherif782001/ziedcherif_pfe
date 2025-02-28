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
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class LineChartComponent implements OnInit {
  options = {
    maintainAspectRatio: false
  };

  chartLineData: ChartData = { labels: [], datasets: [{ label: 'Temperature Data (°C)', backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', data: [] }] };
  chartLineDataHumidity: ChartData = { labels: [], datasets: [{ label: 'Humidity Data (%)', backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)', data: [] }] };
  chartLineDataElectricity: ChartData = { labels: [], datasets: [{ label: 'Electricity Data (kWh)', backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)', data: [] }] };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTemperatureData();
    this.loadHumidityData();
    this.loadElectricityData();
  }

  loadTemperatureData() {
  
      this.http.get<any>('assets/temperature_data.json').subscribe(data => {
        this.chartLineData= { labels: [], datasets: [{ label: 'Temperature Data (°C)', backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', data: [] }] };
        const temperatureData: TemperatureEntry[] = data.data;
        const labels = temperatureData.map(entry => this.formatTime(entry.timestamp));
        const temperatures = temperatureData.map(entry => entry.value);

        this.chartLineData.labels = labels;
        this.chartLineData.datasets[0].data = temperatures;
      });
    
  }

  loadHumidityData() {
    
      this.http.get<any>('assets/humidity_sensor.json').subscribe(data => {
        const humidityData: HumidityEntry[] = data.data;
        this.chartLineDataHumidity = { labels: [], datasets: [{ label: 'Humidity Data (%)', backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)', data: [] }] };
        const labels = humidityData.map(entry => this.formatTime(entry.timestamp));
        const humidities = humidityData.map(entry => entry.value);

        this.chartLineDataHumidity.labels = labels;
        this.chartLineDataHumidity.datasets[0].data = humidities;

       
      });
    
  }
  loadElectricityData() {
   
      this.http.get<any>('assets/electricity_sensor.json').subscribe(data => {
        this.chartLineDataElectricity = { labels: [], datasets: [{ label: 'Electricity Data (kWh)', backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)', data: [] }] };
        
        const electricityData: ElectricityEntry[] = data.data;
        const labels = electricityData.map(entry => this.formatTime(entry.timestamp));
        const consumption = electricityData.map(entry => entry.value);

        this.chartLineDataElectricity.labels = labels;
        this.chartLineDataElectricity.datasets[0].data = consumption;

        
      });
    
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
}
