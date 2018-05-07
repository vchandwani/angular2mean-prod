import { Component } from "@angular/core";
import { ErrorService } from "./error.service";
import { Router } from "@angular/router";
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(errorService, router) {
        this.errorService = errorService;
        this.router = router;
        this.display = 'none';
        this.displaySuccess = 'none';
        this.displayError = 'none';
    }
    ErrorComponent.prototype.onErrorHandled = function () {
        this.display = 'none';
    };
    ErrorComponent.prototype.signIn = function () {
        this.display = 'none';
        this.router.navigateByUrl('/auth/signin');
    };
    ErrorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorService.errorOccurred
            .subscribe(function (error) {
            if (error.success) {
                _this.displaySuccess = '';
                _this.displayError = 'none';
            }
            else {
                _this.displayError = '';
                _this.displaySuccess = 'none';
            }
            if (error.status == undefined) {
                error.status = 401;
            }
            _this.status = error.status;
            _this.error = error;
            _this.display = 'block';
        });
    };
    ErrorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-error',
                    templateUrl: './error.component.html'
                },] },
    ];
    /** @nocollapse */
    ErrorComponent.ctorParameters = function () { return [
        { type: ErrorService, },
        { type: Router, },
    ]; };
    return ErrorComponent;
}());
export { ErrorComponent };
