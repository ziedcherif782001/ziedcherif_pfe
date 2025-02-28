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
    selector: 'app-radar-chart',
    templateUrl: './radar-chart.component.html',
    styleUrls: ['./radar-chart.component.scss'],
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class RadarChartComponent implements OnInit{

  options = {
    maintainAspectRatio: false
  };

  

 

  chartRadarData: ChartData = {
    labels: [],
    datasets: [
    
      {
        label: '2021',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: []
      }
    ]
  };
  chartRadarData1: ChartData = {
    labels: [],
    datasets: [
     
      {
        label: '2021',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: []
      }
    ]
  };
  chartRadarData2: ChartData = {
    labels: [],
    datasets: [
     
      {
        label: '2021',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: []
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
    
          this. chartRadarData.labels = labels;
          this. chartRadarData.datasets[0].data = temperatures;
        });
      }
    
      loadHumidityData() {
        this.http.get<any>('assets/humidity_sensor.json').subscribe(data => {
          const humidityData: HumidityEntry[] = data.data;
          const labels = humidityData.map((entry: HumidityEntry) => this.formatTime(entry.timestamp));
          const humidities = humidityData.map((entry: HumidityEntry) => entry.humidity);
    
          this. chartRadarData1.labels = labels; // Assign the labels for humidity
          this. chartRadarData1.datasets[0].data = humidities;
        });
      }
    
      loadElectricityData() {
        this.http.get<any>('assets/electricity_sensor.json').subscribe(data => {
          const electricityData: ElectricityEntry[] = data.data; // Assuming data contains the electricity data
          const labels = electricityData.map((entry: ElectricityEntry) => this.formatTime(entry.timestamp));
          const consumption = electricityData.map((entry: ElectricityEntry) => entry.consumption);
    
          this. chartRadarData2.labels = labels; // Assign the labels for electricity
          this. chartRadarData2.datasets[0].data = consumption; // Assign the electricity consumption to the dataset
        });
      }
    
      formatTime(timestamp: string): string {
        const date = new Date(timestamp);
        return date.getHours() + ':00'; // Extracting only hours from timestamp
      }
    

  

}
