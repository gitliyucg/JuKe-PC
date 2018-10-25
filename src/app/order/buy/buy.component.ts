import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {WidgetsModule} from "../../widgets/widgets.module";
import {Md5} from "ts-md5/dist/md5";
declare var $: any;
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  id: number = 0;
  addrModel: Array<any> = [];
  model: Array<any> = [];
  createOn: boolean = false;
  zongjia: number = 0;
  menuArr: Array<any> = [];
  wallet: Array<any> = [];
  formModel: FormGroup;

  // 联动
  proviceData = [];
  cityData = [];
  areasData = [];
  City;
  Areas;
  proID;// 用于联动
  province;

  editOn: boolean = false;//修改地址按钮开关
  message = '';//留言内容

  CarIDS: Array<any> = [];//购物明细

  tmoney: number = 0;//天天奖励支付数额
  dmoney: number = 0;//动态奖励支付数额
  num;
  kucun;

  constructor(
    public http: HttpClient,
    public router: Router,
    public fb: FormBuilder,
    public share: WidgetsModule,
    public routerinfo: ActivatedRoute) {
    this.id = routerinfo.snapshot.params['id'];
    this.num = routerinfo.snapshot.params['size'];
    let md5 = routerinfo.snapshot.params['token'];
    if(md5 != Md5.hashStr(this.id+'|'+this.num+'|'+'menglong0526@jukePC'))
    {
      this.router.navigate(['/index']);
      return;
    }

    //获取收货地址
    this.http.get(sessionStorage['http']+'/action/Addresses/GetList?uid='+localStorage['uid'],{responseType:'text'}).subscribe(data => {
      this.addrModel = JSON.parse(data);
    });

    this.http.get(sessionStorage['http']+'/action/ProductParams/GetBuyList/'+this.id).subscribe(data => {
      this.model = JSON.parse(data['s']);
      this.zongjia = this.model['Price'] * this.num;
      this.kucun = this.model['Num'];
      this.CarIDS.push({
        CarID: 0,
        PID: this.model['PID'],
        Title: this.model['Title'],
        Images: this.model['Images'],
        ParamID: this.id,
        Params: this.model['ParamName'],
        Price: this.model['Price'],
        Num: this.num,
      })
    });

    // 获取钱包状态
    http.get(sessionStorage['http']+'/action/Users/GetYue?uid='+localStorage['un'], {responseType:'text'}).subscribe(data => {
      this.wallet = JSON.parse(data);
    });

    this.formModel = fb.group({
      Province: ['', Validators.required],
      City: ['', Validators.required],
      Areas: ['', Validators.required],
      Address1: ['', Validators.required],
      Name: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern("^1[0-9]{10}$")]],
      State: [false],
      UID: [localStorage['uid']],
      ID: [''],
      row: [0]
    });
    this.Sheng();
  }

  ngOnInit() {
    $('#Address').on('click','li:not(".add")',function () {
      $('#Address li').removeClass('active');
      $(this).attr('class','active');
    })
    $('#Message').focus(function () {
      $(this).css('height','60px');
    })
    $('#Message').blur(function () {
      $(this).css('height','35px');
    });
    $('.passmain .ul').click(function () {
      $('.passmain input').each(function (i) {
        if($('.passmain input:eq('+ i +')').val() == '' || $('.passmain input:eq('+ i +')').val() == null)
        {
          $('.passmain input:eq('+ i +')').focus();
        }else {
          if(i<5)
          {
            $('.passmain input:eq('+i+')').attr('disabled','disabled');
            $('.passmain input:eq('+(i+1)+')').removeAttr('disabled');
            $('.passmain input:eq('+ (i+1) +')').focus();
          }

        }
      })
    });

    //抓取Input退格键
    $('.passmain input').keydown(function (e) {
      if(e.keyCode == 8) {

        let i = $('.passmain input').index($(this));
        if(i > 0) {
          $('.passmain input:eq('+i+')').val('');
          $('.passmain input:eq('+i+')').attr('disabled','disabled');
          $('.passmain input:eq('+(i-1)+')').removeAttr('disabled');
          $('.passmain input:eq('+(i-1)+')').focus();
        }
      }
    })
  }

  AddressList() {
    this.http.get(sessionStorage['http']+'/action/Addresses/GetList?uid='+localStorage['uid'],{responseType:'text'}).subscribe(data => {
      this.addrModel = JSON.parse(data);
    });
  }

  lookall() {
    $('#Address ul li').show();
    $('.lookall button:first').hide();
    this.createOn = true;
  }

  checlick(e) {
    if (e.target.checked) {
      this.menuArr.push(e.target.value);
    } else {
      // 移除
      this.menuArr.splice(this.menuArr.indexOf(e.target.value), 1);
    }
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

  //关闭遮罩层
  close() {
    $('.zhao').hide();
    this.formModel.reset();
  }

  //显示遮罩层
  show() {
    this.editOn = false;
    $('.zhao').show();
  }

  //创建地址
  onSubmit(e) {
    e.target.disabled = true;
    this.formModel.value.UID = localStorage['uid'];
    this.formModel.value.Province = this.formModel.get('Province').value.split('|')[1];
    this.formModel.value.City = this.formModel.get('City').value.split('|')[1];
    this.formModel.value.Areas = this.formModel.get('Areas').value.split('|')[1];
    this.formModel.value.State = this.formModel.get('State').value == true? 1:0;
    this.http.post(sessionStorage['http']+'/action/Addresses/PostAddress',this.formModel.value).subscribe(data => {
      this.addrModel.unshift(this.formModel.value);
      this.close();
      setTimeout(function () {
        $('#Address li').removeClass('active');
        $('#Address ul li:first').attr('class','active');
      },100);
    });
  }

  edit(id,i) {
    this.show();
    this.editOn = true;
    this.formModel.get('Address1').setValue(this.addrModel[i].Address1);
    this.formModel.get('Name').setValue(this.addrModel[i].Name);
    this.formModel.get('Phone').setValue(this.addrModel[i].Phone);
    this.formModel.get('State').setValue(this.addrModel[i].State == 0? false:true);
    this.formModel.get('ID').setValue(this.addrModel[i].ID);
    this.formModel.get('UID').setValue(this.addrModel[i].UID);
    this.formModel.get('row').setValue(i);
    let idsheng = 0;

    for (var j=0;j<this.proviceData.length;j++)
    {
      if(this.proviceData[j].name == this.addrModel[i].Province)
      {
        this.province = this.proviceData[j].id+'|'+this.proviceData[j].name;
        this.formModel.get('Province').setValue(this.province);
        idsheng = this.proviceData[j].id;
        this.Shi(idsheng);
        break;
      }
    }

    for (var j=0;j<this.cityData.length;j++)
    {
      if(this.cityData[j].name == this.addrModel[i].City)
      {
        this.City = this.cityData[j].id+'|'+this.cityData[j].name;
        this.formModel.get('City').setValue(this.City);
        this.Qu(idsheng, this.cityData[j].id)
        break;
      }
    }

    for (var j=0;j<this.areasData.length;j++)
    {
      if(this.areasData[j].name == this.addrModel[i].Areas)
      {
        this.Areas = this.areasData[j].id+'|'+this.areasData[j].name;
        this.formModel.get('Areas').setValue(this.Areas);
        break;
      }
    }
  }

  onEdit(e) {
    e.target.disabled = true;
    this.formModel.value.UID = localStorage['uid'];
    this.formModel.get('Province').setValue(this.formModel.get('Province').value.split('|')[1]);
    this.formModel.get('City').setValue(this.formModel.get('City').value.split('|')[1]);
    this.formModel.get('Areas').setValue(this.formModel.get('Areas').value.split('|')[1]);
    this.formModel.get('State').setValue(this.formModel.value.State == true? 1:0);
    this.http.put(sessionStorage['http']+'/action/Addresses/PutAddress/'+this.formModel.value.ID,this.formModel.value).subscribe(data => {
      let i = this.formModel.value.row;
      this.addrModel[i].Province = this.formModel.value.Province;
      this.addrModel[i].City = this.formModel.value.City;
      this.addrModel[i].Areas = this.formModel.value.Areas;
      this.addrModel[i].Address1 = this.formModel.value.Address1;
      this.addrModel[i].Name = this.formModel.value.Name;
      this.addrModel[i].Phone = this.formModel.value.Phone;
      this.addrModel[i].State = this.formModel.value.State;

      //如果修改项被设为默认，去掉旧默认信息的默认状态
      if(this.addrModel[i].State == 1)
      {
        for(var item in this.addrModel)
        {
          if(item != i && this.addrModel[item].State == 1)
          {
            this.addrModel[item].State = 0;
            break;
          }
        }
      }

      this.close();
    });
  }

  GetAddress(areas,info) {
    let leng1 = areas.length;
    let leng2 = info.length;
    if(leng1+leng2 > 31)
    {
      return areas + ' ' +info.substring(0,31-leng1) + '...';
    }else
    {
      return areas + ' ' + info;
    }
  }

  buy() {
    if(this.menuArr.length == 0) {
      alert('请选择支付方式');
      return false;
    }
    if(this.getAddInfo() == '')
    {
      alert('请选择收货地址');
      return false;
    }

    for(var x in this.menuArr)
    {
      if(this.menuArr[x].split(',')[0] == '1')
      {
        this.tmoney = parseFloat(this.menuArr[x].split(',')[1]);
      }else if(this.menuArr[x].split(',')[0] == '2')
      {
        this.dmoney = parseFloat(this.menuArr[x].split(',')[1]);
      }
    }

    if(this.tmoney + this.dmoney > this.zongjia)
    {
      this.passShow();
    }else {
      if(this.menuArr.length == 1) {
        alert('积分余额不足,建议搭配其余积分抵扣购买');
      }else {
        alert('积分余额不足,请充值后再继续购买');
      }
    }
  }

  getAddInfo() {
    let i = $('#Address li.active').attr('data-index');
    if(i == undefined) {
      return '';
    }
    let info1 = this.addrModel[i].Name + ',' + this.addrModel[i].Phone;
    let info =  this.addrModel[i].Province + ',' + this.addrModel[i].City + ',' + this.addrModel[i].Areas + ',' + this.addrModel[i].Address1;

    return info1 + ',' + info;
  }

  // 密码输入
  set(pass,i) {
    if(parseInt(pass) >= 0) {
      if(i < 5)
      {
        $('.passmain input:eq('+i+')').attr('disabled','disabled');
      }
      $('.passmain input:eq('+(i+1)+')').removeAttr('disabled');
      $('.passmain input:eq('+(i+1)+')').focus();
    }else {
      $('.passmain input:eq('+i+')').val('');
    }
  }

  //二级密码确认
  validPass(e) {
    let password =$('.passmain input:eq(0)').val()+$('.passmain input:eq(1)').val()+$('.passmain input:eq(2)').val()+$('.passmain input:eq(3)').val()+$('.passmain input:eq(4)').val()+$('.passmain input:eq(5)').val();
    if(password.length != 6) {
      alert('请输入全部密码');
      return false;
    }
    e.target.disabled = true;
    this.http.get(sessionStorage['http']+'/action/Users/VerifyPass?un='+localStorage['un']+'&pass='+password).subscribe(data => {
      if(data) {
        //---------------------------------
        let tbonus = 0;
        let tdongtai = 0;
        if(this.dmoney >= this.zongjia)
        {
          tdongtai = this.zongjia;
        }else {
          tdongtai = this.dmoney;
          tbonus = this.zongjia - this.dmoney;
        }
        //购买
        let params = {
          Codes: 0,
          UID: localStorage['uid'],
          TotalMoney: 0,
          TotalBonus: tbonus,
          TotalDongTai: tdongtai,
          Total: this.zongjia,
          TotalNum: this.CarIDS.length,
          Address: this.getAddInfo(),
          Marks: this.message,
          CarIDS: this.CarIDS
        }
        this.http.post(sessionStorage['http']+ '/action/Orders/Pay',params).subscribe(data => {
          let md5 = Md5.hashStr(data+'menglong0526@jukePC');
          this.router.navigate(['/order/payok/'+data+'/'+md5]);
        },error => {
          e.target.disabled = false;
        });
      }else {
        alert('二级密码错误');
        e.target.disabled = false;
      }
    });
  }

  //弹出二级密码输入层
  passShow() {
    $('.pass').show();
    $('.pass input:first').focus();
  }
  //关闭二级密码层
  passClose() {
    $('.pass').hide();
  }

  // 减号
  jian() {
    this.num--;
    this.onsize(this.num);
  }

  // 加号
  jia() {
    if(this.num < this.kucun)
    {
      this.num++;
    }else {

    }
    this.onsize(this.num);
  }

  onsize(e) {
    if(isNaN(e))
    {
      this.num = 1;
    }else if(this.num < 1)
    {
      this.num = 1;
    }else if(parseInt(this.num.toString()) >= parseInt(this.kucun.toString()))
    {
      this.num = this.kucun;
    }
    $('.num').val(this.num);
    this.zongjia = this.model['Price'] * this.num;
  }
}
