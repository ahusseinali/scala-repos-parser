import { Component } from "@angular/core";

/** Main entry page. Loads a list of Git repos and parse their data into a table. */
@Component({
    templateUrl: './list.component.html',
})
export class ListComponent {
    reposDetails = 'Initial Details';

    handleButtonClick() {
        // TODO: Load data from server.
        this.reposDetails = 'Details change after click';
    }
}