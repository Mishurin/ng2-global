import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BreadcrumbsComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {

    }



}
