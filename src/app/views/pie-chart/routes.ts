import { Routes } from '@angular/router';

import { PieChartComponent } from './pie-chart.component';

export const routes: Routes = [
  {
    path: '',
    component: PieChartComponent,
    data: {
      title: 'PieChart'
    }
  }
];
