import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent, LogoComponent, FooterComponent, LoaderComponent, LoaderService } from './index'

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [HeaderComponent, FooterComponent, LoaderComponent],
    declarations: [HeaderComponent, FooterComponent, LogoComponent, LoaderComponent],
    providers: [LoaderService]
})
export class BaseModule { }
