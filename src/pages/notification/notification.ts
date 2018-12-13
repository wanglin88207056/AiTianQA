import { Component } from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI{
  errorMessage:any;
  notificationList: string[];
  constructor(public navParams: NavParams,
              public navCtrl:NavController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider) {
    super();
  }

  ionViewDidEnter() {
    //存储用户登录信息
    this.storage.get('UserId').then((val) => {
      if(val != null){
        //加载用户数据
        var loading = super.showLoading(this.loadingCtrl,"加载中...");
        this.rest.getUserNotification(val)
          .subscribe(
            n => {
              this.notificationList = n;
              loading.dismissAll();
            },
            error => this.errorMessage = <any>error
          );
      }
    })
  }

  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

}
