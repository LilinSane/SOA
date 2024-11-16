import {Component, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PersonsComponent} from "./persons/persons.component";
import {} from '@angular/common/http';
import {NavigationComponent} from "./shared/templates/navigation/navigation.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PersonsComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'SOA 1 front';
}
