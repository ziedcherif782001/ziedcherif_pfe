import { Routes } from '@angular/router';

import { RadarChartComponent } from './radar-chart.component';

export const routes: Routes = [
  {
    path: '',
    component: RadarChartComponent,
    data: {
      title: 'RadarChart'
    }
  }
];
