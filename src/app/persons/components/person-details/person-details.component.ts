import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DetailsCardComponent} from "../../../shared/templates/details-card/details-card.component";
import {ColumnContentComponent} from "../../../shared/templates/column-content/column-content.component";
import {Person} from "../../../shared/models/persons.model";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonsService} from "../../../shared/services/persons.service";
import {NumberValidator} from "../../../shared/validators/NumberValidator";
import {finalize} from "rxjs";
import {Notification} from "../../../shared/models/notification.model";

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [
    DetailsCardComponent,
    ColumnContentComponent,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css', '../../../../styles.css']
})
export class PersonDetailsComponent implements OnInit{
  form: FormGroup;
  notification: Notification;
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();
  @Output() onGetPerson: EventEmitter<Person> = new EventEmitter();

  getPerson() {
    this.personService.getPersonById(this.form.value.id).pipe(
      finalize(() => {
        this.onNotify.emit(this.notification);
        this.form.reset();
      })
    )
      .subscribe({
        next: (person) => {
          this.notification = new Notification('Person found successfully!', 'success');
          this.onGetPerson.emit(person);
        },
        error: (error) => {
          this.notification = new Notification('Person not found.', 'error');
        }
      });
  }

  constructor(private personService: PersonsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null, [NumberValidator, Validators.required, Validators.min(0)])
      })
  }

}
