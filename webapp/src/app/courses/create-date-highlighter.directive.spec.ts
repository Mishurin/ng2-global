import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { Component, ElementRef } from '@angular/core'
import { CreateDateHighlighterDirective } from './create-date-highlighter.directive'

class MockElementRef {

}

@Component({
    selector: 'test-component',
    template: ''
})
class TestComponent {
    createDate: Date = new Date();
}

describe('CreateDateHighlighterDirective', () => {
    let fixture: ComponentFixture<TestComponent>
    let directiveEl;
    let directive: CreateDateHighlighterDirective
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateDateHighlighterDirective,
                TestComponent
            ],
            //providers: [{ provide: ElementRef, useClass: MockElementRef }]
        }).overrideComponent(TestComponent, {
            set: {
                template: '<div [highlightByCreateDate]="createDate"></div>'
            }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent)
        directiveEl = fixture.debugElement.query(By.directive(CreateDateHighlighterDirective))
        expect(directiveEl).not.toBeNull();
        directive = directiveEl.injector.get(CreateDateHighlighterDirective)
    })

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
