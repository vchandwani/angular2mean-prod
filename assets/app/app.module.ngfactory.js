/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./app.module";
import * as i2 from "./app.component";
import * as i3 from "./messages/messages.component.ngfactory";
import * as i4 from "./auth/authentication.component.ngfactory";
import * as i5 from "./portfolio/portfolio.component.ngfactory";
import * as i6 from "./portfolio/portfolio-input.component.ngfactory";
import * as i7 from "./portfolio-detail/portfolio-detail.component.ngfactory";
import * as i8 from "./app.component.ngfactory";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
import * as i11 from "@angular/platform-browser";
import * as i12 from "@angular/animations/browser";
import * as i13 from "@angular/platform-browser/animations";
import * as i14 from "@angular/animations";
import * as i15 from "@angular/http";
import * as i16 from "angular2-highcharts/dist/HighchartsService";
import * as i17 from "./portfolio-detail/portfolio-detail.module";
import * as i18 from "ng4-loading-spinner";
import * as i19 from "@angular/router";
import * as i20 from "./errors/error.service";
import * as i21 from "./auth/auth.service";
import * as i22 from "./portfolio/portfolio.service";
import * as i23 from "./messages/message.service";
import * as i24 from "./messages/messages.component";
import * as i25 from "./auth/authentication.component";
import * as i26 from "./portfolio/portfolio.component";
import * as i27 from "./portfolio/portfolio-input.component";
import * as i28 from "./portfolio-detail/portfolio-detail.component";
import * as i29 from "primeng/components/common/shared";
import * as i30 from "primeng/components/dropdown/dropdown";
import * as i31 from "primeng/components/paginator/paginator";
import * as i32 from "primeng/components/datatable/datatable";
import * as i33 from "primeng/components/dialog/dialog";
import * as i34 from "primeng/components/datagrid/datagrid";
import * as i35 from "primeng/components/inputtext/inputtext";
import * as i36 from "primeng/components/button/button";
import * as i37 from "ng2-charts/charts/charts";
import * as i38 from "angular2-highcharts/dist/index";
import * as i39 from "ng2-odometer/dist/index";
import * as i40 from "primeng/components/table/table";
import * as i41 from "primeng/components/calendar/calendar";
import * as i42 from "ng2-select/select/select.module";
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i3.MessagesComponentNgFactory, i4.AuthenticationComponentNgFactory, i5.PortfolioComponentNgFactory, i6.PortfolioInputComponentNgFactory, i7.PortfolioDetailComponentNgFactory, i8.AppComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵq, [[3, i0.LOCALE_ID]]), i0.ɵmpd(4608, i9.NgLocalization, i9.NgLocaleLocalization, [i0.LOCALE_ID, [2, i9.ɵa]]), i0.ɵmpd(4608, i10.ɵi, i10.ɵi, []), i0.ɵmpd(5120, i0.APP_ID, i0.ɵi, []), i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵn, []), i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵo, []), i0.ɵmpd(4608, i11.DomSanitizer, i11.ɵe, [i9.DOCUMENT]), i0.ɵmpd(6144, i0.Sanitizer, null, [i11.DomSanitizer]), i0.ɵmpd(4608, i11.HAMMER_GESTURE_CONFIG, i11.HammerGestureConfig, []), i0.ɵmpd(5120, i11.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1) { return [new i11.ɵDomEventsPlugin(p0_0, p0_1), new i11.ɵKeyEventsPlugin(p1_0), new i11.ɵHammerGesturesPlugin(p2_0, p2_1)]; }, [i9.DOCUMENT, i0.NgZone, i9.DOCUMENT, i9.DOCUMENT, i11.HAMMER_GESTURE_CONFIG]), i0.ɵmpd(4608, i11.EventManager, i11.EventManager, [i11.EVENT_MANAGER_PLUGINS, i0.NgZone]), i0.ɵmpd(135680, i11.ɵDomSharedStylesHost, i11.ɵDomSharedStylesHost, [i9.DOCUMENT]), i0.ɵmpd(4608, i11.ɵDomRendererFactory2, i11.ɵDomRendererFactory2, [i11.EventManager, i11.ɵDomSharedStylesHost]), i0.ɵmpd(5120, i12.AnimationDriver, i13.ɵc, []), i0.ɵmpd(5120, i12.ɵAnimationStyleNormalizer, i13.ɵd, []), i0.ɵmpd(4608, i12.ɵAnimationEngine, i13.ɵb, [i12.AnimationDriver, i12.ɵAnimationStyleNormalizer]), i0.ɵmpd(5120, i0.RendererFactory2, i13.ɵe, [i11.ɵDomRendererFactory2, i12.ɵAnimationEngine, i0.NgZone]), i0.ɵmpd(6144, i11.ɵSharedStylesHost, null, [i11.ɵDomSharedStylesHost]), i0.ɵmpd(4608, i0.Testability, i0.Testability, [i0.NgZone]), i0.ɵmpd(4608, i11.Meta, i11.Meta, [i9.DOCUMENT]), i0.ɵmpd(4608, i11.Title, i11.Title, [i9.DOCUMENT]), i0.ɵmpd(4608, i14.AnimationBuilder, i13.ɵBrowserAnimationBuilder, [i0.RendererFactory2, i11.DOCUMENT]), i0.ɵmpd(4608, i15.BrowserXhr, i15.BrowserXhr, []), i0.ɵmpd(4608, i15.ResponseOptions, i15.BaseResponseOptions, []), i0.ɵmpd(5120, i15.XSRFStrategy, i15.ɵa, []), i0.ɵmpd(4608, i15.XHRBackend, i15.XHRBackend, [i15.BrowserXhr, i15.ResponseOptions, i15.XSRFStrategy]), i0.ɵmpd(4608, i15.RequestOptions, i15.BaseRequestOptions, []), i0.ɵmpd(5120, i15.Http, i15.ɵb, [i15.XHRBackend, i15.RequestOptions]), i0.ɵmpd(4608, i10.FormBuilder, i10.FormBuilder, []), i0.ɵmpd(5120, i16.HighchartsStatic, i17.highchartsFactory, []), i0.ɵmpd(4608, i18.Ng4LoadingSpinnerService, i18.Ng4LoadingSpinnerService, []), i0.ɵmpd(5120, i19.ActivatedRoute, i19.ɵf, [i19.Router]), i0.ɵmpd(4608, i19.NoPreloading, i19.NoPreloading, []), i0.ɵmpd(6144, i19.PreloadingStrategy, null, [i19.NoPreloading]), i0.ɵmpd(135680, i19.RouterPreloader, i19.RouterPreloader, [i19.Router, i0.NgModuleFactoryLoader, i0.Compiler, i0.Injector, i19.PreloadingStrategy]), i0.ɵmpd(4608, i19.PreloadAllModules, i19.PreloadAllModules, []), i0.ɵmpd(5120, i19.ROUTER_INITIALIZER, i19.ɵi, [i19.ɵg]), i0.ɵmpd(5120, i0.APP_BOOTSTRAP_LISTENER, function (p0_0) { return [p0_0]; }, [i19.ROUTER_INITIALIZER]), i0.ɵmpd(4608, i20.ErrorService, i20.ErrorService, []), i0.ɵmpd(4608, i21.AuthService, i21.AuthService, [i15.Http, i20.ErrorService]), i0.ɵmpd(4608, i22.PortfolioService, i22.PortfolioService, [i15.Http, i20.ErrorService]), i0.ɵmpd(4608, i23.MessageService, i23.MessageService, [i15.Http, i20.ErrorService]), i0.ɵmpd(512, i9.CommonModule, i9.CommonModule, []), i0.ɵmpd(512, i10.ɵba, i10.ɵba, []), i0.ɵmpd(512, i10.FormsModule, i10.FormsModule, []), i0.ɵmpd(1024, i0.ErrorHandler, i11.ɵa, []), i0.ɵmpd(1024, i0.NgProbeToken, function () { return [i19.ɵb()]; }, []), i0.ɵmpd(512, i19.ɵg, i19.ɵg, [i0.Injector]), i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0, p1_0) { return [i11.ɵh(p0_0), i19.ɵh(p1_0)]; }, [[2, i0.NgProbeToken], i19.ɵg]), i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]), i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef, [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]), i0.ɵmpd(512, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]), i0.ɵmpd(512, i11.BrowserModule, i11.BrowserModule, [[3, i11.BrowserModule]]), i0.ɵmpd(512, i13.BrowserAnimationsModule, i13.BrowserAnimationsModule, []), i0.ɵmpd(1024, i19.ɵa, i19.ɵd, [[3, i19.Router]]), i0.ɵmpd(512, i19.UrlSerializer, i19.DefaultUrlSerializer, []), i0.ɵmpd(512, i19.ChildrenOutletContexts, i19.ChildrenOutletContexts, []), i0.ɵmpd(256, i19.ROUTER_CONFIGURATION, {}, []), i0.ɵmpd(1024, i9.LocationStrategy, i19.ɵc, [i9.PlatformLocation, [2, i9.APP_BASE_HREF], i19.ROUTER_CONFIGURATION]), i0.ɵmpd(512, i9.Location, i9.Location, [i9.LocationStrategy]), i0.ɵmpd(512, i0.Compiler, i0.Compiler, []), i0.ɵmpd(512, i0.NgModuleFactoryLoader, i0.SystemJsNgModuleLoader, [i0.Compiler, [2, i0.SystemJsNgModuleLoaderConfig]]), i0.ɵmpd(1024, i19.ROUTES, function () { return [[{ path: "", redirectTo: "/messages", pathMatch: "full" }, { path: "messages", component: i24.MessagesComponent }, { path: "auth", component: i25.AuthenticationComponent, loadChildren: "./auth/auth.module#AuthModule" }, { path: "portfolio", component: i26.PortfolioComponent }, { path: "portfolio-input", component: i27.PortfolioInputComponent }, { path: "portfolio-detail", component: i28.PortfolioDetailComponent }]]; }, []), i0.ɵmpd(1024, i19.Router, i19.ɵe, [i0.ApplicationRef, i19.UrlSerializer, i19.ChildrenOutletContexts, i9.Location, i0.Injector, i0.NgModuleFactoryLoader, i0.Compiler, i19.ROUTES, i19.ROUTER_CONFIGURATION, [2, i19.UrlHandlingStrategy], [2, i19.RouteReuseStrategy]]), i0.ɵmpd(512, i19.RouterModule, i19.RouterModule, [[2, i19.ɵa], [2, i19.Router]]), i0.ɵmpd(512, i15.HttpModule, i15.HttpModule, []), i0.ɵmpd(512, i10.ReactiveFormsModule, i10.ReactiveFormsModule, []), i0.ɵmpd(512, i29.SharedModule, i29.SharedModule, []), i0.ɵmpd(512, i30.DropdownModule, i30.DropdownModule, []), i0.ɵmpd(512, i31.PaginatorModule, i31.PaginatorModule, []), i0.ɵmpd(512, i32.DataTableModule, i32.DataTableModule, []), i0.ɵmpd(512, i33.DialogModule, i33.DialogModule, []), i0.ɵmpd(512, i34.DataGridModule, i34.DataGridModule, []), i0.ɵmpd(512, i35.InputTextModule, i35.InputTextModule, []), i0.ɵmpd(512, i36.ButtonModule, i36.ButtonModule, []), i0.ɵmpd(512, i37.ChartsModule, i37.ChartsModule, []), i0.ɵmpd(512, i38.ChartModule, i38.ChartModule, []), i0.ɵmpd(512, i17.PortfolioDetailModule, i17.PortfolioDetailModule, []), i0.ɵmpd(512, i18.Ng4LoadingSpinnerModule, i18.Ng4LoadingSpinnerModule, []), i0.ɵmpd(512, i39.Ng2OdometerModule, i39.Ng2OdometerModule, []), i0.ɵmpd(512, i40.TableModule, i40.TableModule, []), i0.ɵmpd(512, i41.CalendarModule, i41.CalendarModule, []), i0.ɵmpd(512, i42.SelectModule, i42.SelectModule, []), i0.ɵmpd(512, i1.AppModule, i1.AppModule, [])]); });
export { AppModuleNgFactory as AppModuleNgFactory };
