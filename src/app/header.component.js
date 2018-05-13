import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
    }
    HeaderComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    HeaderComponent.prototype.removeCollapse = function () {
        $("#myNavbar").removeClass('in');
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-header',
                    template: "\n            <nav class=\"navbar navbar-inverse\">\n                <div class=\"container-fluid\">\n                    <div class=\"navbar-header\">\n                        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\n                            <span class=\"icon-bar\"></span>\n                            <span class=\"icon-bar\"></span>\n                            <span class=\"icon-bar\"></span>                        \n                        </button>\n                        <img class=\"header-icon\" src=\"/stylesheets/favicon.png\"/>\n                        <a class=\"navbar-brand\" href=\"#\"> VC35 Portal</a>\n                    </div>\n                    <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\n                        <ul class=\"nav navbar-nav\">\n                            <li *ngIf=\"isLoggedIn()\" routerLinkActive=\"active\"><a [routerLink]=\"['/messages']\" (click)=\"removeCollapse()\">Messenger</a></li>\n                            <li *ngIf=\"isLoggedIn()\" class=\"dropdown\">\n                                <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">Portfolio<span class=\"caret\"></span></a>\n                                <ul class=\"dropdown-menu\">\n                                    <li *ngIf=\"isLoggedIn()\"><a [routerLink]=\"['/portfolios']\" (click)=\"removeCollapse()\">Portfolio</a></li>\n                                    <li *ngIf=\"isLoggedIn()\"><a  [routerLink]=\"['/portfolio-input']\" (click)=\"removeCollapse()\">Portfolio Entry</a></li>\n                                </ul>\n                            </li>\n                            <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn()\"><a [routerLink]=\"['/portfolio-detail']\" (click)=\"removeCollapse()\">Portfolio Details</a></li>\n                        </ul>\n                        <ul class=\"nav navbar-nav navbar-right\">\n                            <li *ngIf=\"!isLoggedIn()\" routerLinkActive=\"active\"><a [routerLink]=\"['auth/signup']\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>\n                            <li routerLinkActive=\"active\" *ngIf=\"!isLoggedIn()\"><a  [routerLink]=\"['auth/signin']\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</a></li>\n                            <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn()\"><a [routerLink]=\"['auth/logout']\"><span class=\"glyphicon glyphicon-log-out\"></span> Logout</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </nav>\n    "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
