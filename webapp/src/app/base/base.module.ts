import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HeaderComponent, LogoComponent, FooterComponent, LoaderComponent, LoaderService, ProfilerComponent } from './index';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [HeaderComponent, FooterComponent, LoaderComponent, ProfilerComponent, BreadcrumbsComponent],
    declarations: [HeaderComponent, FooterComponent, LogoComponent, LoaderComponent, ProfilerComponent, BreadcrumbsComponent],
    providers: [LoaderService]
})
export class BaseModule { }
