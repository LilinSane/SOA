import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Person} from "../../../shared/models/persons.model";
import {PersonsService} from "../../../shared/services/persons.service";
import {NgIf} from "@angular/common";
import {NumberValidator} from "../../../shared/validators/NumberValidator";
import {Notification} from "../../../shared/models/notification.model";
import {finalize} from "rxjs";

@Component({
  selector: 'app-person-deletion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './person-deletion.component.html',
  styleUrls: ['./person-deletion.component.css', '../../../../styles.css']
})
export class PersonDeletionComponent implements OnInit{
  form: FormGroup;
  notification: Notification;
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();

  deletePerson() {
    this.personService.deletePersonById(this.form.value.id)
      .pipe(
        finalize(() => {
          this.onNotify.emit(this.notification);
          this.form.reset();
        })
      )
      .subscribe({
        next: () => {
          this.notification = new Notification('Person deleted successfully!', 'success');
        },
        error: (error) => {
          if (error.status === 404) {
            this.notification = new Notification('Person not found. Deletion failed.', 'error');
          } else {
            this.notification = new Notification('An error occurred while deleting.', 'error');
          }
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
