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
    selector: 'app-area-chart',
    templateUrl: './areachart.component.html',
    styleUrls: ['./areachart.component.scss'],
    imports: [RowComponent, ColComponent,  TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class AreaChartComponent implements OnInit {

  options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  chartAreaData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Temperature Data',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: [],
        fill: true
      },
    ]
  };

  chartAreaData2: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Humidity Data',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        data: [],
        fill: true
      },
    ]
  };

  chartAreaData3: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Electricity Consumption',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        data: [],
        fill: true
      },
    ]
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTemperatureData();
    this.loadHumidityData();
    this.loadElectricityData();
  }

  loadTemperatureData() {
    const storedData = localStorage.getItem('temperatureData');
    if (storedData) {
      this.chartAreaData = JSON.parse(storedData);
    } else {
      this.http.get<any>('assets/temperature_data.json').subscribe(data => {
        const temperatureData: TemperatureEntry[] = data.data;
        const labels = temperatureData.map(entry => this.formatTime(entry.timestamp));
        const temperatures = temperatureData.map(entry => entry.temperature);

        this.chartAreaData.labels = labels;
        this.chartAreaData.datasets[0].data = temperatures;

        localStorage.setItem('temperatureData', JSON.stringify(this.chartAreaData));
      });
    }
  }

  loadHumidityData() {
    const storedData = localStorage.getItem('humidityData');
    if (storedData) {
      this.chartAreaData2 = JSON.parse(storedData);
    } else {
      this.http.get<any>('assets/humidity_sensor.json').subscribe(data => {
        const humidityData: HumidityEntry[] = data.data;
        const labels = humidityData.map(entry => this.formatTime(entry.timestamp));
        const humidities = humidityData.map(entry => entry.humidity);

        this.chartAreaData2.labels = labels;
        this.chartAreaData2.datasets[0].data = humidities;

        localStorage.setItem('humidityData', JSON.stringify(this.chartAreaData2));
      });
    }
  }

  loadElectricityData() {
    const storedData = localStorage.getItem('electricityData');
    if (storedData) {
      this.chartAreaData3 = JSON.parse(storedData);
    } else {
      this.http.get<any>('assets/electricity_sensor.json').subscribe(data => {
        const electricityData: ElectricityEntry[] = data.data;
        const labels = electricityData.map(entry => this.formatTime(entry.timestamp));
        const consumption = electricityData.map(entry => entry.consumption);

        this.chartAreaData3.labels = labels;
        this.chartAreaData3.datasets[0].data = consumption;

        localStorage.setItem('electricityData', JSON.stringify(this.chartAreaData3));
      });
    }
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.getHours() + ':00';
  }
}
