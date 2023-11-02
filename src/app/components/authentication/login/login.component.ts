import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { ResponseModel } from '../../Models/responseModel';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    
    // Local Variables
    loginForm: any = {
        userName: '',  // Match this to the ngModel in the template
        password: '',
    };
    public user_id;
    public isLoginLoad = false;
    public userName: string = 'user123';
    public userPassword: any = 'User@123';

    constructor(private fb: FormBuilder, private message: MessageService, private route: Router,
        private load: LoaderService, private user: UserService) { }

    ngOnInit(): void {
    }

    //Click to login the Dashboard Page (Login Functionality)
    login(values:any) {
        this.isLoginLoad = true;
        this.user.getUsers().subscribe((res: ResponseModel[]) => {
            res?.forEach((element: any) => {
                if ((element?.email == values?.userName) && (element?.password == values?.password)) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userName', element?.name);
                    localStorage.setItem('userId', element?.id);
                    this.route.navigate([''])
                    this.load.load(true);
                    this.isLoginLoad = false;
                    this.message.success('Successfully Login');
                }
            });
        },(error:any)=>{
            this.message.error('Something Wrong...');
        })
    }

    // Eye icon changes
    password = "password"
    i: any = "eye-invisible"
    iChange() {
        if (this.password == "password") {
            this.password = "text"
            this.i = "eye"
        }
        else {
            this.password = "password"
            this.i = "eye-invisible"
        }
    }

}
