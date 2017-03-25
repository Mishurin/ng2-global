import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent, LogoComponent, FooterComponent } from './index';
import { LoaderComponent } from './loader/loader.component'

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [HeaderComponent, FooterComponent, LoaderComponent],
    declarations: [HeaderComponent, FooterComponent, LogoComponent, LoaderComponent]
})
export class BaseModule { }
