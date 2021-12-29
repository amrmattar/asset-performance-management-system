import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {    
    
  invokeSitesCreateComponentFunction = new EventEmitter();
  invokeRolesCreateComponentFunction = new EventEmitter();    
  invokeShowConfirmComponentFunction = new EventEmitter();
  invokeCreateRowComponentFunction = new EventEmitter();

  subsVar: Subscription;    
  rolesSubsVar: Subscription;
  showConfirmSubsVar: Subscription;
  createRowSubsVar: Subscription;
  constructor() { }    
    
  createSiteComponent() {    
    this.invokeSitesCreateComponentFunction.emit();    
  }
  createRoleComponent() {
    this.invokeRolesCreateComponentFunction.emit();
  }
  createRowComponent() {
    this.invokeCreateRowComponentFunction.emit();

  }
  async showConfirm(): Promise<any> {
    return this.invokeShowConfirmComponentFunction.emit();
  }
}    
