import { Component } from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController, Platform
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";

declare  var cordova: any; //导入第三方的库到ts项目中
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
      if(this.platform.is('android') && sourceTye == this.camera.PictureSourceType.PHOTOLIBRARY){
        this.filePath.resolveNativePath(imagePath) //获取android平台下的真实路径
          .then(filePath =>{
            //获取正确的路径
            let correctPath = filePath.substr(0,filePath.lastIndexOf('/')+1);
            //获取正确文件名
            let currentName = imagePath.substring(imagePath.lastIndexOf('/')+1,imagePath.lastIndexOf('?')+1);
            this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
          });
      }else{
        //获取正确的路径
        let correctPath = imagePath.substr(0,imagePath.lastIndexOf('/') + 1);
        //获取正确文件名
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
      }
    },(err) => {
        super.showToast(this.toastCtrl,"选择图片出现错误,请在 App 中操作或检查相关权限。")
    });
  }

  //将获取到的图片或者相机拍摄到的图片进行一下另存为,用于后期图片上传使用
  copyFileToLocalDir(namePath,currentName,newFileName){
    this.file.copyFile(namePath,currentName,cordova.file.dataDirectory,newFileName)
      .then(
        success => {
          this.lastImage = newFileName;
        },error => {
          super.showToast(this.toastCtrl,"存储图片到本地图库出现错误.");
        }
      )
  }

  //为文件生成一个新的文件名
  createFileName(){
    var d = new Date(),
      n = d.getTime(),
      newFileName = n+".jpg";
    return newFileName;
  }
}
