import { Routes } from '@angular/router';
import {PersonsComponent} from "./persons/persons.component";
import {DemographyComponent} from "./demography/demography.component";

export const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  {path: 'persons', component: PersonsComponent},
  {path: 'demography', component: DemographyComponent}
];
