import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioDetailComponent } from "./portfolio-detail.component";
import { DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
export function highchartsFactory() {
    var hc = require('highcharts/highstock');
    var dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}
var PortfolioDetailModule = /** @class */ (function () {
    function PortfolioDetailModule() {
    }
    PortfolioDetailModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PortfolioDetailComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule,
                        ChartsModule,
                        ChartModule
                    ],
                    providers: [
                        {
                            provide: HighchartsStatic,
                            useFactory: highchartsFactory
                        }
                    ]
                },] },
    ];
    return PortfolioDetailModule;
}());
export { PortfolioDetailModule };
