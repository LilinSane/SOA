import {Component, OnInit} from '@angular/core';
import {AllPersonsDetailsComponent} from "../persons/components/all-persons-details/all-persons-details.component";
import {ColumnContentComponent} from "../shared/templates/column-content/column-content.component";
import {DetailsCardComponent} from "../shared/templates/details-card/details-card.component";
import {NgClass, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {PersonCreationComponent} from "../persons/components/person-creation/person-creation.component";
import {PersonDeletionComponent} from "../persons/components/person-deletion/person-deletion.component";
import {PersonDetailsComponent} from "../persons/components/person-details/person-details.component";
import {PersonStatisticsComponent} from "../persons/components/person-statistics/person-statistics.component";
import {PersonUpdateComponent} from "../persons/components/person-update/person-update.component";
import {
  DemographyEyesColorStatisticsComponent
} from "./components/demography-eyes-color-statistics/demography-eyes-color-statistics.component";
import {
  DemographyNationalityStatisticsComponent
} from "./components/demography-nationality-statistics/demography-nationality-statistics.component";
import {PersonsService} from "../shared/services/persons.service";
import {Notification} from "../shared/models/notification.model";
import {StatusNotificationComponent} from "../shared/templates/status-notification/status-notification.component";

@Component({
  selector: 'app-demography',
  standalone: true,
  imports: [
    AllPersonsDetailsComponent,
    ColumnContentComponent,
    DetailsCardComponent,
    NgForOf,
    NgSwitchCase,
    PersonCreationComponent,
    PersonDeletionComponent,
    PersonDetailsComponent,
    PersonStatisticsComponent,
    PersonUpdateComponent,
    NgClass,
    NgSwitch,
    DemographyEyesColorStatisticsComponent,
    DemographyNationalityStatisticsComponent,
    StatusNotificationComponent
  ],
  templateUrl: './demography.component.html',
  styleUrl: './demography.component.css'
})
export class DemographyComponent implements OnInit{
  selectedForm: string = 'eyesColor';
  color: string[];
  nationality: string[];
  notification: Notification;

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

  handleNotificationData(data: Notification) {
    this.notification = data;
  }

  selectForm(event: Event, form: string){
    event.preventDefault();
    this.selectedForm = form;
  }

  constructor(private personService: PersonsService) {
  }
}
