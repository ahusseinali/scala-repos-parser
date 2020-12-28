import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {ReposService} from './repos.service';
import {REPOS_API_RESPONSE} from '../testing/test.data';

describe('ReposService', () => {
    let reposService: ReposService;
    let mockHttpClient: HttpTestingController;

    beforeEach (async () => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule,
          ],
          providers: [
            ReposService,
          ],
        });
  
        reposService = TestBed.get(ReposService);
        mockHttpClient = TestBed.get(HttpTestingController);
      });
  
      afterEach (() => {
        mockHttpClient.verify();
      });

      it ('calls github search API with correct query parameters', () => {
          reposService.listRepos(10, 1).subscribe();
          mockHttpClient.expectOne(
              'https://api.github.com/search/repositories?q=apache+language:scala&' +
              'per_page=10&page=1');
      });

      it ('returns Http response correctly', (done) => {
          reposService.listRepos(5, 1).subscribe(result => {
              expect(result).toEqual(REPOS_API_RESPONSE);
              done();
          });
          const httpRequest = mockHttpClient.expectOne(
              'https://api.github.com/search/repositories?q=apache+language:scala&' +
              'per_page=5&page=1');
          httpRequest.flush(REPOS_API_RESPONSE);
      })
});