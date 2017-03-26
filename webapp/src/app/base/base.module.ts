import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent, LogoComponent, FooterComponent, LoaderComponent, LoaderService, ProfilerComponent } from './index';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [HeaderComponent, FooterComponent, LoaderComponent, ProfilerComponent],
    declarations: [HeaderComponent, FooterComponent, LogoComponent, LoaderComponent, ProfilerComponent],
    providers: [LoaderService]
})
export class BaseModule { }
