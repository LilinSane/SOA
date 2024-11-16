import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnContentComponent} from "../../../shared/templates/column-content/column-content.component";
import {Coordinates, Location, Person} from "../../../shared/models/persons.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonsService} from "../../../shared/services/persons.service";
import {NumberValidator} from "../../../shared/validators/NumberValidator";
import {TextValidator} from "../../../shared/validators/TextValidator";
import {FloatValidator} from "../../../shared/validators/FloatValidator";
import {NgForOf, NgIf} from "@angular/common";
import {Notification} from "../../../shared/models/notification.model";
import {finalize} from "rxjs";

@Component({
  selector: 'app-person-creation',
  standalone: true,
  imports: [
    ColumnContentComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './person-creation.component.html',
  styleUrls: ['./person-creation.component.css', '../../../../styles.css']
})
export class PersonCreationComponent implements OnInit{
  form: FormGroup;
  person: Person;
  notification: Notification;
  @Input() color: string[];
  @Input() nationality: string[];
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();
  @Output() onAddPerson: EventEmitter<Person> = new EventEmitter();

  addPerson() {
    this.person = new Person(
      this.form.value.name,
      new Location(this.form.value.location.x, this.form.value.location.y, this.form.value.location.name),
      new Coordinates(this.form.value.coordinates.x, this.form.value.coordinates.y),
      this.form.value.height,
      this.form.value.passportID,
      this.form.value.hairColor.toUpperCase(),
      this.form.value.birthday,
      this.form.value.eyesColor ? this.form.value.eyesColor.toUpperCase() : undefined,
      this.form.value.nationality ? this.form.value.nationality.toUpperCase() : undefined
    );
    this.personService.addPerson(this.person)
      .pipe(
        finalize(() => {
          this.onNotify.emit(this.notification);
          this.form.reset();
        })
      )
      .subscribe({
        next: (person) => {
          this.notification = new Notification('Person added successfully!', 'success');
          this.onAddPerson.emit(person);
        },
        error: (error) => {
          this.notification = new Notification('Error adding person.', 'error');
        }
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, TextValidator]),
      coordinates: new FormGroup({
        x: new FormControl(null, [Validators.required, FloatValidator]),
        y: new FormControl(null, [Validators.required, NumberValidator, Validators.min(-177)])
      }),
      height: new FormControl(null, [Validators.required, FloatValidator, Validators.min(0)]),
      birthday: new FormControl(null),
      passportID: new FormControl(null, [Validators.required, NumberValidator, Validators.min(1)]),
      hairColor: new FormControl(null, [Validators.required]),
      eyesColor: new FormControl(null),
      nationality: new FormControl(null),
      location: new FormGroup({
        x: new FormControl(null, [Validators.required, FloatValidator]),
        y: new FormControl(null, [Validators.required, NumberValidator]),
        name: new FormControl(null)
      }),
    })
  }

  constructor(private personService: PersonsService) {
  }
}
