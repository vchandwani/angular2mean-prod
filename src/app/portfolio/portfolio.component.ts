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
    public colors: Array<any> = ['#ffff00','#ff6600','#ff0066','#ff66ff','#6699ff','#33ccff','#66ffcc','#66ff66','#ccff66','#0000ff','#009933','#ff0000','#6600cc','#ccffcc','#800080','#00cccc','#99e600','#e65c00','#4080bf'];
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
    hueArray = [];
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
                                            this.mutualChartColors[0].backgroundColor.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
                                            z++;
                                        } else if (item.type = 'Stock' && this.activeStocks.indexOf(item._id) > -1) {
                                            this.stockChartLabelsMain.push(item._id);
                                            this.stockChartDataMain.push(item.latestPrice * item.unit);
                                            this.totalStockAmount += item.latestPrice * item.unit;
                                            localStorage.setItem('totalStockAmount', this.totalStockAmount.toString());
                                            this.stockChartColors[0].backgroundColor.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
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
                                    this.errorService.handleSuccess({ title: 'Process Completed', success: true },201);
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