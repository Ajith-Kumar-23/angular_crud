import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.hamMenu(event.target)
  }
  public isShow: boolean;
  public visible: boolean = false;
  public userData:any;
  constructor(private router: Router, private load: LoaderService, private notify: MessageService) { }

  ngOnInit(): void {
    this.hamMenu(event);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    this.notify.success('Successfully Logout');
  }

  hamMenu(event:any) {
    const width = window.innerWidth;
    if (width >= 1201) {
      this.isShow = false;
      this.visible = false;
    } else {
      this.isShow = true;
    }
  }

  open(): void {this.visible = true;}

  close(): void {this.visible = false;}

  document() {this.load.load(true);}
}
