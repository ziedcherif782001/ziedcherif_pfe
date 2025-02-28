import { Routes } from '@angular/router';

import { PolarAreaChartComponent } from './polar-area-chart.component';

export const routes: Routes = [
  {
    path: '',
    component:PolarAreaChartComponent ,
    data: {
      title: 'PolarCharts'
    }
  }
];
