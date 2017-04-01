import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Component, ElementRef } from '@angular/core'
import { CreateDateHighlighterDirective, HIGHLIGHTER_STATES } from './create-date-highlighter.directive'

class MockElementRef {

}

@Component({
    selector: 'test-component',
    template: '<div [highlightByCreateDate]="createDate"></div>'
})
class TestComponent {
    createDate: Date = new Date()
}

describe('CreateDateHighlighterDirective', () => {
    let fixture: ComponentFixture<TestComponent>
    let directiveEl
    let directive: CreateDateHighlighterDirective
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateDateHighlighterDirective,
                TestComponent
            ],
            //providers: [{ provide: ElementRef, useClass: MockElementRef }]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent)
        directiveEl = fixture.debugElement.query(By.directive(CreateDateHighlighterDirective))
        directive = directiveEl.injector.get(CreateDateHighlighterDirective)
    })

    it('should create an instance', () => {
        expect(directiveEl).not.toBeNull()
        expect(directive).toBeTruthy()
    })

    it('should provide time span for two dates in days', () => {
        let now = new Date()
        let dayMiliseconds = 24 * 60 * 60 * 1000
        let tomorrow = new Date(now.getTime() + dayMiliseconds)
        expect(CreateDateHighlighterDirective.getTimeSpanInDays(now, tomorrow)).toBe(-1)
        expect(CreateDateHighlighterDirective.getTimeSpanInDays(tomorrow, now)).toBe(1)
    })

    it('should provide class name depending on timespan', () => {
        let now = new Date()
        let dayMiliseconds = 24 * 60 * 60 * 1000
        let twoWeeks = dayMiliseconds * 14
        let tomorrow = new Date(now.getTime() + dayMiliseconds)
        let twoWeeksAgo = new Date(now.getTime() - twoWeeks)
        let moreThenTwoWeeks = new Date(now.getTime() - (twoWeeks + dayMiliseconds * 1))

        expect(CreateDateHighlighterDirective.getClassName(now, twoWeeksAgo)).toBe(HIGHLIGHTER_STATES.RECENT)
        expect(CreateDateHighlighterDirective.getClassName(now, moreThenTwoWeeks)).toBe(HIGHLIGHTER_STATES.ARCHIVE)
        expect(CreateDateHighlighterDirective.getClassName(now, tomorrow)).toBe(HIGHLIGHTER_STATES.UPCOMPING)

    })
})
