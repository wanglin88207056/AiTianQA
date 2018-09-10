import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import { RegisterPage } from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{
  mobile: string;
  password: string;
  errorMessage: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtr:ViewController,
              public loadingCtrl: LoadingController,
              public rest:RestProvider,
              public toastCtrl: ToastController,
              public storage: Storage) {
  super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //登录
  login(){
    var loading = super.showLoading(this.loadingCtrl,"登录中...")
    this.rest.login(this.mobile,this.password)
      .subscribe(
        f => {
          if(f["Status"] == "OK"){
            //处理登录成功页面
            this.storage.set('UserId',f["UserId"]);
            loading.dismiss();
          }else{
            loading.dismiss();
            super.showToast(this.toastCtrl,f["StatusContent"])
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  //push注册页
  pushRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  //关闭当前页面的方法
  dismiss(){
    this.viewCtr.dismiss();
  }

}
