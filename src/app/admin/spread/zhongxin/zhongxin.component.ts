import { Component, OnInit } from '@angular/core';
import {WidgetsModule} from "../../../widgets/widgets.module";
import { HttpClient} from '@angular/common/http';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import {FileUploader} from "ng2-file-upload";
import { Router} from '@angular/router';

@Component({
  selector: 'app-zhongxin',
  templateUrl: './zhongxin.component.html',
  styleUrls: ['./zhongxin.component.scss']
})
export class ZhongxinComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: sessionStorage['http'] + '/action/ccms/UpFiles'});
  formModel: FormGroup;
  proviceData = [];
  cityData = [];
  areasData = [];
  City;
  Areas;
  proID;// 用于联动
  binPro;
  binCity;
  binAreas;
  constructor(
    public share: WidgetsModule,
    private formBuilder:FormBuilder,
    public http: HttpClient,
    public router: Router
    ) {
    if(sessionStorage['pass2'] == null || sessionStorage['pass2'] == undefined || sessionStorage['pass2'] == '')
    {
      router.navigate(['/admin/login2']);
    }
    this.formModel=formBuilder.group({
      ID:[0],
      UID:[localStorage['uid']],
      UserName:[localStorage['un']],
      Name:['',Validators.required],
      Phone:['', [Validators.required, Validators.pattern("^1[0-9]{10}$")]],
      IDNumber: ['', [Validators.required, Validators.pattern("(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}[0-9Xx]$)")]],
      Province:['',Validators.required],
      City:['',Validators.required],
      Areas:['',Validators.required],
      Address:['',Validators.required],
      Images1:['', Validators.required],
      Images2:['', Validators.required],
      Times:[new Date()],
      States:['']
    });
    this.Sheng();
    http.get(sessionStorage['http']+'/action/ccms/GetView/'+localStorage['uid']).subscribe(data => {
      if(data != null) {
        this.formModel.get('ID').setValue(data['ID']);
        this.formModel.get('UID').setValue(data['UID']);
        this.formModel.get('UserName').setValue(data['UserName']);
        this.formModel.get('Name').setValue(data['Name']);
        this.formModel.get('Phone').setValue(data['Phone']);
        this.formModel.get('IDNumber').setValue(data['IDNumber']);
        this.binPro = data['Province'];
        this.binCity = data['City'];
        this.binAreas = data['Areas'];
        this.formModel.get('Address').setValue(data['Address']);
        this.formModel.get('Images1').setValue(data['Images1']);
        this.formModel.get('Images2').setValue(data['Images2']);
        this.formModel.get('Times').setValue(data['Times']);
        this.formModel.get('States').setValue(data['States']);
      }
    });


  }

  ngOnInit() {
  }

  Sheng() {
    for (let i in this.share.diqu['0']) {
      var obj = { name: '', id: '' }
      obj.name = this.share.diqu['0'][i];
      obj.id = i;
      this.proviceData.push(obj)
    };
  }

  selpro() {
    this.City = '';
    this.Areas='';
    this.proID = this.formModel.get('Province').value.split('|')[0];
    this.Shi(this.formModel.get('Province').value.split('|')[0])
  }

  // 选择城市
  Shi(idsheng) {
    let cityA = [];
    for (let j in this.share.diqu['0,' + idsheng]) {
      var obj = { name: '', id: '' }
      obj.name = this.share.diqu['0,' + idsheng][j];
      obj.id = j;
      cityA.push(obj)
    };
    this.cityData = cityA;
  }

  selcity() {
    this.Qu(this.proID, this.formModel.get('City').value.split('|')[0])
  }

  //选择地区
  Qu(idsheng, idshi) {
    let quA = [];
    for (let k in this.share.diqu['0,' + idsheng + ',' + idshi]) {
      var obj = { name: '', id: '' }
      obj.name = this.share.diqu['0,' + idsheng + ',' + idshi][k];
      obj.id = k;
      quA.push(obj);
    };
    this.areasData = quA;
  }

  file() {
    let img1 = '';
    let that = this;
    if (this.uploader.queue.length > 0) {
      // 上传
      this.uploader.queue[this.uploader.queue.length - 1].onSuccess = function (response, status, headers) {
        img1 = response;
        that.formModel.get('Images1').setValue(img1.replace(/\"/g, ''));
        this.uploader.clearQueue(); // 清除队列，如果不清除的话，还会继续上传第一个队列的图片
      };
      this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    }
  }

  file2() {
    let img1 = '';
    let that = this;
    if (this.uploader.queue.length > 0) {
      // 上传
      this.uploader.queue[this.uploader.queue.length - 1].onSuccess = function (response, status, headers) {
        img1 = response;
        that.formModel.get('Images2').setValue(img1.replace(/\"/g, ''));
        this.uploader.clearQueue(); // 清除队列，如果不清除的话，还会继续上传第一个队列的图片
      };
      this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    }
  }

  onSubmit() {
    this.formModel.value.Province = this.formModel.get('Province').value.split('|')[1];
    this.formModel.value.City = this.formModel.get('City').value.split('|')[1];
    this.formModel.value.Areas = this.formModel.get('Areas').value.split('|')[1];
    this.formModel.value.States = 0;
    if(this.formModel.value.ID == 0) {
      this.http.post(sessionStorage['http']+'/action/CCMs/Applied',this.formModel.value).subscribe(data => {
        location.href = location.href;
      });
    }else {
      this.http.put(sessionStorage['http']+'/action/CCMs/Edit/'+this.formModel.value.ID,this.formModel.value).subscribe(data => {
        location.href = location.href;
      });
    }
  }

}
