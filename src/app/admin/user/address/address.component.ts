import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppModule } from "../../../app.module"
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms"
import { Router } from "@angular/router";

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

    public formModel: FormGroup
    UID: number;
    Province: string;//选择省份
    City: string;//选择城市
    Areas: string;//选择区域
    Address1: string;//详细地址
    Name: string;//收货人
    Phone: string;//联系电话
    State: number;//默认地址状态


    ProvincesID: number;//省份ID
    ProvincdeName: string;//省份名字
    CityID: number;
    CityName: string;
    RegionsID: number;
    RehionsName: string;

    public Address;
    public AID: number;
    public ID: number;
    public uid: number;
    public show: boolean = false;
    public btnDisable: boolean;
    public AddressInformation;
    public titleInformation: string = '添加收货地址';

    public provinceData = [];//省份数据
    public cityData = [];//城市数据
    public regionsData = [];//区域数据
    public checkeds: boolean = false;

    constructor(
        public http: HttpClient,
        public addressData: AppModule,
        public fb: FormBuilder,
        public router: Router
    ) {
        this.formModel = fb.group({
            Province: ['', Validators.required],
            City: ['', Validators.required],
            Areas: ['', Validators.required],
            Address1: ['', Validators.required],
            Name: ['', Validators.required],
            Phone: ['', [Validators.required, Validators.pattern('^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$')]],
            State: ['', Validators.required],
            UID: ['', Validators.required],
            ID: ['', Validators.required]
        })
    }
    ngOnInit() {
        this.Provinces()
        this.uid = localStorage.uid
        this.http.get(sessionStorage['http'] + '/action/Addresses/GetList?uid=' + this.uid).subscribe(response => {
            this.AddressInformation = response
        })
    }

  //选择省份
    Provinces(){
        for (let item in this.addressData.addressInformation['0']){
            var obj = {name: '', id: ''};
            obj.name = this.addressData.addressInformation[0][item];
            obj.id = item;
            this.provinceData.push(obj)
        }
    }
    changeProvince(){
        this.City = '';
        this.Areas = '';
        this.ProvincesID = this.formModel.get("Province").value.split('|')[0];
        this.ProvincdeName = this.formModel.get('Province').value.split('|')[1];
        this.Citys()
    }
    //选择城市
    Citys(){
        let citys = []
        for(let item in this.addressData.addressInformation['0,' + this.ProvincesID]){
            var obj = {name: '', id: ''};
            obj.name = this.addressData.addressInformation['0,' + this.ProvincesID][item];
            obj.id = item;
            citys.push(obj)
        }
        this.cityData = citys
    }
    changeCity(){
        this.Areas = '';
        this.CityID = this.formModel.get('City').value.split('|')[0];
        this.CityName = this.formModel.get('City').value.split('|')[1];
        this.Region();
    }
    //选择地区
    Region(){
        let refions = []
        for (let item in this.addressData.addressInformation['0,' + this.ProvincesID + ',' + this.CityID]){
            var obj = {name: '', id: ''};
            obj.name = this.addressData.addressInformation['0,' + this.ProvincesID + ',' + this.CityID][item];
            obj.id = item;
            refions.push(obj);
        }
        this.regionsData = refions
    }
    changeRegion(){
        this.RehionsName = this.formModel.get('Areas').value.split('|')[1];
        this.RegionsID = this.formModel.get('Areas').value.split('|')[0];
    }

    //设置为默认地址
    postAddress(ID, i) {
        this.http.put(sessionStorage['http'] + '/action/Addresses/SetDefault/' + ID,{uid: this.uid}).subscribe(response => {
            alert('修改成功');
            this.UID = localStorage.uid;
            for(var j=0;j<this.AddressInformation.length;j++) {
                if(this.AddressInformation[i].ID != this.AddressInformation[j].ID) {
                    this.AddressInformation[j].State = 0;
                }else {
                    this.AddressInformation[i].State = 1;
                }
            }
        }, error => {
            alert('修改失败，请刷新后重试')
        })

    }

    Add(){
        this.show = true;
        this.titleInformation = '添加收货地址';
        this.formModel.get('Address1').setValue('');
        this.formModel.get('Name').setValue('');
        this.formModel.get('Phone').setValue('');
    }

    //编辑地址
    EditInformation(params){
        this.show = true;
        this.titleInformation = '修改地址信息';
        //传过来的数据
        if (this.titleInformation == '修改地址信息'){
            this.AID = parseInt(params.ID)
            this.UID = parseInt(params.UID);
            this.Province = params.Province;
            this.City = params.City;
            this.Areas = params.Areas;
            this.Address1 = params.Address1;
            this.Name = params.Name;
            this.Phone = params.Phone;
            this.State = params.State;

            //将传过来的数据赋值给表单
            this.formModel.get('Province').setValue(this.Province);
            this.formModel.get('ID').setValue(this.AID)
            this.formModel.get('UID').setValue(this.UID);
            this.formModel.get('City').setValue(this.City);
            this.formModel.get('Areas').setValue(this.Areas);
            this.formModel.get('Address1').setValue(this.Address1);
            this.formModel.get('Name').setValue(this.Name);
            this.formModel.get('Phone').setValue(this.Phone);
            this.formModel.get('State').setValue(this.State);
        }
    }

    UploadAddress(){
        this.btnDisable = true
        if(this.titleInformation == '添加收货地址'){
            //确认添加收货地址
            this.formModel.value.UID = parseInt(localStorage.uid);
            this.formModel.value.Province = this.formModel.value.Province.split('|')[1];
            this.formModel.value.City = this.formModel.value.City.split('|')[1];
            this.formModel.value.Areas = this.formModel.value.Areas.split('|')[1];
            if (this.checkeds == false){
                this.formModel.value.State = 0;
            }else {
                this.formModel.value.State = 1;
            }
            let params = this.formModel.value
            this.http.post(sessionStorage['http'] + '/action/Addresses/PostAddress',params).subscribe( response => {
                if (response == true){
                    this.show = false;
                    alert('添加地址成功');
                    this.AddressInformation.push(this.formModel.value)
                    this.btnDisable = false;
                }
            }, error => {
                this.show = true;
                alert('添加地址失败,请刷新后重试');
                this.btnDisable = false;
            })
        }else {
            if (this.titleInformation == '修改地址信息'){
                this.show = true;

                this.AID = this.formModel.value.ID;
                this.State = this.formModel.value.State;
                // this.formModel.value.Province = this.ProvincdeName;
                // this.formModel.value.City = this.CityName;
                // this.formModel.value.Areas = this.RehionsName;
                // if (!this.State){
                //     this.checkeds = false
                // }else {
                //     this.checkeds = true;
                // }
                if (this.checkeds == false){
                    this.formModel.value.State = 0;
                }else {
                    this.formModel.value.State = 1;
                }
                let params = this.formModel.value;
                this.http.put(sessionStorage['http'] + '/action/Addresses/PutAddress/' + this.AID,params).subscribe( response => {
                    if (response == true){
                        this.show = false;
                        alert('编辑完成');
                        this.router.navigate(['/admin/user/address'])
                    }
                }, error => {
                    alert('编辑失败，请刷新后重试');
                    this.btnDisable = false;
                })
            }
        }
    }

    //删除地址
    DeleteAddress(ID,i){
        if(confirm('确认删除吗？')) {
            this.http.delete(sessionStorage['http'] + '/action/Addresses/Delete/' + ID).subscribe( response => {
                alert('删除成功');
                this.AddressInformation.splice(i, 1);
            }, error => {
                alert('删除失败，请刷新后重试')
            })
        }
    }
    //关闭弹窗
    Cancel(){
        this.show = false;
        this.formModel.get('Province').setValue('');
        this.formModel.get('City').setValue('');
        this.formModel.get('Areas').setValue('');
        this.formModel.value.Address1 = '';
        this.formModel.value.Name = '';
        this.formModel.value.Phone = '';
    }
}
