import { Component } from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI{

  userId: string;
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtr: ModalController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              public actionSheetCtrl: ActionSheetController) {
    super();
  }

  ionicViewDidEnter(){
    //获取userId
    this.storage.get("UserId").then((val) =>{
      if(val != null){
        this.userId = val;
      }
    });
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库中选择',
          handler: () => {

          }
        },
        {
          text: '使用相机',
          handler: () => {

          }
        },
        {
          text: '取消',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

}
