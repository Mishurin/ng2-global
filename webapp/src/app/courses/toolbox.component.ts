import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

import { ROUTES } from '../app.config'

@Component({
    selector: 'app-toolbox',
    templateUrl: './toolbox.component.html',
    styleUrls: ['./toolbox.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit {
    
    @Output() findCourses = new EventEmitter(true)

    searchValue: string;


    constructor(private router: Router) { }

    ngOnInit() {
    }

    find() {
        this.findCourses.emit(this.searchValue)
    }

    goToAddPage() {
        this.router.navigate([ROUTES.NEW])
    }

}
