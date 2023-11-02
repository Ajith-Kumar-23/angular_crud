import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ResponseModel } from '../../Models/responseModel';
import { RequestModel } from '../../Models/requestModel';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    // Local Variable's
    public activityLoader: boolean = true;
    public filterForm: FormGroup;
    public page: number = 1;
    public limit: number = 10;
    public usersArray: ResponseModel[] = [];
    public copied: string = 'Copied';
    public isVisible: boolean = false
    public isVisible2: boolean = false
    editCondition: boolean
    createCondition: boolean
    checkUserName: boolean
    editUserForm: FormGroup
    createUserForm: FormGroup
    user: any
    constructor(private userService: UserService, private message: MessageService, private fb: FormBuilder,
        private router: Router) { };

    ngOnInit(): void {
        this.createUserForm = this.fb.group({
            name: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[-$#@$_!+=)%~`*?(&^])[A-Za-z\d$@#)$=!+~_`%(*?&^].{7,}')]),
            confirmPassword: new FormControl('', [Validators.required])
        }, {
            validator: MustMatch('password', 'confirmPassword')
        })
        if(localStorage.getItem('isLoggedIn')) {
            this.getAllUsersList()
        }
        else {
            this.router.navigate(['/auth/login']);
        }
    };

    //Get All User List
    getAllUsersList() {
        this.userService.getUsers().subscribe((res: ResponseModel[]) => {
            if (res) {
                this.usersArray = res;
                this.activityLoader = false;
            }
            else {
                this.usersArray = [];
                this.activityLoader = false;
            }
        }, (error: any) => {
            this.activityLoader = false;
        })
    }

    //CLOSE POPUP MODEL
    handleCancel() {
        this.isVisible2 = false;
        this.isVisible = false;
        this.createUserForm?.reset();
    }

    //copy clipboard
    disableTooltip() {
        this.copied = '';
        this.copied = 'Copied';
    }

    //CREATE FORM OPEN
    showModel() {
        this.isVisible = true
    }

    //EDIT FORM OPEN AND DATA SET
    editUserInfo: any
    showModal2(data: any) {
        this.editUserInfo = data;
        this.isVisible2 = true
        this.editUserForm = this.fb.group({
            name: new FormControl(data?.name, [Validators.required]),
            age: new FormControl(data?.age, [Validators.required]),
            email: new FormControl(data?.email, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            password: new FormControl(data?.password, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[-$#@$_!+=)%~`*?(&^])[A-Za-z\d$@#)$=!+~_`%(*?&^].{7,}')]),
            confirmPassword: new FormControl('', [Validators.required])
        }, {
            validator: MustMatch('password', 'confirmPassword')
        })
    }

    //CREATE USER SUBMIT BUTTON0
    createUserBtn() {
        this.createCondition = true
        let val : RequestModel = {
            name: this.createUserForm.value.name,
            email: this.createUserForm.value.email,
            age: this.createUserForm.value.age,
            password: this.createUserForm.value.password,
            createdAt: new Date().toISOString()
        }
        this.userService.createUser(val).subscribe((res) => {
            if (res) {
                this.message.success('User Created Successfully')
                this.getAllUsersList()
                this.isVisible = false
                this.createCondition = false
                this.createUserForm.reset()
            }
            else {
                this.message.error('Create User Failed')
                this.createCondition = false
            }
        }, error => {
            this.message.error('Create User Failed')
            this.createCondition = false
        })
    }

    //USER EDIT SUBMIT BUTTON API CALL
    userEditBtn() {
        this.editCondition = true
        let val = {
            name: this.editUserForm.value.name,
            email: this.editUserForm.value.email,
            age: this.editUserForm.value.age,
            password: this.editUserForm.value.password,
            createdAt: this.editUserInfo?.createdAt ? this.editUserInfo?.createdAt : new Date().toISOString()
        }
        this.userService.updateUser(this.editUserInfo?.id, val).subscribe((res) => {
            this.message.success('User Updated Successfully')
            this.editCondition = false
            this.getAllUsersList()
            this.isVisible2 = false
        }, error => {
            this.message.error('Failed To Update User')
            this.editCondition = false
        })

    }

    //DELETE USER
    deleteUserBtn(id: any) {
        this.userService.deleteUser(id).subscribe((res) => {
            this.message.success('Successfully Deleted User')
            this.getAllUsersList()
        }, error => {
            this.message.error('Failed To Delete User')
        })

    }

    //VALIDATE PHONE NUMBER
    validateNumber(e: any) {
        let input = String.fromCharCode(e.charCode);
        const reg = /^\d*(?:[.,]\d{1,2})?$/;
        if (!reg.test(input)) {
            e.preventDefault();
        }
    }

    // Get Number Only Input
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

}
