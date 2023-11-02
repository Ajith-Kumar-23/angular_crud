import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { SharedModule } from '../shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    ClipboardModule
  ],
  exports:[
    NgZorroAntdModule
  ],
})
export class ComponentsModule { }
