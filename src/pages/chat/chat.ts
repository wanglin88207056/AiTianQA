import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatDetailsPage} from "../../pages/chat-details/chat-details";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  userInfo: object;
  ChatDetailsPage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.userInfo = {
      userid: '123321',
      username: '高圆圆'
    };
    this.ChatDetailsPage = ChatDetailsPage;
  }


}
