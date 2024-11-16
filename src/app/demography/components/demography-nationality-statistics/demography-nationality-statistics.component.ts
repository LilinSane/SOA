import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Statistic} from "../../../shared/models/statistics.model";
import {Notification} from "../../../shared/models/notification.model";
import {finalize} from "rxjs";
import {DemographyService} from "../../../shared/services/demography.service";

@Component({
  selector: 'app-demography-nationality-statistics',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        NgForOf
    ],
  templateUrl: './demography-nationality-statistics.component.html',
  styleUrls: ['./demography-nationality-statistics.component.css', '../../../../styles.css']
})
export class DemographyNationalityStatisticsComponent implements OnInit{
  form: FormGroup;
  percentage: number;
  nationalityField: string;
  colorField: string;
  notification: Notification;
  @Input() color: string[];
  @Input() nationality: string[];
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();

  ngOnInit(): void {
    this.form = new FormGroup({
      color: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required])
    })
  }

  getNationalityStatistics() {
    this.nationalityField = this.form.value.nationality;
    this.colorField = this.form.value.color;
    this.demographyService.getNationalityStatistics(this.colorField, this.nationalityField).pipe(
      finalize(() => {
        this.onNotify.emit(this.notification);
        this.form.reset();
      })
    )
      .subscribe({
        next: (data) => {
          this.notification = new Notification('Nationality statistic found successfully!', 'success');
          this.percentage = Object.values(data)[0];
          console.log(this.percentage);
        },
        error: (error) => {
          this.notification = new Notification('Statistic not found.', 'error');
        }
      });
  }

  constructor(private demographyService: DemographyService) {
  }
}
