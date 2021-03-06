import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
declare var $: any;

@Component({
    selector: 'app-header',
    template: `
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>                        
                        </button>
                        <img class="header-icon" src="/stylesheets/favicon.png"/>
                        <a class="navbar-brand" href="#"> VC35 Portal</a>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <li *ngIf="isLoggedIn()" routerLinkActive="active"><a [routerLink]="['/messages']" (click)="removeCollapse()">Messenger</a></li>
                            <li *ngIf="isLoggedIn()" class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Portfolio<span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li *ngIf="isLoggedIn()"><a [routerLink]="['/portfolios']" (click)="removeCollapse()">Portfolio</a></li>
                                    <li *ngIf="isLoggedIn()"><a  [routerLink]="['/portfolio-input']" (click)="removeCollapse()">Portfolio Entry</a></li>
                                </ul>
                            </li>
                            <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['/portfolio-detail']" (click)="removeCollapse()">Portfolio Details</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li *ngIf="!isLoggedIn()" routerLinkActive="active"><a [routerLink]="['auth/signup']"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a  [routerLink]="['auth/signin']"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                            <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['auth/logout']"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
    `
})
export class HeaderComponent {
    constructor(private authService: AuthService) {}
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    removeCollapse(){
        $("#myNavbar").removeClass('in');
    }
}