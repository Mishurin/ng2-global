import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { DurationPipe } from '../common/duration.pipe'

import { DurationComponent } from './duration.component'

describe('DurationComponent', () => {
    let component: DurationComponent
    let fixture: ComponentFixture<DurationComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DurationComponent, DurationPipe]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DurationComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
