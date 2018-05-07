import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";
var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.errorOccurred = new EventEmitter();
    }
    ErrorService.prototype.handleError = function (error, status) {
        var errorData = new Error(error.title, error.error.message, false, status);
        this.errorOccurred.emit(errorData);
    };
    ErrorService.prototype.handleSuccess = function (error) {
        var successData = new Error(error.title, '', true, error.status);
        this.errorOccurred.emit(successData);
    };
    return ErrorService;
}());
export { ErrorService };
