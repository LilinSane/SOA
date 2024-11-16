import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Coordinates, Location, Person} from "../../../shared/models/persons.model";
import {PersonsService} from "../../../shared/services/persons.service";
import {NumberValidator} from "../../../shared/validators/NumberValidator";
import {TextValidator} from "../../../shared/validators/TextValidator";
import {FloatValidator} from "../../../shared/validators/FloatValidator";
import {NgForOf, NgIf} from "@angular/common";
import {finalize} from "rxjs";
import {Notification} from "../../../shared/models/notification.model";

@Component({
  selector: 'app-person-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css', '../../../../styles.css']
})
export class PersonUpdateComponent implements OnInit{
  form: FormGroup;
  person: Person;
  notification: Notification;
  @Input() color: string[];
  @Input() nationality: string[];
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();
  @Output() onUpdatePerson: EventEmitter<Person> = new EventEmitter();

  updatePerson() {
    this.person = new Person(
      this.form.value.name,
      this.form.value.location.x && this.form.value.location.y && this.form.value.location.name
        ? new Location(this.form.value.location.x, this.form.value.location.y, this.form.value.location.name)
        : undefined,
      this.form.value.coordinates.x && this.form.value.coordinates.y
        ? new Coordinates(this.form.value.coordinates.x, this.form.value.coordinates.y)
        : undefined,
      this.form.value.height || undefined,
      this.form.value.passportID || undefined,
      this.form.value.hairColor ? this.form.value.hairColor.toUpperCase() : undefined,
      this.form.value.birthday || undefined,
      this.form.value.eyesColor ? this.form.value.eyesColor.toUpperCase() : undefined,
      this.form.value.nationality ? this.form.value.nationality.toUpperCase() : undefined
    );
    this.personService.updatePerson(this.person, this.form.value.id)
      .pipe(
        finalize(() => {
          this.onNotify.emit(this.notification);
          this.form.reset();
        })
      )
      .subscribe({
        next: (person) => {
          this.notification = new Notification('Person updated successfully!', 'success');
          this.onUpdatePerson.emit(person);
        },
        error: (error) => {
          if (error.status === 404) {
            this.notification = new Notification('Person not found.', 'error');
          } else {
            this.notification = new Notification('An error occurred while updating.', 'error');
          }
        }
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null,  [NumberValidator, Validators.min(1)]),
      name: new FormControl(null, [TextValidator]),
      coordinates: new FormGroup({
        x: new FormControl(null, [FloatValidator]),
        y: new FormControl(null, [NumberValidator, Validators.min(-177)])
      }),
      height: new FormControl(null, [FloatValidator, Validators.min(0)]),
      birthday: new FormControl(null),
      passportID: new FormControl(null, [NumberValidator, Validators.min(1)]),
      hairColor: new FormControl(null),
      eyesColor: new FormControl(null),
      nationality: new FormControl(null),
      location: new FormGroup({
        x: new FormControl(null, [FloatValidator]),
        y: new FormControl(null, [NumberValidator]),
        name: new FormControl(null)
      }),
    })
  }

  constructor(private personService: PersonsService) {
  }

}
