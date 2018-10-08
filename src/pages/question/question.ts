import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI{

  title: string;
  content: string;
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public toastCtrl: ToastController) {
    super();
  }

  //关闭当前页面
  dismiss(){
    this.viewCtrl.dismiss();
  }

  submitQuestion(){
    this.storage.get("UserId").then((val)=>{
      if(val != null){
        var loading = super.showLoading(this.loadingCtrl,"发表中...");
        this.rest.saveQuestion(val,this.title,this.content)
          .subscribe(f =>{
            if(f["Status"] == "OK"){
              loading.dismissAll();
              this.dismiss();
            }else{
              super.showToast(this.toastCtrl,f["StatusContent"])
            }
          },
            error => this.errorMessage = <any>error)
      }
    })
  }



}
