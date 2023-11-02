import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  //header on close
  public placement: NzDrawerPlacement = 'left';
  public loginEmail: any;
  public userData:any;

  constructor(private router: Router, private notify: MessageService) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userName');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    this.notify.success('Successfully Logout');
  }

}
