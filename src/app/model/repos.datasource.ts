import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { ListReposResponse, ReposService } from "../api/repos.service";
import { getReposListModel, Repo } from "./repos";

export class ReposDataSource implements DataSource<Repo> {
    private reposSubject = new BehaviorSubject<Array<Repo>>([]);

    constructor(private reposService: ReposService) {}

    connect (collectionViewer: CollectionViewer): Observable<Array<Repo>> {
        return this.reposSubject.asObservable();
    }

    disconnect (collectionViewer: CollectionViewer): void {
        this.reposSubject.complete();
    }

    loadRepos (pageSize = 10, pageNumber = 1) {
        this.reposService.listRepos(pageSize, pageNumber).pipe(
            map((response: ListReposResponse) => getReposListModel(response))
        ).subscribe(repos => this.reposSubject.next(repos));
    }
}