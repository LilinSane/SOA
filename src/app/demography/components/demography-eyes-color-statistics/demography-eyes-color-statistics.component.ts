import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Statistic} from "../../../shared/models/statistics.model";
import {finalize} from "rxjs";
import {Notification} from "../../../shared/models/notification.model";
import {PersonsService} from "../../../shared/services/persons.service";
import {DemographyService} from "../../../shared/services/demography.service";
import {StatisticsDataComponent} from "../../../shared/templates/statistics-data/statistics-data.component";

@Component({
  selector: 'app-demography-eyes-color-statistics',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    StatisticsDataComponent
  ],
  templateUrl: './demography-eyes-color-statistics.component.html',
  styleUrls: ['./demography-eyes-color-statistics.component.css', '../../../../styles.css']
})
export class DemographyEyesColorStatisticsComponent implements OnInit{
  form: FormGroup;
  eyesColor: Statistic;
  notification: Notification;
  @Input() color: string[];
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();

  constructor(private demographyService: DemographyService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      color: new FormControl(null, [Validators.required])
    })
  }

  getEyesColorStatistics() {
    this.eyesColor = new Statistic(this.form.value.color, 0);
    this.demographyService.getEyesColorStatistics(this.eyesColor.operation).pipe(
      finalize(() => {
        this.onNotify.emit(this.notification);
        this.form.reset();
      })
    )
      .subscribe({
        next: (data) => {
          this.notification = new Notification('Eyes color statistic found successfully!', 'success');
          this.eyesColor.value = Object.values(data)[0];
        },
        error: (error) => {
          this.notification = new Notification('Statistic not found.', 'error');
        }
      });
  }
}
