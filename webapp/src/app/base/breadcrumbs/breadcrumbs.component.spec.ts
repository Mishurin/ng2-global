import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { Component } from '@angular/core'

import { BreadcrumbsComponent } from './breadcrumbs.component'

@Component({
    selector: 'blank',
    template: ''
})
class BlankComponent {

}

describe('BreadcrumbsComponent', () => {
    let component: BreadcrumbsComponent
    let fixture: ComponentFixture<BreadcrumbsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule.withRoutes([{ path: '', component: BlankComponent }])],
            declarations: [BreadcrumbsComponent, BlankComponent],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
