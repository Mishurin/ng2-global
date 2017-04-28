import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { ToolboxComponent } from './toolbox.component'
import { ROUTES } from '../app.config'

class MockRouter {
    navigate() { }
}

describe('ToolboxComponent', () => {
    let component: ToolboxComponent
    let fixture: ComponentFixture<ToolboxComponent>
    let router: Router

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ToolboxComponent],
            providers: [{ provide: Router, useClass: MockRouter }]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolboxComponent)
        component = fixture.componentInstance
        component.searchValue = 'TEST'
        router = TestBed.get(Router)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should emit find event', (done) => {
        let searchVale = 'TEST'
        component.searchValue = searchVale
        component.findCourses.subscribe((event) => {
            expect(event).toBe(searchVale)
            done()
        })

        component.find()

    })

    it('should redirect to the "add" course page', () => {
        let navigate = spyOn(router, 'navigate')
        component.goToAddPage()
        expect(navigate).toHaveBeenCalledWith([ROUTES.NEW])
    })

})
