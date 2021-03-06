import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from "rxjs";
import API from '../../core/api';
import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) {
    }
    
    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(API.api_url+API.message + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                if(message){
                    this.errorService.handleSuccess(response.json(),response.status);
                    return message; 
                }                
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(),error.status);
                return Observable.throw(error.json());
            });
    }

    getMessages() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.api_url+API.message+ token)
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id)
                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(),error.status);
                return Observable.throw(error.json());
            });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(API.api_url+API.message+'/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => {                
                this.errorService.handleSuccess(response.json(),response.status);                
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(),error.status);
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(API.api_url+API.message+'/' + message.messageId + token)
            .map((response: Response) => {                
                this.errorService.handleSuccess(response.json(),response.status);                
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(),error.status);
                return Observable.throw(error.json());
            });
    }
}