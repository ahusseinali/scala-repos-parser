import {CommonModule} from '@angular/common';
import { AfterViewInit, Component, Inject, NgModule, ViewChild } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { ReposService } from "../api/repos.service";
import { PanelLayoutModule } from "../components/panel.layout";
import { ReposDataSource } from "../model/repos.datasource";

/** Main entry page. Loads a list of Git repos and parse their data into a table. */
@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ReposListComponent implements AfterViewInit {
    readonly reposListColumns: string[] = ['name', 'owner', 'starcount'];
    readonly reposDataSource: ReposDataSource;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(@Inject(ReposService) reposService: ReposService) {
        this.reposDataSource = new ReposDataSource(reposService);
    }

    ngAfterViewInit() {
        // Triggers loading new page of data on page changes.
        this.paginator.page
            .subscribe(() => {
                this.loadPageData();
            });
    }

    /** Loads a single page of data. */
    loadPageData() {
        this.reposDataSource.loadRepos(this.paginator.pageSize, this.paginator.pageIndex + 1);
    }
}

@NgModule({
    declarations: [
      ReposListComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        PanelLayoutModule,
    ],
    providers: [ReposListComponent],
  })
  export class ReposListComponentModule { }