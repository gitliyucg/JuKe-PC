import { Component, OnInit,Output } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';
import { HttpClient} from '@angular/common/http';
import {Pagination} from "../../../widgets/pagination/pageconfig";
import { Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-rechargebal',
  templateUrl: './rechargebal.component.html',
  styleUrls: ['./rechargebal.component.scss']
})
export class RechargebalComponent implements OnInit {
  fileurl = sessionStorage['http'] + '/action/Recharges/UpFiles';
  uploader: FileUploader = new FileUploader({url: this.fileurl});
  model;
  formModel: FormGroup;
  Pic: string = '';
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;

  constructor(public http: HttpClient, router: Router, public fb: FormBuilder) {
    if(sessionStorage['pass2'] == null || sessionStorage['pass2'] == undefined || sessionStorage['pass2'] == '')
    {
      router.navigate(['/admin/login2']);
    }
    this.formModel = fb.group({
      TID: [0],
      UID: [localStorage['uid']],
      Money: ['', [Validators.required, Validators.min(1)]],
      Message: [''],
      Times: [new Date()],
      States: [0],
      Pic: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.pagination.currentPage = 1;
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }

  private initList(): void {
    let page = this.pagination.currentPage;
    let url = sessionStorage['http'] + '/action/Recharges/GetPCList?uid='+localStorage['uid']+'&num=' + page;

    this.http.get(url)
      .subscribe(v => {
        this.model = JSON.parse(v['data']);
        this.pagination.totalItems = v['total'];
      });
  }

  onSubmit(e) {
    if(parseInt(this.formModel.get('Money').value) > 0) {

    }else {
      alert('充值金额错误');
      return false;
    }
    e.target.disabled = true;
    const that = this;
    if (this.uploader.queue.length > 0) {
      // 上传
      this.uploader.queue[this.uploader.queue.length - 1].onSuccess = function (response, status, headers) {
        // 上传文件成功
        if (response !== null) {
          that.formModel.get('Pic').setValue(JSON.parse(response));
          that.create(JSON.parse(response));
        } else {
          alert('上传错误，请稍后再试');
          e.target.disabled = false;
        }
        this.uploader.clearQueue(); // 清除队列，如果不清除的话，还会继续上传第一个队列的图片
      };
      this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    }else {
      alert('请上传充值凭证');
      e.target.disabled = false;
    }
  }

  create(images) {
    this.http.post(sessionStorage['http'] + '/action/Recharges/PostRecharge', this.formModel.value).subscribe(data => {
      location.href = location.href;
    });
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0];
      }
    } catch (e) {
      return time;
    }
  }

  GetTimes2(time) {
    try {
      if (time != null) {
        return time.split('T')[0];
      }
    } catch (e) {
      return time;
    }
  }

  GetState(s) {
    let str = '正在处理中'
    switch (s) {
      case '0':
        str = '正在处理中';
        break;
      case '1':
        str = '已拒绝';
        break;
      case '2':
        str = '充值成功';
        break;
      case '3':
        str = '已取消';
        break;
    }
    return str;
  }

  file(e) {
    let extStart = e.target.value.lastIndexOf('.');
    let ext = e.target.value.substring(extStart,e.target.value.length).toUpperCase();
    if(ext!='.BMP'&&ext!='.PNG'&&ext!='.GIF'&&ext!='.JPG'&&ext!='.JPEG'){
      this.formModel.get('Pic').setValue('');
      alert('图片限于png,gif,jpeg,jpg格式');
    }else {
      this.formModel.get('Pic').setValue('0');
    }
  }
}
