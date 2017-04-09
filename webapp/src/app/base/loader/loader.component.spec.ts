import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoaderComponent } from './loader.component'
import { LoaderService } from './loader.service'

describe('LoaderComponent', () => {
    let component: LoaderComponent
    let fixture: ComponentFixture<LoaderComponent>
    let loaderService: LoaderService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoaderComponent],
            providers: [LoaderService]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent)
        component = fixture.componentInstance
        loaderService = TestBed.get(LoaderService)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
        expect(component.isLoaderHidden).toBeTruthy()
    })

    it('should set hidden flag to true', () => {
        component.isLoaderHidden = false
        loaderService.hide()
        expect(component.isLoaderHidden).toBeTruthy()
    })

    it('should set hidden flag to false', () => {
        component.isLoaderHidden = true
        loaderService.show()
        expect(component.isLoaderHidden).toBeFalsy()
    })

    it('should unsubscribe component from loader events', () => {
        let unsubscribe = spyOn(component.hideLoaderSubscription, 'unsubscribe')
        component.ngOnDestroy()
        expect(unsubscribe).toHaveBeenCalled()
    })
})
