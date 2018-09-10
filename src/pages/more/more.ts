import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { Storage } from '@ionic/storage';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {UserPage} from "../user/user";


/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI{

  public notLogin: boolean = true;
  public logined:boolean = false;

  headface: string;
  userinfo: string[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtr: ModalController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider) {
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
              this.userinfo = userinfo;
              this.headface = userinfo["UserHeadface"] + "?" + (new Date().valueOf())  //加后缀防止浏览器缓存图片不改变
              this.notLogin = false;
              this.logined = true;
              loading.dismiss();
            }
          );

      }else{
        this.notLogin = true;
        this.logined = false;
      }
    })
  }

  /*去个人信息页面*/
  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }
}
