import { Routes } from '@angular/router';

import { DoughnutChartComponent } from './doughnut-chart.component';

export const routes: Routes = [
  {
    path: '',
    component: DoughnutChartComponent,
    data: {
      title: 'doughnutchart'
    }
  }
];
