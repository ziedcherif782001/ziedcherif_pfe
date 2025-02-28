import { Routes } from '@angular/router';

import { HeatmapChartComponent } from './heatmap-chart.component';

export const routes: Routes = [
  {
    path: '',
    component: HeatmapChartComponent,
    data: {
      title: 'HeatmapChart'
    }
  }
];
