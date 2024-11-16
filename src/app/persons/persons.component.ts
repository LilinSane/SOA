import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PersonDetailsComponent} from "./components/person-details/person-details.component";
import {NavigationComponent} from "../shared/templates/navigation/navigation.component";
import {Coordinates, Person, Location} from "../shared/models/persons.model";
import {AllPersonsDetailsComponent} from "./components/all-persons-details/all-persons-details.component";
import {PersonCreationComponent} from "./components/person-creation/person-creation.component";
import {ColumnContentComponent} from "../shared/templates/column-content/column-content.component";
import {NgClass, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {DetailsCardComponent} from "../shared/templates/details-card/details-card.component";
import {PersonDeletionComponent} from "./components/person-deletion/person-deletion.component";
import {PersonUpdateComponent} from "./components/person-update/person-update.component";
import {PersonStatisticsComponent} from "./components/person-statistics/person-statistics.component";
import {StatusNotificationComponent} from "../shared/templates/status-notification/status-notification.component";
import {Notification} from "../shared/models/notification.model";
import {StatisticsDataComponent} from "../shared/templates/statistics-data/statistics-data.component";
import {Statistic} from "../shared/models/statistics.model";
import {PersonsService} from "../shared/services/persons.service";

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [
    PersonDetailsComponent,
    NavigationComponent,
    AllPersonsDetailsComponent,
    PersonCreationComponent,
    ColumnContentComponent,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    DetailsCardComponent,
    NgForOf,
    PersonDeletionComponent,
    PersonUpdateComponent,
    PersonStatisticsComponent,
    StatusNotificationComponent,
    StatisticsDataComponent
  ],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PersonsComponent implements OnInit{
  selectedForm: string = 'advanced';
  persons: Person[] = [];
  notification: Notification;
  color: string[];
  nationality: string[];

  selectForm(event: MouseEvent, form: string){
    this.persons = [];
    event.preventDefault();
    this.selectedForm = form;
  }

  handlePersonData(data: Person | Person[]) {
    this.persons = [];
    if(Array.isArray(data)){
      this.persons = data;
    }
    else{
      this.persons.push(data);
    }
  }

  handleNotificationData(data: Notification) {
    this.notification = data;
  }

  ngOnInit(): void {
    this.personService.getEnumByName("color")
      .subscribe({
        next: (data) => {
          this.color = data.enumValues;
        },
        error: (error) => {
          console.log("Invalid enum name");
        }
      });
    this.personService.getEnumByName("nationality")
      .subscribe({
        next: (data) => {
          this.nationality = data.enumValues;
        },
        error: (error) => {
          console.log("Invalid enum name");
        }
      });
  }

  constructor(private personService: PersonsService) {
  }
}
