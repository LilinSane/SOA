import {Component, Input, SimpleChanges} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Notification} from "../../models/notification.model";

@Component({
  selector: 'app-status-notification',
  standalone: true,
  imports: [],
  templateUrl: './status-notification.component.html',
  styleUrls: ['./status-notification.component.css', '../../../../styles.css']
})
export class StatusNotificationComponent {
  @Input() notification: Notification;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notification'] && this.notification) {
      this.showNotification(this.notification.message, this.notification.type);
    }
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-bar-success' : 'snack-bar-error'
    });
  }

  constructor(private snackBar: MatSnackBar) {
  }
}
