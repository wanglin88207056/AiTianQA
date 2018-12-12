import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatMessage, ChatServiceProvider} from "../../providers/chat-service/chat-service";

/**
 * Generated class for the ChatDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat-details',
  templateUrl: 'chat-details.html',
})
export class ChatDetailsPage {

  chatUserName: string;
  isOpenEmojiPicker = false;
  messageList: ChatMessage[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chatService: ChatServiceProvider) {
    this.chatUserName = navParams.get('username');
  }

  ionViewDidEnter(){
    this.getMessages()
      .then(() => {
        this.scrollToBottom();
      })
  }




  getMessages(){
    return this.chatService.getMessageList()
      .then(res => {
        this.messageList = res["array"] as ChatMessage[];
      })
      .catch(error =>{
        console.error(error);
      })
  }

  scrollToBottom(){

  }

  //切换表情组件
  switchEmojiPicker(){
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

}
