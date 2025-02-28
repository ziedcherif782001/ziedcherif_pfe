import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { DocsCalloutComponent } from '@docs-components/public-api';
import { HttpClient } from '@angular/common/http';

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

@Component({
    selector: 'app-polar-area-chart',
    templateUrl: './polar-area-chart.component.html',
    styleUrls: ['./polar-area-chart.component.scss'],
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class PolarAreaChartComponent implements OnInit {

  options = {
    maintainAspectRatio: false
  };

 

  
  chartPolarAreaData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
      }
    ]
  };
   
  chartPolarAreaData2: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
      }
    ]
  };
   
  chartPolarAreaData3: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
      }
    ]
  };
  constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.loadTemperatureData();
      this.loadHumidityData();
      this.loadElectricityData();
    }
    loadTemperatureData() {
      this.http.get<any>('assets/temperature_data.json').subscribe(data => {
        const temperatureData: TemperatureEntry[] = data.data; // Access the data array and use the defined interface
        const labels = temperatureData.map((entry: TemperatureEntry) => this.formatTime(entry.timestamp));
        const temperatures = temperatureData.map((entry: TemperatureEntry) => entry.temperature);
  
        this.chartPolarAreaData.labels = labels;
        this.chartPolarAreaData.datasets[0].data = temperatures;
      });
    }
  
    loadHumidityData() {
      this.http.get<any>('assets/humidity_sensor.json').subscribe(data => {
        const humidityData: HumidityEntry[] = data.data;
        const labels = humidityData.map((entry: HumidityEntry) => this.formatTime(entry.timestamp));
        const humidities = humidityData.map((entry: HumidityEntry) => entry.humidity);
  
        this.chartPolarAreaData2.labels = labels; // Assign the labels for humidity
        this.chartPolarAreaData2.datasets[0].data = humidities;
      });
    }
  
    loadElectricityData() {
      this.http.get<any>('assets/electricity_sensor.json').subscribe(data => {
        const electricityData: ElectricityEntry[] = data.data; // Assuming data contains the electricity data
        const labels = electricityData.map((entry: ElectricityEntry) => this.formatTime(entry.timestamp));
        const consumption = electricityData.map((entry: ElectricityEntry) => entry.consumption);
  
        this.chartPolarAreaData3.labels = labels; // Assign the labels for electricity
        this.chartPolarAreaData3.datasets[0].data = consumption; // Assign the electricity consumption to the dataset
      });
    }
  
    formatTime(timestamp: string): string {
      const date = new Date(timestamp);
      return date.getHours() + ':00'; // Extracting only hours from timestamp
    }
  

  

  
}
