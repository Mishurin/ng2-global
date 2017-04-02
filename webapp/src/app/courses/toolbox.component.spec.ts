import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsModule } from '@angular/forms'

import { ToolboxComponent } from './toolbox.component'

describe('ToolboxComponent', () => {
    let component: ToolboxComponent
    let fixture: ComponentFixture<ToolboxComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ToolboxComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolboxComponent)
        component = fixture.componentInstance
        component.searchValue = 'TEST'
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

})
