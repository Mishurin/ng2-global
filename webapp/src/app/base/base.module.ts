import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, LogoComponent, FooterComponent } from './index';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [HeaderComponent, FooterComponent],
    declarations: [HeaderComponent, FooterComponent, LogoComponent]
})
export class BaseModule { }
