import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidemenuComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    SidemenuComponent,
    NgZorroAntdModule,
    RouterModule
  ]
})
export class SharedModule { }
