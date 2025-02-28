import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/home/routes').then((m) => m.routes)
      },
      
    
     
    
      {
        path: 'doughnut-chart',
        loadChildren: () => import('./views/doughnut-chart/routes').then((m) => m.routes)
      },
      {
        path: 'piechart',
        loadChildren: () => import('./views/pie-chart/routes').then((m) => m.routes)
      },
      {
        path: 'barchart',
        loadChildren: () => import('./views/bar-chart/routes').then((m) => m.routes)
      },
      {
        path: 'linechart',
        loadChildren: () => import('./views/line-chart/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'polarareachart',
        loadChildren: () => import('./views/polar-area-chart/routes').then((m) => m.routes)
      },
      {
        path: 'radarchart',
        loadChildren: () => import('./views/radar-chart/routes').then((m) => m.routes)
      },
      {
        path: 'areachart',
        loadChildren: () => import('./views/areachart/routes').then((m) => m.routes)
      },
      {
        path: 'heatmapchart',
        loadChildren: () => import('./views/heatmap-chart/routes').then((m) => m.routes)
      },

     
    ]
  },
  
  { path: '**', redirectTo: 'dashboard' }
];
