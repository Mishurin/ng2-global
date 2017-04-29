import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { DetailsComponent, CoursesService } from '../common/index'



@Component({
    selector: 'app-add-course',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class AddCourseComponent extends DetailsComponent {

    createForm: FormGroup

    constructor(courseSrv: CoursesService, router: Router, fb: FormBuilder) { 
        super(courseSrv, router, fb)
    }
}
