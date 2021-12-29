import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../../services/userservice';
import { SharedService } from '../../../services/sharedservice';
import { User } from '../../../models/User';
import { NotificationType } from 'angular2-notifications';
import UsersUtility from 'src/utilities/userutility';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService, SharedService]
})
export class LoginComponent implements OnInit {
    user: User = new User();
    public constructor(private fb: FormBuilder,private userService: UserService,
         private router: Router, private translateService: TranslateService,
         private toastr: ToastrService) {
    }
    onSubmit(form: any) {
        this.userService.login(this.user)
            .subscribe(data => {
                if (data.json().token != null) {
                     
                    UsersUtility.SetCurrentUser(JSON.stringify(data.json()));
                    if(localStorage.getItem("Url") == null){
                        this.router.navigate(['']);
                    }else{
                        window.location.replace(localStorage.getItem("Url"));
                    }
                  
                }else{
                  this.toastr.error(this.translateService.instant('user.invalid-username-password'), 'Error');
                }
            },
                error => {
                  this.toastr.error(this.translateService.instant('user.invalid-username-password'), 'Error');
                }
            );
    }




    registrationForm: FormGroup;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;



  ngOnInit() {
    this.initRegForm();
  }

  initRegForm() {
    this.registrationForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required]
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
}
