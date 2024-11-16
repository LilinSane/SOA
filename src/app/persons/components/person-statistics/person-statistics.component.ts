import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Person} from "../../../shared/models/persons.model";
import {PersonsService} from "../../../shared/services/persons.service";
import {NumberValidator} from "../../../shared/validators/NumberValidator";
import {finalize} from "rxjs";
import {Notification} from "../../../shared/models/notification.model";
import {Statistic} from "../../../shared/models/statistics.model";
import {StatisticsDataComponent} from "../../../shared/templates/statistics-data/statistics-data.component";

@Component({
  selector: 'app-person-statistics',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    StatisticsDataComponent
  ],
  templateUrl: './person-statistics.component.html',
  styleUrls: ['./person-statistics.component.css', '../../../../styles.css']
})
export class PersonStatisticsComponent implements OnInit{
  form: FormGroup;
  height: Statistic;
  notification: Notification;
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();

  constructor(private personService: PersonsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      operation: new FormControl(null, [Validators.required])
    })
  }

  getHeightStatistics() {
    this.height = new Statistic(this.form.value.operation, 0);
    this.personService.getHeightStatistics(this.height.operation).pipe(
      finalize(() => {
        this.onNotify.emit(this.notification);
        this.form.reset();
      })
    )
      .subscribe({
        next: (data) => {
          this.notification = new Notification('Height statistic found successfully!', 'success');
          this.height.value = Object.values(data)[0];
        },
        error: (error) => {
          this.notification = new Notification('Statistic not found.', 'error');
        }
      });
  }
}

