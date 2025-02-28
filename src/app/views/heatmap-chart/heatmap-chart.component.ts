import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
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
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.scss'],
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class HeatmapChartComponent implements OnInit {
  options = {
    maintainAspectRatio: false
  };

  heatmapData: ChartData = { labels: [], datasets: [{ label: 'Heatmap Data', backgroundColor: '#ff5733', data: [] }] };
  heatmapData2: ChartData = { labels: [], datasets: [{ label: 'Heatmap Data', backgroundColor: '#ff5733', data: [] }] };
  heatmapData3: ChartData = { labels: [], datasets: [{ label: 'Heatmap Data', backgroundColor: '#ff5733', data: [] }] };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTemperatureData();
    this.loadHumidityData();
    this.loadElectricityData();
  }

  loadTemperatureData() {
    const storedData = localStorage.getItem('temperatureData');
    if (storedData) {
      this.heatmapData= JSON.parse(storedData);
    } else {
      this.http.get<any>('assets/temperature_data.json').subscribe(data => {
        const temperatureData: TemperatureEntry[] = data.data;
        const labels = temperatureData.map(entry => this.formatTime(entry.timestamp));
        const temperatures = temperatureData.map(entry => entry.temperature);

        this. heatmapData.labels = labels;
        this. heatmapData.datasets[0].data = temperatures;

        localStorage.setItem('temperatureData', JSON.stringify(this. heatmapData));
      });
    }
  }

  loadHumidityData() {
    // const storedData = localStorage.getItem('humidityData');
    // if (storedData) {
    //   this. heatmapData2 = JSON.parse(storedData);
    // } else {
      this.http.get<any>('assets/humidity_sensor.json').subscribe(data => {
        const humidityData: HumidityEntry[] = data.data;
        this.heatmapData2 = { labels: [], datasets: [{ label: 'Heatmap Data', backgroundColor: '#ff5733', data: [] }] };
        const labels = humidityData.map(entry => this.formatTime(entry.timestamp));
        const humidities = humidityData.map(entry => entry.humidity);

        this.heatmapData2.labels = labels;
        this.heatmapData2.datasets[0].data = humidities;

        // localStorage.setItem('humidityData', JSON.stringify(this. heatmapData2));
      });
    // }
  }

  loadElectricityData() {
    const storedData = localStorage.getItem('electricityData');
    if (storedData) {
      this. heatmapData3 = JSON.parse(storedData);
    } else {
      this.http.get<any>('assets/electricity_sensor.json').subscribe(data => {
        const electricityData: ElectricityEntry[] = data.data;
        const labels = electricityData.map(entry => this.formatTime(entry.timestamp));
        const consumption = electricityData.map(entry => entry.consumption);

        this. heatmapData3.labels = labels;
        this. heatmapData3.datasets[0].data = consumption;

        localStorage.setItem('electricityData', JSON.stringify(this. heatmapData3));
      });
    }
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.getHours() + ':00';
  }
}
