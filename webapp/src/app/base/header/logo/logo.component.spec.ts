import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CommonModule } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { Component } from '@angular/core'
import { LogoComponent } from './logo.component'

@Component({
    selector: 'blank',
    template: ''
})
class BlankComponent {

}

describe('LogoComponent', () => {
    let component: LogoComponent
    let fixture: ComponentFixture<LogoComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule.withRoutes([{ path: '', component: BlankComponent }])],
            declarations: [LogoComponent, BlankComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
