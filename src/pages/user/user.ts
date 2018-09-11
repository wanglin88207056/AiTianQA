import { Component } from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";
import {LoginPage} from "../login/login";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI{

  headface: string = 'https://imoocqa.gugujiankong.com/users/5996953615f87ec629cff319.jpg';
  nickname: string = '加载中...';
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtr: ModalController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              public viewCtrl: ViewController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }
  showModal(){
    let modal = this.modalCtr.create(LoginPage);
    modal.present();
  }
  ionViewDidEnter(){
    this.loadUserPage();
  }
  loadUserPage(){
    //存储用户登录信息
    this.storage.get('UserId').then((val) => {
      if(val != null){
        //加载用户数据
        var loading = super.showLoading(this.loadingCtrl,"加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.nickname = userinfo["UserNickName"];  //加后缀防止浏览器缓存图片不改变
              this.headface = userinfo["UserHeadface"] + "?" + (new Date().valueOf()); //加后缀防止浏览器缓存图片不改变
              loading.dismiss();
            },
            error => this.errorMessage = <any>error
          );

      }else{

      }
    })
  }
  //修改昵称
  updateNickName(){
    this.storage.get('UserId').then((val) =>{
      if(val != null){
        var loading = super.showLoading(this.loadingCtrl,"修改中...");
        this.rest.updateNickName(val,this.nickname)
          .subscribe(
            f => {
              if(f["Status"] == "OK"){
                loading.dismiss();
                super.showToast(this.toastCtrl,"昵称修改成功。");
              }else{
                loading.dismiss();
                super.showToast(this.toastCtrl,f["StatusContent"]);
              }
            },
            error => this.errorMessage = <any>error
          );
      }
    });
  }

  //注销
  logout(){
    // 清除UserId
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }

}
