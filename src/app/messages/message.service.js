import { Http, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import API from '../../core/api';
import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";
var MessageService = /** @class */ (function () {
    function MessageService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this.messages = [];
        this.messageIsEdit = new EventEmitter();
    }
    MessageService.prototype.addMessage = function (message) {
        var _this = this;
        var body = JSON.stringify(message);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(API.api_url + API.message + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
            _this.messages.push(message);
            if (message) {
                _this.errorService.handleSuccess(response.json(), response.status);
                return message;
            }
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json(), error.status);
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.api_url + API.message + token)
            .map(function (response) {
            var messages = response.json().obj;
            var transformedMessages = [];
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
            }
            _this.messages = transformedMessages;
            return transformedMessages;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json(), error.status);
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.editMessage = function (message) {
        this.messageIsEdit.emit(message);
    };
    MessageService.prototype.updateMessage = function (message) {
        var _this = this;
        var body = JSON.stringify(message);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(API.api_url + API.message + '/' + message.messageId + token, body, { headers: headers })
            .map(function (response) {
            _this.errorService.handleSuccess(response.json(), response.status);
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json(), error.status);
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.deleteMessage = function (message) {
        var _this = this;
        this.messages.splice(this.messages.indexOf(message), 1);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(API.api_url + API.message + '/' + message.messageId + token)
            .map(function (response) {
            _this.errorService.handleSuccess(response.json(), response.status);
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json(), error.status);
            return Observable.throw(error.json());
        });
    };
    MessageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MessageService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
    ]; };
    return MessageService;
}());
export { MessageService };
