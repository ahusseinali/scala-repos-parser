import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent, ListComponentModule } from './list.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';

describe('ListComponent', () => {
    let loader: HarnessLoader;
    let fixture: ComponentFixture<ListComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListComponentModule],
            declarations: [ListComponent],
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(ListComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
    });
    
    it('should show button to load repos', async () => {
        const button = await loader.getHarness(MatButtonHarness);
        expect(await button.getText()).toEqual('Load Git Repos');
    });
});