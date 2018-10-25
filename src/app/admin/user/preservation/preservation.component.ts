import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-preservation',
    templateUrl: './preservation.component.html',
    styleUrls: ['./preservation.component.scss']
})
export class PreservationComponent implements OnInit {

    public formMobel: FormGroup;
    newPass: any;
    passOK: any;

    public show: boolean;

    constructor(
        public http: HttpClient,
        public fb: FormBuilder
    ) {
        this.formMobel = fb.group({
            newPass: ['', [Validators.required,Validators.maxLength(6),Validators.pattern('^\\d{6}$')]],
            passOK: ['', [Validators.required,Validators.maxLength(6)]]
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
