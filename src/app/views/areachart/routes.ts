import { Routes } from '@angular/router';

import { AreaChartComponent } from './areachart.component';

export const routes: Routes = [
  {
    path: '',
    component: AreaChartComponent,
    data: {
      title: 'AreaChart'
    }
  }
];
