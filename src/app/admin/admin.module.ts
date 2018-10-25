import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { IndexComponents } from './indexs/indexs.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';
import { DetailsComponent } from './finance/details/details.component';
import { ContinualComponent } from './finance/continual/continual.component';
import { TransComponent } from './finance/trans/trans.component';
import { RechargeComponent } from './finance/recharge/recharge.component';
import { ExtractComponent } from './finance/extract/extract.component';
import { GiveComponent } from './finance/give/give.component';
import { RegisterComponent } from './spread/register/register.component';
import { FutouComponent } from './spread/futou/futou.component';
import { ListComponent } from './spread/list/list.component';
import { MemberComponent } from './spread/member/member.component';
import { ZhongxinComponent } from './spread/zhongxin/zhongxin.component';
import { DeliverComponent } from './order/deliver/deliver.component';
import { ReceiptComponent } from './order/receipt/receipt.component';
import { ReturnComponent } from './order/return/return.component';
import { InfoComponent } from './user/info/info.component';
import { AddressComponent } from './user/address/address.component';
import { PasswordComponent } from './user/password/password.component';
import { SecondaryComponent } from './user/secondary/secondary.component';
import { ViewComponent } from './finance/details/view/view.component';
import { AnnComponent } from './ann/ann.component';
import { AnnviewComponent } from './ann/annview/annview.component';
import {FileUploadModule} from 'ng2-file-upload';
import { JihuoComponent } from './spread/list/jihuo/jihuo.component';
import { Login2Component } from './login2/login2.component';
import { ForgetComponent } from './user/forget/forget.component';
import { PreservationComponent } from './user/preservation/preservation.component';
import { WholeComponent } from './order/whole/whole.component';
import { AllordersComponent } from './order/allorders/allorders.component';
import { DetailedComponent } from './order/allorders/detailed/detailed.component';
import { SpecificComponent } from './order/receipt/specific/specific.component';
import { RetreatComponent } from './order/return/retreat/retreat.component';
import { DetailComponent } from './order/deliver/detail/detail.component';
import { ReturnviewComponent } from './order/return/returnview/returnview.component';
import { RechargebalComponent } from './finance/rechargebal/rechargebal.component';
import { ProfitComponent} from "./guquan/profit/profit.component";
import { FenpeiComponent } from './guquan/fenpei/fenpei.component';
import { DuihuanComponent } from './guquan/duihuan/duihuan.component';
import { BuyComponent } from './guquan/buy/buy.component'
export const adminrouter: Routes = [
  {
      path: '',
      children: [
          {path: 'index', component: IndexComponents},
          {path: 'ann', component: AnnComponent},
          {path: 'ann/view/:id', component: AnnviewComponent},
          {path: 'finance/details', component: DetailsComponent},
          {path: 'finance/details/view/:u/:t', component: ViewComponent},
          {path: 'finance/continual', component: ContinualComponent},
          {path: 'finance/trans', component: TransComponent},
          {path: 'finance/rechargebal', component: RechargebalComponent},
          {path: 'finance/recharge', component: RechargeComponent},
          {path: 'finance/extract', component: ExtractComponent},
          {path: 'finance/give', component: GiveComponent},
          // 推广
          {path: 'spread/register', component: RegisterComponent},
          {path: 'spread/futou', component: FutouComponent},
          {path: 'spread/list', component: ListComponent},
          {path: 'spread/list/jihuo/:id', component: JihuoComponent},
          {path: 'spread/member', component: MemberComponent},
          {path: 'spread/zhongxin', component: ZhongxinComponent},
          {path: 'login2', component: Login2Component},
          //股权
          {path: 'guquan/profit', component: ProfitComponent},
          {path: 'guquan/give', component: FenpeiComponent},
          {path: 'guquan/duihuan', component: DuihuanComponent},
          {path: 'guquan/buy', component: BuyComponent},
          //订单
          {path: 'order/return', component: ReturnComponent},
          {path: 'order/return/view/:id', component: ReturnviewComponent},
          {path: 'order/whole', component: WholeComponent, children: [
              {path: '', redirectTo: 'allorders', pathMatch: 'full'},
              {path: 'allorders', component: AllordersComponent},
              {path: 'deliver', component: DeliverComponent},
              {path: 'receipt', component: ReceiptComponent},

          ]},
          {path: 'order/whole/detailed/:id', component: DetailedComponent},
          {path: 'order/whole/specific/:id', component: SpecificComponent},
          {path: 'order/whole/detail/:id', component: DetailComponent},
          {path: 'order/retreat/:id', component: RetreatComponent},
          //设置
          {path: 'user/info', component: InfoComponent},
          {path: 'user/address', component: AddressComponent},
          {path: 'user/password', component: PasswordComponent},
          {path: 'user/secondary', component: SecondaryComponent},
          {path: 'user/forget', component: ForgetComponent},
          {path: 'user/preservation', component: PreservationComponent},
      ]
  }
];

@NgModule({
    imports: [
        CommonModule,
        WidgetsModule,
        FileUploadModule,
        ReactiveFormsModule,
        RouterModule.forChild(adminrouter)
    ],
    declarations: [IndexComponents, DetailsComponent, ContinualComponent, TransComponent, RechargeComponent,
      ExtractComponent, GiveComponent, RegisterComponent, FutouComponent, ListComponent, MemberComponent, ZhongxinComponent,
      DeliverComponent, ReceiptComponent, ReturnComponent, InfoComponent, AddressComponent, PasswordComponent, SecondaryComponent,
      ViewComponent, AnnComponent, AnnviewComponent, JihuoComponent, Login2Component, ForgetComponent, PreservationComponent,
      WholeComponent,AllordersComponent,DetailedComponent, SpecificComponent, RetreatComponent, DetailComponent, ReturnviewComponent, RechargebalComponent,
      ProfitComponent, DuihuanComponent, BuyComponent, FenpeiComponent
    ],

})
export class AdminModule {  }
