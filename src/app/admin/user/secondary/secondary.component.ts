import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {error} from "util";

@Component({
    selector: 'app-secondary',
    templateUrl: './secondary.component.html',
    styleUrls: ['./secondary.component.scss']
})
export class SecondaryComponent implements OnInit {

    public show: boolean;
    public formMobel: FormGroup
    oldPass: any;
    newPass: any;
    confirmPass: any;

    constructor(
        public fb: FormBuilder,
        public http: HttpClient
    ) {
        this.formMobel = fb.group({
            oldPass: ['', [Validators.required,Validators.maxLength(6)]],
            newPass: ['', [Validators.required,Validators.maxLength(6),Validators.pattern('^\\d{6}$')]],
            confirmPass: ['', Validators.required]
        })
    }

    ngOnInit() {
    }

    Savemodify(){
        this.show = true;
        let UID = localStorage.uid;
        this.http.put(sessionStorage['http'] + '/action/Users/EditSecond?uid=' + UID,{pass:this.formMobel.get('newPass').value}).subscribe( response => {
            if (response == true){
                alert('修改成功')
            }
        },error => {
            this.show = false;
        } )
    }

}
