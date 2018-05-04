import { Component } from "@angular/core";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ErrorService } from "../errors/error.service";
var PortfolioComponent = /** @class */ (function () {
    function PortfolioComponent(spinnerService, portfolioService, errorService) {
        this.spinnerService = spinnerService;
        this.portfolioService = portfolioService;
        this.errorService = errorService;
        this.mutualChartColors = [{ backgroundColor: [] }];
        this.stockChartColors = [{ backgroundColor: [] }];
        this.doughnutChartOptions = { 'responsive': true, 'maintainAspectRatio': true, 'transparencyEffects': true };
        this.rows = [];
        this.tempUID = [];
        this.tempNames = [];
        this.totalAmount = 0;
        this.totalMutualFundAmount = 0;
        this.totalStockAmount = 0;
        this.resultFlag = false;
        this.tempArrayNames = [];
        // Doughnut
        this.activeFunds = [];
        this.activeStocks = [];
        this.chartLabelsMain = [];
        this.stockChartLabelsMain = [];
        this.chartDataMain = [];
        this.stockChartDataMain = [];
        this.doughnutChartType = 'pie';
        this.polarAreaChartType = 'polarArea';
        this.polarAreaLegend = true;
        this.pieChartType = 'pie';
        this.chartDisplay = false;
        this.stockChartDisplay = false;
    }
    PortfolioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalAmount = 0;
        this.totalMutualFundAmount = 0;
        this.totalStockAmount = 0;
        this.spinnerService.show();
        this.portfolioService.getActiveFunds()
            .subscribe(function (data) {
            _this.rows = data;
            var i = 0;
            _this.rows.forEach(function (item) {
                if (item.type == 'MF') {
                    _this.activeFunds.push(item.name);
                }
                if (item.type == 'Stock') {
                    _this.activeStocks.push(item.name);
                }
                i++;
            });
            if (_this.rows.length == i) {
                _this.portfolioService.getLastEntry()
                    .subscribe(function (data) {
                    var z = 0;
                    var k = 0;
                    data.forEach(function (item) {
                        if (item.type = 'MF' && _this.activeFunds.indexOf(item._id) > -1) {
                            _this.chartLabelsMain.push(item._id);
                            _this.chartDataMain.push(item.latestPrice * item.unit);
                            _this.totalMutualFundAmount += item.latestPrice * item.unit;
                            localStorage.setItem('totalMutualFundAmount', _this.totalMutualFundAmount.toString());
                            _this.mutualChartColors[0].backgroundColor.push('#' + Math.floor(10000 + Math.random() * 900000));
                            z++;
                        }
                        else if (item.type = 'Stock' && _this.activeStocks.indexOf(item._id) > -1) {
                            _this.stockChartLabelsMain.push(item._id);
                            _this.stockChartDataMain.push(item.latestPrice * item.unit);
                            _this.totalStockAmount += item.latestPrice * item.unit;
                            localStorage.setItem('totalStockAmount', _this.totalStockAmount.toString());
                            _this.stockChartColors[0].backgroundColor.push('#' + Math.floor(10000 + Math.random() * 900000));
                            k++;
                        }
                    });
                    if (_this.rows.length == (z + k)) {
                        _this.spinnerService.hide();
                        _this.totalAmount = _this.totalStockAmount + _this.totalMutualFundAmount;
                        localStorage.setItem('totalAmount', _this.totalAmount.toString());
                        _this.chartDisplay = true;
                        _this.stockChartDisplay = true;
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    //console.error(error)
                });
            }
        }, function (error) {
            _this.spinnerService.hide();
            // console.error(error)
        });
    };
    PortfolioComponent.prototype.latestPrices = function () {
        var _this = this;
        this.spinnerService.show();
        this.tempUID = [];
        // Get Latest values of MF and Stocks
        this.portfolioService.getActiveFunds()
            .subscribe(function (data) {
            var k = 0;
            var i = 0;
            _this.rows = data;
            _this.rows.forEach(function (item) {
                if (_this.tempUID.indexOf(item.uid) < 0) {
                    i++;
                    _this.tempUID.push(item.uid);
                    setTimeout(function () {
                        _this.portfolioService.latestValue(item.uid, item.type)
                            .subscribe(function (data) {
                            _this.portfolioService.updateLatestValue(item.uid, item.type, data)
                                .subscribe(function (data) {
                                k++;
                                if (k == _this.rows.length) {
                                    _this.spinnerService.hide();
                                    _this.ngOnInit();
                                }
                            }, function (error) {
                                _this.spinnerService.hide();
                                //console.error(error)
                            });
                        }, function (error) {
                            _this.spinnerService.hide();
                            //console.error(error)
                        });
                    }, i * 1000);
                }
                else {
                    k++;
                    if (k == _this.rows.length) {
                        _this.spinnerService.hide();
                        _this.ngOnInit();
                    }
                }
            });
        }, function (error) {
            _this.spinnerService.hide();
            //console.error(error)
        });
    };
    PortfolioComponent.prototype.duplicateZero = function () {
        var _this = this;
        this.spinnerService.show();
        var date = new Date();
        var y = 0;
        var k = 1;
        var _loop_1 = function (i) {
            var endDate = new Date(date.getFullYear(), date.getMonth() + k, 1).toISOString();
            var startDate = new Date(date.getFullYear(), date.getMonth() - y, 0).toISOString();
            setTimeout(function () {
                // Get Last Entries for Zero values funds and stocks
                // Get Last Entries for Zero values funds and stocks
                _this.portfolioService.zeroEntries()
                    .subscribe(function (data) {
                    if (typeof data != 'undefined' && data) {
                        // Data Exist for Zero Unit
                        data.forEach(function (item) {
                            _this.tempArrayNames[item._id] = false;
                            setTimeout(function () {
                                _this.databaseEntryForFund(item, startDate, endDate);
                            }, 400);
                            _this.spinnerService.hide();
                        });
                        if (i == 2) {
                            _this.spinnerService.hide();
                            _this.errorService.handleSuccess({ title: 'Process Completed', success: true });
                        }
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    //console.error(error)
                });
            }, 500);
            y++;
            k--;
        };
        // Will try for Three months zero entries as I value is set to three
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
    };
    PortfolioComponent.prototype.databaseEntryForFund = function (obj, startDate, endDate) {
        var _this = this;
        this.portfolioService.fundZeroEntries(obj, startDate, endDate).subscribe(function (data) {
            if (data) {
                setTimeout(function () {
                    _this.portfolioService.insertPortfolio(obj, startDate, endDate).subscribe(function (data) {
                        return 'portfolio entry added';
                    }, function (error) {
                        _this.spinnerService.hide();
                        //console.error(error)
                    });
                }, 100);
            }
        }, function (error) {
            _this.spinnerService.hide();
            //console.error(error)
        });
    };
    PortfolioComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-portfolio',
                    styles: ["\n        .chart {display: block; width: 100%;}\n    "],
                    templateUrl: './portfolio.component.html'
                },] },
    ];
    /** @nocollapse */
    PortfolioComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: PortfolioService, },
        { type: ErrorService, },
    ]; };
    return PortfolioComponent;
}());
export { PortfolioComponent };
