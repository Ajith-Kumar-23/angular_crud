import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private notify: NzNotificationService) { }

  success(title: any, desc?: any) {
    this.notify.success(title, desc, { nzDuration: 1000, nzClass:'messagesucess' });
  }

  error(title: any, desc?: any) {
    this.notify.error(title, desc, { nzDuration: 1000, nzClass:'errormsg' });
  }

  warning(title: any, desc?: any) {
    this.notify.warning(title, desc, { nzDuration: 1000, nzClass:'warnmsg' });
  }

  info(title: any, desc?: any) {
    this.notify.info(title, desc, { nzDuration: 1000, nzClass:'infomsg' });
  }

}
