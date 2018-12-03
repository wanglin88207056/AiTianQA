import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{

  id: string;
  userId: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  isFavorite: boolean;
  isMyQuestion: boolean;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public rest:RestProvider,
              public viewCtrl: ViewController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.loadQuestion(this.id);
  }

  loadQuestion(id){
    this.storage.get("UserId").then((val) => {
      if(val != null){
        this.userId = val;
        var loading = super.showLoading(this.loadingCtrl,"加载中...");
        this.rest.getQuestionWithUser(id,val).subscribe(
          q=>{
            this.question = q;
            this.answers = q["Answers"];
            this.isFavorite = q["IsFavorite"];
            this.isMyQuestion = (q["OwnUserId"] == val);
          },
          error => this.errorMessage = <any>error
        );
      }else{
        super.showToast(this.toastCtrl,"请登录后查看...")
      }
    })

  }

  saveFavorite(){
    var loading = super.showLoading(this.loadingCtrl,"请求中...");
    this.rest.saveFavorite(this.id,this.userId)
      .subscribe(
        f =>{
          if(f["Status"] == "OK"){
            loading.dismiss();
            super.showToast(this.toastCtrl,this.isFavorite ? "取消关注成功" : "关注问题成功");
            this.isFavorite = !this.isFavorite;
          }
        },
        error => this.errorMessage = <any>error
      )
  }

}
