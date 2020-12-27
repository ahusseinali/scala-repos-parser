import {ListReposResponse, Repo as ApiRepo} from '../api/repos.service';

/** UI Model representing the list of repos. */
export class  ReposList {
    private constructor(readonly totalCount: number, readonly repos: Array<Repo>) {}

    static fromApiModel(response: ListReposResponse): ReposList {
        return new ReposList(
            response.total_count,
            response.items.map(item => Repo.fromApiModel(item)),
        );
    }
}

/** UI model representing a single Repo. */
export class Repo {
    private constructor(
        readonly id: string,
        readonly name: string,
        readonly fullName: string,
        readonly htmlUrl: string,
        readonly forksUrl: string,
        readonly keysUrl: string,
        readonly ownerId: number,
        readonly ownerName: string,
        readonly ownerType: string,
        readonly ownerUrl: string,
        readonly description: string,
        readonly url: string,
        readonly starCount: number,
    ) {}

    static fromApiModel (apiModel: ApiRepo): Repo {
        return new Repo(
            apiModel.id,
            apiModel.name,
            apiModel.full_name,
            apiModel.html_url,
            apiModel.forks_url,
            apiModel.keys_url,
            apiModel.owner.id,
            apiModel.owner.login,
            apiModel.owner.type,
            apiModel.owner.url,
            apiModel.description,
            apiModel.url,
            apiModel.stargazers_count,
        );
    }

    static toApiModel (model: Repo): ApiRepo {
        return {
            id: model.id,
            name: model.name,
            full_name: model.fullName,
            html_url: model.htmlUrl,
            forks_url: model.forksUrl,
            keys_url: model.keysUrl,
            description: model.description,
            url: model.url,
            stargazers_count: model.starCount,
            owner: {
                id: model.ownerId,
                login: model.ownerName,
                type: model.ownerType,
                url: model.ownerUrl,
            },
        } as ApiRepo;
    }
}