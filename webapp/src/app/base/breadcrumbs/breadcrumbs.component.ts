import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { BreadcrumbsService } from './breadcrumbs.service'
import { Subscription } from 'rxjs/Rx'

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {

    breadcrumbSubscr: Subscription
    breadcrumb: string = null

    constructor(
        private bcSrv: BreadcrumbsService,
        private aRoute: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {

        this.breadcrumbSubscr = this.bcSrv.getBreadCrumbStream().subscribe((breadcrumb) => {
            this.breadcrumb = breadcrumb
            this.cd.markForCheck()
        })

        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            let root: ActivatedRoute = this.aRoute.root
            if(this.aRoute.children[0].component['name'] !== 'CourseDetailsComponent') {
                this.bcSrv.setBreadCrumb(null)
            }
        })
    }


}
