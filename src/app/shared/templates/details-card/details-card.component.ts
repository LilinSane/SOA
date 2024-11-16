import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {Person} from "../../models/persons.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css'
})
export class DetailsCardComponent implements OnInit{
  @Input() person!: Person;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }
}
