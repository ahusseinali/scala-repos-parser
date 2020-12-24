import { Component, NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import { ListReposResponse, ReposService } from "../api/repos.service";

/** Main entry page. Loads a list of Git repos and parse their data into a table. */
@Component({
    templateUrl: './list.component.html',
})
export class ListComponent {
    reposDetails = 'Initial Details';

    constructor(private readonly reposService: ReposService) {}

    handleButtonClick() {
        this.reposService.listRepos().subscribe((results: ListReposResponse) => {
            this.reposDetails = `${results.total_count} - ${results.items[0].name}`;
        });
    }
}

@NgModule({
    declarations: [
      ListComponent,
    ],
    imports: [
        MatButtonModule,
    ],
    providers: [ListComponent],
  })
  export class ListComponentModule { }