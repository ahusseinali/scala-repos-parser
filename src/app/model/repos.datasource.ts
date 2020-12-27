import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { ListReposResponse, ReposService } from "../api/repos.service";
import { ReposList, Repo } from "./repos";

/** DataSource implementation for fetching and serving repos list to UI table. */
export class ReposDataSource implements DataSource<Repo> {
    private repos$ = new BehaviorSubject<Array<Repo>>([]);
    public reposCount$ = new BehaviorSubject<number>(0);

    constructor(private reposService: ReposService) {}

    /** Overrides DataSource connect method. Triggerred by Material Table to load data. */
    connect (collectionViewer: CollectionViewer): Observable<Array<Repo>> {
        return this.repos$.asObservable();
    }

    /**
     * Overrides DataSource disconnect method. Triggerred by Material Table when component is
     * destroyed.
     */
    disconnect (collectionViewer: CollectionViewer): void {
        this.repos$.complete();
        this.reposCount$.complete();
    }

    /** Triggerred on Material Table page information change (page size or page number). */
    loadRepos (pageSize = 5, pageNumber = 1) {
        this.reposService.listRepos(pageSize, pageNumber).pipe(
            map((response: ListReposResponse) => ReposList.fromApiModel(response))
        ).subscribe(reposList => {
            this.reposCount$.next(reposList.totalCount);
            this.repos$.next(reposList.repos);
        });
    }
}