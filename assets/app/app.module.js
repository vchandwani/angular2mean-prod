import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2OdometerModule } from 'ng2-odometer';
import { CalendarModule } from 'primeng/calendar';
import { SelectModule } from 'ng2-select';
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ChartsModule } from 'ng2-charts';
import { MessageModule } from "./messages/message.module";
var AppModule = /** @class */ (function () {
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AppComponent,
                        AuthenticationComponent,
                        HeaderComponent,
                        ErrorComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        routing,
                        HttpModule,
                        // PortfolioDetailModule,
                        Ng4LoadingSpinnerModule.forRoot(),
                        Ng2OdometerModule.forRoot(),
                        ChartsModule,
                        DataTableModule,
                        DataGridModule,
                        ButtonModule,
                        TableModule,
                        InputTextModule,
                        SharedModule,
                        DialogModule,
                        CalendarModule,
                        SelectModule,
                        MessageModule
                    ],
                    providers: [AuthService, ErrorService
                    ],
                    bootstrap: [AppComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = function () { return [
        { type: ApplicationRef, },
    ]; };
    return AppModule;
}());
export { AppModule };
platformBrowserDynamic().bootstrapModule(AppModule);
