import 'jest';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReposListComponent, ReposListComponentModule } from './repos.list.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ReposService } from '../api/repos.service';
import { of } from 'rxjs';
import { REPOS_API_RESPONSE } from '../testing/test.data';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListComponent', () => {
    let loader: HarnessLoader;
    let mockService: {listRepos: jest.Mock};
    let fixture: ComponentFixture<ReposListComponent>;

    const page = {
        getLoadButtonText: (fixture: ComponentFixture<ReposListComponent>) => {
            return fixture.debugElement.query(By.css('.test-list-loader-btn'))
                .nativeElement.textContent.trim();
        },

        clickLoadButton: (fixture: ComponentFixture<ReposListComponent>) => {
            fixture.debugElement.query(By.css('.test-list-loader-btn'))
                .triggerEventHandler('click', null);
        },

        getTableHeader: (fixture: ComponentFixture<ReposListComponent>) => {
            return fixture.debugElement.queryAll(By.css('.mat-header-cell'))
                .map(element => element.nativeElement.textContent.trim());
        },

        getTableColumn: (fixture: ComponentFixture<ReposListComponent>, columnName: string) => {
            return fixture.debugElement.queryAll(By.css(`td.mat-column-${columnName}`))
                .map(element => element.nativeElement.textContent.trim());
        },

        clickNextPage: (fixture: ComponentFixture<ReposListComponent>) => {
            fixture.debugElement.query(By.css('button.mat-paginator-navigation-next'))
                .triggerEventHandler('click', null);
        },
    };
    
    beforeEach(async () => {
        mockService = {
            listRepos: jest.fn(),
        }
        mockService.listRepos.mockReturnValue(of(REPOS_API_RESPONSE));
        await TestBed.configureTestingModule({
            imports: [
                ReposListComponentModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
            ],
            providers: [
                {provide: ReposService, useValue: mockService},
            ],
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(ReposListComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });
    
    it ('should show button to load repos', () => {
        expect(page.getLoadButtonText(fixture)).toEqual('Load Git Repos');
    });

    it ('should show repos table with empty rows', () => {
        expect(page.getTableHeader(fixture))
            .toEqual(['Name', 'Owner', 'Star count']);
        expect(page.getTableColumn(fixture, 'name').length).toBe(0);
    });

    it ('should call API to get results when button is clicked', fakeAsync(() => {
        page.clickLoadButton(fixture)
        tick();
        fixture.detectChanges();
        expect(mockService.listRepos).toHaveBeenCalledWith(5, 1);
    }));

    it ('should call API with next page when next button is clicked', fakeAsync(() => {
        page.clickLoadButton(fixture);
        tick();
        fixture.detectChanges();
        page.clickNextPage(fixture);
        tick();
        fixture.detectChanges();
        expect(mockService.listRepos).toHaveBeenCalledWith(5, 2);
    }));

    it ('should load data into table upon button click', fakeAsync(() => {
        page.clickLoadButton(fixture);
        tick();
        fixture.detectChanges();
        expect(page.getTableColumn(fixture, 'name')).toEqual(
            ['carbondata', 'kafka', 'spark-jobserver', 'spark', 'CMAK'],
        );
        expect(page.getTableColumn(fixture, 'owner')).toEqual(
            ['apache', 'mesos', 'spark-jobserver', 'apache', 'yahoo'],
        );
        expect(page.getTableColumn(fixture, 'starcount')).toEqual(
            ['1122', '412', '2635', '28407', '9656'],
        )
    }));
});