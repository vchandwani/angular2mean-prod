import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
<<<<<<< HEAD
import { Observable, BehaviorSubject } from "rxjs";
import API from '../../core/api';
=======
import { Observable } from "rxjs";
>>>>>>> parent of d29d76f... make it better

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
<<<<<<< HEAD
        return this.http.post(API.host+API.message + token, body, {headers: headers})
=======
        return this.http.post('https://sheltered-caverns-71469.herokuapp.com/message' + token, body, {headers: headers})
>>>>>>> parent of d29d76f... make it better
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                if(message){
                    this.errorService.handleSuccess(response.json());
                    return message; 
                }                
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages() {
<<<<<<< HEAD
        return this.http.get(API.host+API.message)
=======
        return this.http.get('https://sheltered-caverns-71469.herokuapp.com/message')
>>>>>>> parent of d29d76f... make it better
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
                this.errorService.handleError(error.json());
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
<<<<<<< HEAD
        return this.http.patch(API.host+API.message+'/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => {                
                this.errorService.handleSuccess(response.json());                
            })
=======
        return this.http.patch('https://sheltered-caverns-71469.herokuapp.com/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
>>>>>>> parent of d29d76f... make it better
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
<<<<<<< HEAD
        return this.http.delete(API.host+API.message+'/' + message.messageId + token)
            .map((response: Response) => {                
                this.errorService.handleSuccess(response.json());                
            })
=======
        return this.http.delete('https://sheltered-caverns-71469.herokuapp.com/message/' + message.messageId + token)
            .map((response: Response) => response.json())
>>>>>>> parent of d29d76f... make it better
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}