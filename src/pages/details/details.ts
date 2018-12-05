import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import { AnswerPage } from "../answer/answer";

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
export class DetailsPage extends BaseUI {

  id: string;
  userId: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  isFavorite: boolean;
  isMyQuestion: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public storage: Storage,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id) {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.userId = val;
        var loading = super.showLoading(this.loadingCtrl, "加载中...");
        this.rest.getQuestionWithUser(id, val)
          .subscribe(
            q => {
              this.question = q;
              this.answers = q["Answers"];
              this.isFavorite = q["IsFavourite"];
              this.isMyQuestion = (q["OwnUserId"] == val);
              loading.dismissAll();
            },
            error => this.errorMessage = <any>error);
      }
    });
  }

  saveFavorite() {
    var loading = super.showLoading(this.loadingCtrl, "请求中...");
    this.rest.saveFavorite(this.id, this.userId)
      .subscribe(
        f => {
          if (f["Status"] == "OK") {
            super.showToast(this.toastCtrl, this.isFavorite ? "取消关注成功。" : "关注问题成功。");
            this.isFavorite = !this.isFavorite;
            loading.dismiss();
          }
        },
        error => this.errorMessage = <any>error);
  }

  showAnswerPage() {
    let modal = this.modalCtrl.create(AnswerPage, { "id": this.id });
    //关闭后的回调
    modal.onDidDismiss(() => {
      this.loadQuestion(this.id);
    });
    modal.present();
  }
}
