import { Component, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
    selector: 'panel-layout',
    template: `
        <div fxLayout="column" fxLayoutAlign="center" fxFlex="50" fxFlexOffset="25">
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./panel.layout.scss'],
})
export class PanelLayout {}

@NgModule({
    exports: [PanelLayout],
    declarations: [PanelLayout],
    imports: [
        FlexLayoutModule,
    ],
})
export class PanelLayoutModule {}