import {Injectable} from '@angular/core';
import {NotifierService} from "angular-notifier";
import {NotificationType} from "./model/NotificationType";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) {
  }

  public notifyDefault(message: string) {
    this.notify(NotificationType.DEFAULT, message);
  }

  public notifySuccess(message: string) {
    this.notify(NotificationType.SUCCESS, message);
  }

  public notifyError(message: string) {
    this.notify(NotificationType.ERROR, message);
  }

  public notifyInfo(message: string) {
    this.notify(NotificationType.INFO, message);
  }

  public notifyWarning(message: string) {
    this.notify(NotificationType.WARNING, message);
  }

  private notify(type: NotificationType, message: string): void {
    this.notifier.notify(type, message);
  }
}
