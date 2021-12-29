import { Injectable } from '@angular/core';  
import { Router, NavigationStart } from '@angular/router';  
import { Observable } from 'rxjs';  
import { Subject } from 'rxjs';  
  
@Injectable({
  providedIn: 'root'
}) export class ConfirmDialogService {  
    private subject = new Subject<any>();  
  
    confirmThis(message: string, yesFn: () => void, noFn: () => void): any {  
        this.setConfirmation(message, yesFn, noFn);  
    }  
  
    setConfirmation(message: string, yesFn: () => void, noFn: () => void): any {  
        const that = this;  
        this.subject.next({  
            type: 'confirm',  
            text: message,  
            yesFn(): any {  
                    that.subject.next(); // This will close the modal  
                    return yesFn();  
                },  
            noFn(): any {  
               that.subject.next();  
               return  noFn();  
            }  
        });

  
    }  
  
    getMessage(): Observable<any> {  
        return this.subject.asObservable();  
    }  
}  
