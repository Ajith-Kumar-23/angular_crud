import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ClipboardModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
