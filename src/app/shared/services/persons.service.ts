import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Person} from "../models/persons.model";
import {Observable} from "rxjs";
import {Statistic} from "../models/statistics.model";
import {EnumValues} from "../models/enumValues.model";
import {AdvancedPersonResponse} from "../models/AdvancedPersonResponse.model";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>("http://localhost:8080/api/v1/persons", person);
  }

  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>("http://localhost:8080/api/v1/persons/" + id);
  }

  getHeightStatistics(operation: string): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/v1/persons/height/" + operation);
  }

  updatePerson(person: Person, id: number): Observable<Person> {
    return this.http.put<Person>("http://localhost:8080/api/v1/persons/" + id, person);
  }

  deletePersonById(id: number): Observable<Person> {
    return this.http.delete<Person>("http://localhost:8080/api/v1/persons/" + id);
  }

  getPersons(params: HttpParams): Observable<AdvancedPersonResponse> {
    return this.http.get<AdvancedPersonResponse>("http://localhost:8080/api/v1/persons/", {params: params});
  }

  getEnumByName(name: string): Observable<EnumValues> {
    return this.http.get<EnumValues>("http://localhost:8080/api/v1/persons/enum/" + name);
  }
}
