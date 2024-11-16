import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Statistic} from "../../models/statistics.model";

@Component({
  selector: 'app-statistics-data',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './statistics-data.component.html',
  styleUrl: './statistics-data.component.css'
})
export class StatisticsDataComponent{
  @Input() statistic: Statistic;

}
