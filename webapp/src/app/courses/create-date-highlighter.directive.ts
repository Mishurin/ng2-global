import { Directive, Input, ElementRef, OnInit } from '@angular/core'

export const HIGHLIGHTER_STATES = {
    RECENT: "recent",
    UPCOMPING: "upcoming",
    ARCHIVE: "archive"
}

@Directive({
    selector: '[highlightByCreateDate]'
})
export class CreateDateHighlighterDirective {

    @Input('highlightByCreateDate') createDate: Date
    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.el.nativeElement.classList
            .add(CreateDateHighlighterDirective.getClassName(new Date(),this.createDate))
    }

    static getClassName(currentDate: Date, createDate: Date): string {
        if(currentDate >= createDate && CreateDateHighlighterDirective.getTimeSpanInDays(currentDate, createDate) <= 14) {
            return HIGHLIGHTER_STATES.RECENT
        } else if(currentDate < createDate) {
            return HIGHLIGHTER_STATES.UPCOMPING
        } else {
            return HIGHLIGHTER_STATES.ARCHIVE
        }
    }

    static getTimeSpanInDays(date1: Date, date2: Date): number {
        let diff: number = date1.getTime() - date2.getTime()
        return Math.floor(diff / (1000 * 60 * 60 * 24))
    }

}
