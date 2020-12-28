import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";

/** API model represnetation for Repo Ower informaton. */
export interface RepoOwner {
    login: string;
    id: number;
    url: string;
    type: string;
}

/** API model representation of Repo information. */
export interface Repo {
    id: number;
    name: string;
    full_name: string;
    owner: RepoOwner;
    html_url: string;
    description: string;
    url: string;
    forks_url: string;
    keys_url: string;
    stargazers_count: number;
}

export interface ListReposResponse {
    items: Array<Repo>;
    incomplete_results: boolean;
    total_count: number;
}

/** Service to fetch Scala Git Repos. */
@Injectable({
    providedIn: 'root',
})
export class ReposService {
    private readonly apiUrl =
        'https://api.github.com/search/repositories?q=apache+language:scala';
    constructor(@Inject(HttpClient) private readonly httpClient: HttpClient) {}

    listRepos(pageSize: number, pageNumber: number): Observable<ListReposResponse> {
        return this.httpClient.get<ListReposResponse>(
            `${this.apiUrl}&per_page=${pageSize}&page=${pageNumber}`,
            {observe: 'body', responseType: 'json'},
        );
    }
}