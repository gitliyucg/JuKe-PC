import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router} from '@angular/router'

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {
  duanxin;
  formModel: FormGroup;
  formModel2: FormGroup;
  yzmOn: boolean = false;
  uid;
  step2: boolean = false;
  step3: boolean = false;
  tiao: number = 3;
  stop1;
  constructor(public http: HttpClient,private fb: FormBuilder, public router: Router) {
    this.formModel = fb.group({
      UserID: ['', [Validators.required, Validators.pattern("^[A-z][0-9A-z]{3,9}$")]],
      phone: ['', [Validators.required, Validators.pattern("^1[0-9]{10}$")]],
      yzm: ['', Validators.required],
    });
    this.formModel2 = fb.group({
      password: fb.group({
        pass: ['', [Validators.required, Validators.pattern("^[0-9A-z]{6,16}$")]],
        pass2: ['', [Validators.required, Validators.pattern("^[0-9A-z]{6,16}$")]],
      }, { validator: passValidator})
    });
  }

  ngOnInit() {

  }

  getyzm() {
    if(this.formModel.get('UserID').invalid)
    {
      document.getElementById('UserID').focus();
      alert('账户名错误');
      return false;
    }

    if(this.formModel.get('phone').invalid)
    {
      document.getElementById('phone').focus();
      alert('手机号码错误');
      return false;
    }
    this.yzmOn = true;
    this.http.get(sessionStorage['http'] + '/action/Login/PCValidPhone?un='+this.formModel.value.UserID+'&tel='+this.formModel.value.phone).subscribe(data => {
      if(data['error'] == undefined)
      {
        this.duanxin = data['yzm'];
        this.uid = data['uid'];
        let SS: number = 60;
        const that = this;
        this.stop1 = setInterval(function () {
          if(SS == 0) {
            clearInterval(this.stop1);
            that.yzmOn = false;
            document.getElementById('getyzm').innerText = "获取验证码";
          }else {
            if(document.getElementById('getyzm') != null)
            {
              document.getElementById('getyzm').innerText = (SS--).toString() + 'S';
            }
          }
        },1000)
      }else {
        alert(data['error']);
        this.yzmOn = false;
      }

    });
  }

  onSubmit() {
    if(this.duanxin != this.formModel.get('yzm').value)
    {
      alert('验证码错误，请检查后重新输入');
      return false;
    }
    this.step2 = true;
    clearInterval(this.stop1);
  }

  // 修改密码
  Edit() {
    clearInterval(this.stop1);
    let params = {
      pass: this.formModel2.get(['password','pass']).value
    }
    this.http.post(sessionStorage['http']+'/action/Login/EditPass/'+this.uid, params).subscribe(data => {
      this.step2 = true;
      this.step3 = true;
      const that = this;
      let stop = setInterval(function () {
        if(that.tiao == 0)
        {
          clearInterval(stop);
          that.router.navigate(['/login']);
        }else {
          that.tiao--;
        }
      },1000);
    });
  }
}

export function passValidator(controlGroup: FormGroup): any {
  // 获取密码输入框的值
  const pass1 = controlGroup.get('pass').value;
  const pass2 = controlGroup.get('pass2').value;
  if(pass1 != '' && pass2 != '')
  {
    const isEqule: boolean = (pass1 === pass2);
    return isEqule ? null : { passValidator: { info: '两次密码不一致' } };
  }

}

