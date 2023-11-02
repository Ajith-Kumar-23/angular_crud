import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular_crud';
  public componentRef:any;
  constructor(){}
  @ViewChild("alertContainer", { read: ViewContainerRef }) container;

  ngOnInit(): void {}

}
