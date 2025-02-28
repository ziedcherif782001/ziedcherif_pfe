import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Charts Types'
  },
  
 
 
 
 
  {
    name: 'Line Chart',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/linechart'
  },
  {
    name: 'Bar Chart',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/barchart'
  },
  

  
 

];
