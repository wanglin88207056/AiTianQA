import { Component } from '@angular/core';
import {LoadingController, ModalController, NavController, Tabs} from 'ionic-angular';
import {QuestionPage} from "../question/question";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {DetailsPage} from "../details/details";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{

  feeds: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public modalCtrl:ModalController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider) {
    super();
  }

  ionViewDidLoad(){
    this.getFeeds();
  }

  // 进入问题页
  gotoQuestion(){
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  // 进入聊天页
  gotoChat(){
    this.selectTab(2);
  }

  //选定指定的tab
  selectTab(index:number){
    var t:Tabs = this.navCtrl.parent;
    t.select(index);
  }

  getFeeds(){
    var loading = super.showLoading(this.loadingCtrl,"数据加载中...")
    this.rest.getFeeds()
      .subscribe(
        f => {
          this.feeds = f;
          loading.dismiss();
        },
        error => this.errorMessage = <any>error
      );
  }

  //进入详情页
  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id: questionId});
  }

}
