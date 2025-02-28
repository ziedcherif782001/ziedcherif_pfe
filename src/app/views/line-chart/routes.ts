import { Routes } from '@angular/router';

import { LineChartComponent } from './line-chart.component';

export const routes: Routes = [
  {
    path: '',
    component: LineChartComponent,
    data: {
      title: 'LineChart'
    }
  }
];
