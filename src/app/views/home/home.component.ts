import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class HomeComponent {

}
