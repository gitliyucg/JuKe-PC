import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
    public formMobel: FormGroup;
    oldPass: any;
    newPass: any;
    confirmPass: any;
    show: boolean;

    public UID: number;

    oldPassword: any;
    newPassword: any;
    confirmPassword: any;

    constructor(
        public http: HttpClient,
        public fb: FormBuilder
    ) {
        this.formMobel = fb.group({
            oldPass: ['', Validators.required],
            newPass: ['', [Validators.required,Validators.maxLength(16) , Validators.pattern("^(?=.{6,16})(?=.*[a-z])(?=.*[0-9])[0-9a-z]*$")]],
            confirmPass: ['', [Validators.required, Validators.maxLength(16)]]
        })
    }

    ngOnInit() {
        this.UID = localStorage.uid;
    }

    Savemodify(){
        this.show = true;
        this.oldPassword = this.formMobel.get('oldPass').value;
        this.newPassword = this.formMobel.get('newPass').value;
        this.confirmPassword = this.formMobel.get('confirmPass').value;
        if (this.newPassword != this.confirmPassword){
            alert('两次密码不一致请重新输入')
        }else {
            this.http.put(sessionStorage['http'] + '/action/Users/EditPCPass?uid=' + this.UID,{old: this.oldPassword, newpass: this.newPassword}).subscribe(response => {
                if (response == true){
                    alert('修改成功');
                }
            },error =>{
                alert('修改失败，请稍后重试')
                this.show = false;
            } )
        }
    }
}

// export function passValidator(controlGroup: FormGroup): any {
//     // 获取密码输入框的值
//     const pass1 = controlGroup.get('newPass').value;
//     const pass2 = controlGroup.get('confirmPass').value;
//     if(pass1 != '' && pass2 != '')
//     {
//       const isEqule: boolean = (pass1 === pass2);
//       return isEqule ? null : { passValidator: { info: '两次密码不一致' } };
//     }
//
// }
