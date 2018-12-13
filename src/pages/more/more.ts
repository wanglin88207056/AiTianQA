import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { Storage } from '@ionic/storage';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {UserPage} from "../user/user";
import {UserdatalistPage} from "../userdatalist/userdatalist";
import {SettingsProvider} from "../../providers/settings/settings";
import {ScanPage} from "../scan/scan";
import {VersionPage} from "../version/version";


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
  selectedTheme: string;

  headface: string;
  userinfo: string[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtr: ModalController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              private settings: SettingsProvider
              ) {
    super();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }
  showModal(){
    let modal = this.modalCtr.create(LoginPage);
    // 关闭后的回调
    modal.onDidDismiss(() =>{
      this.loadUserPage();
    });
    modal.present();
  }
  ionViewDidLoad(){
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

  //去个人中心其他列表页
  gotoDataList(type){
    this.navCtrl.push(UserdatalistPage,{"dataType":type})
  }

  /*
  跳转到扫描二维码页面，加上animate = false的参数是为了相机能够在整个屏幕中显示，
  如果不加，相机就出不来
  animate参数默认为true
  * */
  gotoScanQRCode(){
    this.navCtrl.push(ScanPage,null,{"animate": false});
  }

  gotoVersions(){
    this.navCtrl.push(VersionPage);
  }

  //切换夜间模式
  toggleChangeTheme(){
    if(this.selectedTheme  === 'dark-theme'){
      this.settings.setActiveTheme('light-theme')
    }else{
      this.settings.setActiveTheme('dark-theme')
    }
  }



}
