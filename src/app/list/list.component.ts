import { Component, NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { ListReposResponse, ReposService } from "../api/repos.service";
import { PanelLayoutModule } from "../components/panel.layout";
import { getReposListModel, Repo } from '../model/repos';
import { map } from 'rxjs/operators';

/** Main entry page. Loads a list of Git repos and parse their data into a table. */
@Component({
    templateUrl: './list.component.html',
})
export class ListComponent {
    reposDetails = 'Initial Details';

    constructor(private readonly reposService: ReposService) {}

    handleButtonClick() {
        this.reposService.listRepos()
            .pipe(map((response: ListReposResponse) => getReposListModel(response)))
            .subscribe((repos: Array<Repo>) => {
                this.reposDetails = `${repos.length} - ${repos[0].name}`;
            });
    }
}

@NgModule({
    declarations: [
      ListComponent,
    ],
    imports: [
        MatButtonModule,
        PanelLayoutModule
    ],
    providers: [ListComponent],
  })
  export class ListComponentModule { }