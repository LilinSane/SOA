import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemographyService {

  constructor(private http: HttpClient) { }

  getEyesColorStatistics(color: string): Observable<number> {
    return this.http.get<number>("http://localhost:8081/api/v1/demography/eye-color/" + color.toLowerCase());
  }

  getNationalityStatistics(color: string, nationality: string): Observable<number> {
    return this.http.get<number>("http://localhost:8081/api/v1/demography/nationality/" + nationality.toLowerCase() + "/hair-color/" + color.toLowerCase() + "/percentage");
  }
}
