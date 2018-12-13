import {Component, Input} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {DetailsPage} from "../../pages/details/details";

/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI{

  errorMessage:any;
  questions: string[];

  //dataType外部传递进来参数， dataSourceType本地接收之后的参数命名
  @Input('dataType') dataSourceType;
  constructor(public navParams: NavParams,
              public navCtrl:NavController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider) {
    super();
  }

  ngAfterContentInit(){
    //存储用户登录信息
    this.storage.get('UserId').then((val) => {
      if(val != null){
        //加载用户数据
        var loading = super.showLoading(this.loadingCtrl,"加载中...");
        this.rest.getUserQuestionList(val,this.dataSourceType)
          .subscribe(
            q => {
              this.questions = q;
              if(loading){
                loading.dismiss();
              }
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
