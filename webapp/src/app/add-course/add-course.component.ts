import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { DetailsComponent, CoursesService, Author } from '../common/index'


@Component({
    selector: 'app-add-course',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class AddCourseComponent extends DetailsComponent {

    constructor(
        protected courseSrv: CoursesService,
        protected router: Router,
        protected fb: FormBuilder,
        private aRoute: ActivatedRoute
    ) {
        super(courseSrv, router, fb)
    }

    ngOnInit() {
        super.ngOnInit()
        this.aRoute.data.subscribe((data) => {
            let authors = <Author[]>data[0]
            this.createForm.controls.authors.setValue(authors, { onlySelf: true })
        })
    }
}
