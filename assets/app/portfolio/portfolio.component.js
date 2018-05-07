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
                            var _a = [.5, .3], sat = _a[0], lightness = _a[1];
                            var hue = Math.random();
                            _this.mutualChartColors[0].backgroundColor.push(_this.hslToRgb(hue, sat, lightness));
                            z++;
                        }
                        else if (item.type = 'Stock' && _this.activeStocks.indexOf(item._id) > -1) {
                            _this.stockChartLabelsMain.push(item._id);
                            _this.stockChartDataMain.push(item.latestPrice * item.unit);
                            _this.totalStockAmount += item.latestPrice * item.unit;
                            localStorage.setItem('totalStockAmount', _this.totalStockAmount.toString());
                            var _b = [.5, .3], sat = _b[0], lightness = _b[1];
                            var hue = Math.random();
                            _this.stockChartColors[0].backgroundColor.push(_this.hslToRgb(hue, sat, lightness));
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
    PortfolioComponent.prototype.hslToRgb = function (h, s, l) {
        var r, g, b;
        if (s == 0) {
            r = g = b = l;
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 1 / 3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1 / 3);
        }
        return "#" + [r * 255, g * 255, b * 255].map(function (c) { return Math.floor(c).toString(16); }).join('');
    };
    ;
    PortfolioComponent.prototype.hue2rgb = function (p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
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
