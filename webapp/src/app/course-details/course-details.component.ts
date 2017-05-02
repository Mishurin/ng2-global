import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DatePipe } from '@angular/common'

import { CoursesService, CourseItem, DetailsComponent, Author, AuthorVM } from '../common/index'
import { BreadcrumbsService } from '../base/index'

@Component({
    selector: 'course-details',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class CourseDetailsComponent extends DetailsComponent {

    course: CourseItem

    constructor(
        protected courseSrv: CoursesService,
        protected router: Router,
        protected fb: FormBuilder,
        private aRoute: ActivatedRoute,
        private bcSrv: BreadcrumbsService
    ) {
        super(courseSrv, router, fb)
    }

    ngOnInit() {
        super.ngOnInit()
        this.aRoute.data.subscribe((data) => {
            let authors = <Author[]>data[0]
            let course = <CourseItem>data[1]
            this.course = course

            this.detailsForm.setValue({
                name: course.name,
                description: course.description,
                date: new DatePipe('en-US').transform(new Date(course.date), 'dd/MM/yyyy'),
                duration: course.duration,
                authors: CourseDetailsComponent.getAuthorsVMs(authors,course.authors)
            })

            this.bcSrv.setBreadCrumb(course.name)
        })
    }


    submit(e: any, detailsForm: FormGroup) {

        super.submit(e, detailsForm)

        let updatedItem: CourseItem = {
            id: this.course.id,
            name: detailsForm.controls.name.value,
            date: new Date(detailsForm.controls.date.value),
            duration: +detailsForm.controls.duration.value,
            description: detailsForm.controls.description.value,
            authors: CourseDetailsComponent.getAuthorsFromVms(detailsForm.controls.authors.value)
        }

        this.courseSrv.updateItem(updatedItem).subscribe(() => {
            this.goToHomePage()
        })
    }

    static getAuthorsVMs(allAuthors: Author[], courseAuthors: Author[]): AuthorVM[] {
        return allAuthors.map((item) => {
            let match: Author = courseAuthors.find((author) => {
                return item.id === author.id
            })
            return <AuthorVM>{
                id: item.id,
                firstName: item.firstName,
                lastName: item.lastName,
                selected: !!match
            }
        })
    }
}
