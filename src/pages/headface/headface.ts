import { Component } from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController, Platform
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";

// 导入外部加载进来的组件
import { File } from "@ionic-native/file";
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import {  FilePath } from "@ionic-native/file-path";
import {  Camera } from "@ionic-native/camera";

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
  lastImage: string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtr: ModalController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              public actionSheetCtrl: ActionSheetController,
              public camera: Camera,
              public transfer: FileTransfer,
              public file: File,
              public filePath: FilePath,
              public platform: Platform
              ) {
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

  //获取图片
  takePicture(sourceTye){
    // 定义相机的一些参数
    var options = {
      quality: 100,
      sourceType: sourceTye,
      saveToPhotoAlbum: false,//s是否保存照片到相册中
      correctOrientation: true, // 是否纠正拍摄照片的方向
    }
    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理Android平台的文件路径问题
      if(this.platform.is('android')){
        
      }
    });
  }

}
