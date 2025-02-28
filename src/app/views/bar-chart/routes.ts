import { Routes } from '@angular/router';

import { BarChartComponent } from './bar-chart.component';

export const routes: Routes = [
  {
    path: '',
    component: BarChartComponent,
    data: { title: 'BarChart' },
    runGuardsAndResolvers: 'always' // ✅ Force reload on navigation
  }
];
