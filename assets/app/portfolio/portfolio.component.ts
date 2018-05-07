import { Component, OnInit } from "@angular/core";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ErrorService } from "../errors/error.service";

@Component({
    selector: 'app-portfolio',
    styles: [`
        .chart {display: block; width: 100%;}
    `],
    templateUrl: './portfolio.component.html'

})
export class PortfolioComponent implements OnInit {
    public mutualChartColors: Array<any> = [{ backgroundColor: [] }];
    public stockChartColors: Array<any> = [{ backgroundColor: [] }];
    public doughnutChartOptions: any = { 'responsive': true, 'maintainAspectRatio': true, 'transparencyEffects': true };
    constructor(private spinnerService: Ng4LoadingSpinnerService, private portfolioService: PortfolioService, private errorService: ErrorService) { }
    rows = [];
    tempUID = [];
    tempNames = [];
    totalAmount: number = 0;
    totalMutualFundAmount: number = 0;
    totalStockAmount: number = 0;
    resultFlag = false;
    tempArrayNames = [];
    // Doughnut
    public activeFunds = [];
    public activeStocks = [];
    public chartLabelsMain: string[] = [];
    public stockChartLabelsMain: string[] = [];
    public chartDataMain: number[] = [];
    public stockChartDataMain: number[] = [];
    public doughnutChartType: string = 'pie';
    public polarAreaChartType: string = 'polarArea';
    public polarAreaLegend: boolean = true;
    public pieChartType: string = 'pie';
    public chartDisplay = false;
    public stockChartDisplay = false;

    ngOnInit() {
        this.totalAmount = 0;
        this.totalMutualFundAmount = 0;
        this.totalStockAmount = 0;
        this.spinnerService.show();
        this.portfolioService.getActiveFunds()
            .subscribe(
                data => {
                    this.rows = data;
                    let i = 0;
                    this.rows.forEach((item) => {
                        if (item.type == 'MF') {
                            this.activeFunds.push(item.name);
                        }
                        if (item.type == 'Stock') {
                            this.activeStocks.push(item.name);
                        }
                        i++;
                    });
                    if (this.rows.length == i) {
                        this.portfolioService.getLastEntry()
                            .subscribe(
                                data => {
                                    let z = 0;
                                    let k = 0;
                                    data.forEach((item) => {
                                        if (item.type = 'MF' && this.activeFunds.indexOf(item._id) > -1) {
                                            this.chartLabelsMain.push(item._id);
                                            this.chartDataMain.push(item.latestPrice * item.unit);
                                            this.totalMutualFundAmount += item.latestPrice * item.unit;
                                            localStorage.setItem('totalMutualFundAmount', this.totalMutualFundAmount.toString());
                                            let [sat, lightness] = [.5, .3]
                                            let hue = Math.random();
                                            this.mutualChartColors[0].backgroundColor.push(this.hslToRgb(hue, sat, lightness));
                                            z++;
                                        } else if (item.type = 'Stock' && this.activeStocks.indexOf(item._id) > -1) {
                                            this.stockChartLabelsMain.push(item._id);
                                            this.stockChartDataMain.push(item.latestPrice * item.unit);
                                            this.totalStockAmount += item.latestPrice * item.unit;
                                            localStorage.setItem('totalStockAmount', this.totalStockAmount.toString());
                                            let [sat, lightness] = [.5, .3]
                                            let hue = Math.random();
                                            this.stockChartColors[0].backgroundColor.push(this.hslToRgb(hue, sat, lightness));
                                            k++;
                                        }
                                    });
                                    if (this.rows.length == (z + k)) {
                                        this.spinnerService.hide();
                                        this.totalAmount = this.totalStockAmount + this.totalMutualFundAmount;
                                        localStorage.setItem('totalAmount', this.totalAmount.toString());
                                        this.chartDisplay = true;
                                        this.stockChartDisplay = true;
                                    }
                                },
                                error => {
                                    this.spinnerService.hide();
                                    //console.error(error)
                                }
                            );
                    }

                },
                error => {
                    this.spinnerService.hide();
                    // console.error(error)
                }
            );
    }
    hslToRgb(h, s, l) {
        let r, g, b;
        if (s == 0) {
            r = g = b = l;
        } else {
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 1 / 3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1 / 3);
        }
        return "#" + [r * 255, g * 255, b * 255].map(c => Math.floor(c).toString(16)).join('');
    };
    hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    latestPrices() {
        this.spinnerService.show();
        this.tempUID = [];
        // Get Latest values of MF and Stocks
        this.portfolioService.getActiveFunds()
            .subscribe(
                data => {
                    let k = 0;
                    let i = 0;
                    this.rows = data;
                    this.rows.forEach((item) => {
                        if (this.tempUID.indexOf(item.uid) < 0) {
                            i++;
                            this.tempUID.push(item.uid);
                            setTimeout(() => {
                                this.portfolioService.latestValue(item.uid, item.type)
                                    .subscribe(
                                        data => {
                                            this.portfolioService.updateLatestValue(item.uid, item.type, data)
                                                .subscribe(
                                                    data => {
                                                        k++;
                                                        if (k == this.rows.length) {
                                                            this.spinnerService.hide();
                                                            this.ngOnInit();
                                                        }
                                                    },
                                                    error => {
                                                        this.spinnerService.hide();
                                                        //console.error(error)
                                                    }
                                                );
                                        },
                                        error => {
                                            this.spinnerService.hide();
                                            //console.error(error)
                                        }
                                    );
                            }, i * 1000);
                        } else {
                            k++;
                            if (k == this.rows.length) {
                                this.spinnerService.hide();
                                this.ngOnInit();
                            }
                        }
                    });
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );
    }
    duplicateZero() {
        this.spinnerService.show();
        let date = new Date();
        let y = 0;
        let k = 1;
        // Will try for Three months zero entries as I value is set to three

        for (let i = 0; i < 3; i++) {
            let endDate = new Date(date.getFullYear(), date.getMonth() + k, 1).toISOString();
            let startDate = new Date(date.getFullYear(), date.getMonth() - y, 0).toISOString();

            setTimeout(() => {
                // Get Last Entries for Zero values funds and stocks
                this.portfolioService.zeroEntries()
                    .subscribe(
                        data => {
                            if (typeof data != 'undefined' && data) {
                                // Data Exist for Zero Unit
                                data.forEach((item) => {
                                    this.tempArrayNames[item._id] = false;
                                    setTimeout(() => {
                                        this.databaseEntryForFund(item, startDate, endDate);
                                    }, 400);
                                    this.spinnerService.hide();
                                });
                                if (i == 2) {
                                    this.spinnerService.hide();
                                    this.errorService.handleSuccess({ title: 'Process Completed', success: true });
                                }
                            }
                        },
                        error => {
                            this.spinnerService.hide();
                            //console.error(error)
                        }
                    );
            }, 500);
            y++; k--;

        }
    }

    databaseEntryForFund(obj, startDate, endDate) {
        this.portfolioService.fundZeroEntries(obj, startDate, endDate).subscribe(
            data => {
                if (data) {
                    setTimeout(() => {
                        this.portfolioService.insertPortfolio(obj, startDate, endDate).subscribe(
                            data => {
                                return 'portfolio entry added';
                            },
                            error => {
                                this.spinnerService.hide();
                                //console.error(error)
                            }
                        );
                    }, 100);
                }
            },
            error => {
                this.spinnerService.hide();
                //console.error(error)
            }
        );
    }
}