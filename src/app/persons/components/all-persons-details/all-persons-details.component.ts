import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ColumnContentComponent} from "../../../shared/templates/column-content/column-content.component";
import {DetailsCardComponent} from "../../../shared/templates/details-card/details-card.component";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonsService} from "../../../shared/services/persons.service";
import {Person} from "../../../shared/models/persons.model";
import {NumberValidator} from "../../../shared/validators/NumberValidator";
import {HttpParams} from "@angular/common/http";
import {finalize, map} from "rxjs";
import {Notification} from "../../../shared/models/notification.model";

@Component({
  selector: 'app-all-persons-details',
  standalone: true,
  imports: [
    ColumnContentComponent,
    DetailsCardComponent,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    DatePipe,
    NgClass,
  ],
  templateUrl: './all-persons-details.component.html',
  styleUrls: ['./all-persons-details.component.css', '../../../../styles.css']
})
export class AllPersonsDetailsComponent implements OnInit{
  form: FormGroup;
  persons: Person[] = [];
  currentFilterIndex: number = 0;
  filtersViewStatuses: boolean[] = [];
  sortDirections: { [key: string]: 'asc' | 'desc' } = {};
  currentPage: number = 1;
  notification: Notification;
  @Output() onNotify: EventEmitter<Notification> = new EventEmitter();

  getPersons(){
    let params = this.createParams(this.sortDirections, this.filters().value, this.form.value.page, this.form.value.size);
    this.personService.getPersons(params).pipe(
      finalize(() => {
        this.onNotify.emit(this.notification);
      })
    ).subscribe({
      next: (data) => {
        if(data.personResponses.length == 0) {
          this.notification = new Notification('Persons not found.', 'error');
        }
        else {
          this.persons = data.personResponses;
          this.currentPage = data.page;
          this.notification = new Notification('Person fetched successfully!', 'success');
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.notification = new Notification('Persons not found.', 'error');
        }
        else {
          this.notification = new Notification('Error fetching person.', 'error');
        }
      }
    });
  }

  constructor(private personService: PersonsService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      isSortById: new FormControl(false),
      idSort: new FormControl(null),

      isSortByName: new FormControl(false),
      nameSort: new FormControl(null),

      isSortXCoordinate: new FormControl(false),
      xCoordinateSort: new FormControl(null),

      isSortYCoordinate: new FormControl(false),
      yCoordinateSort: new FormControl(null),

      isSortByHeight: new FormControl(false),
      heightSort: new FormControl(null),

      isSortByBirthday: new FormControl(false),
      birthdaySort: new FormControl(null),

      isSortByCreationDate: new FormControl(false),
      creationDateSort: new FormControl(null),

      isSortByHairColor: new FormControl(false),
      hairColorSort: new FormControl(null),

      isSortByEyesColor: new FormControl(false),
      eyesColorSort: new FormControl(null),

      isSortByNationality: new FormControl(false),
      nationalitySort: new FormControl(null),

      isSortByXLocation: new FormControl(false),
      xLocationSort: new FormControl(null),

      isSortByYLocation: new FormControl(false),
      yLocationSort: new FormControl(null),

      isSortByNameLocation: new FormControl(false),
      nameLocationSort: new FormControl(null),

      filters: new FormArray([]),

      page: new FormControl(null, [NumberValidator, Validators.min(1), Validators.max(2000000000)]),
      size: new FormControl(null, [NumberValidator, Validators.min(1), Validators.max(2000000000)])
    });

    this.setupCheckboxListenersForSort();
  }

  setupCheckboxListenersForSort(): void {
    const sortFields = [
      { checkbox: 'isSortById', sortField: 'idSort' },
      { checkbox: 'isSortByName', sortField: 'nameSort' },
      { checkbox: 'isSortXCoordinate', sortField: 'xCoordinateSort' },
      { checkbox: 'isSortYCoordinate', sortField: 'yCoordinateSort' },
      { checkbox: 'isSortByHeight', sortField: 'heightSort' },
      { checkbox: 'isSortByBirthday', sortField: 'birthdaySort' },
      { checkbox: 'isSortByCreationDate', sortField: 'creationDateSort' },
      { checkbox: 'isSortByHairColor', sortField: 'hairColorSort' },
      { checkbox: 'isSortByEyesColor', sortField: 'eyesColorSort' },
      { checkbox: 'isSortByNationality', sortField: 'nationalitySort' },
      { checkbox: 'isSortByXLocation', sortField: 'xLocationSort' },
      { checkbox: 'isSortByYLocation', sortField: 'yLocationSort' },
      { checkbox: 'isSortByNameLocation', sortField: 'nameLocationSort' }
    ];

    sortFields.forEach(field => {
      this.form.get(field.checkbox)?.valueChanges.subscribe((value: boolean) => {
        if (!value) {
          this.form.get(field.sortField)?.reset();
        }
      });
    });
  }

  addFilter(){
    (<FormArray>this.form.controls['filters']).push(new FormGroup({
      field: new FormControl(null, [Validators.required]),
      operation: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    }
    ));

    this.cdr.detectChanges();
    this.currentFilterIndex = this.filters().length - 1;
    this.filtersViewStatuses.push(false);
  }

  setFilterViewStatus(index: number): void {
    if (!this.filtersViewStatuses[index]) {
      this.filtersViewStatuses[index] = true;
      this.cdr.detectChanges();
    }
  }

  deleteFilter(index: number) {
    this.filters().removeAt(index);
    this.currentFilterIndex--;
    this.filtersViewStatuses.pop();
  }

  filters(): FormArray {
    return this.form.get('filters') as FormArray;
  }

  getFilterControl(index: number, controlName: string) {
    return this.filters().at(index).get(controlName);
  }

  toggleSort(field: string) {
    switch (this.sortDirections[field]) {
      case undefined:
        this.sortDirections[field] = 'asc';
        break;
      case 'asc':
        this.sortDirections[field] = 'desc';
        break;
      case 'desc':
        delete this.sortDirections[field];
        break;
      default:
        delete this.sortDirections[field];
        break;
    }
    this.getPersons()
  }

  createParams(sortFields: { [field: string]: 'asc' | 'desc' }, filters: { [index: string]: {field: string, operation: string, value: any } }, page: number, size: number) {
    let params = new HttpParams();
    console.log(filters);
    for (const [field, direction] of Object.entries(sortFields)) {
      const prefix = direction === 'asc' ? '' : '-';
      params = params.append('sort', `${prefix}${field}`);
    }

    for (const [index, { field, operation, value }] of Object.entries(filters)) {
      params = params.append('filter', `${field}[${operation}]=${value}`);
    }

    if (page) {
      params = params.append('page', page.toString());
    }

    if (size) {
      params = params.append('pageSize', size.toString());
    }
    return params;
  }

  getSortIcon(field: string): string {
    switch (this.sortDirections[field]) {
      case 'asc':
        return '▲';
      case 'desc':
        return '▼';
      default:
        return '◆';
    }
  }
}
