import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    id: string;
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
    constructor(private readonly httpClient: HttpClient) {}

    listRepos(pageSize = 10, pageNumber = 1): Observable<ListReposResponse> {
        return this.httpClient.get<ListReposResponse>(
            `${this.apiUrl}&per_page=${pageNumber}&page=${pageSize}`,
            {observe: 'body', responseType: 'json'},
        );
    }
}