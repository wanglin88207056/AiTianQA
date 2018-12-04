import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{
  id: string;
  errorMessage: any;
  content: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public toastCtrl: ToastController) {
    super();
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

  //取消
  dismiss(){
    this.viewCtrl.dismiss();
  }

  //发布
  submit(){
    this.storage.get("UserId").then((val)=>{
      if(val != null){
        var loading = super.showLoading(this.loadingCtrl,"发布中...");
        this.rest.answer(val,this.id,this.content)
          .subscribe(f =>{
              if(f["Status"] == "OK"){
                loading.dismissAll();
                this.dismiss();
              }else{
                super.showToast(this.toastCtrl,f["StatusContent"])
              }
            },
            error => this.errorMessage = <any>error)
      }else{
        super.showToast(this.toastCtrl,"请登录后发布提问...")
      }
    })
  }

}
