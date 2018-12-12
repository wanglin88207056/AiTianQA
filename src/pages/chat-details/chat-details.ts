import {Component, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, NavController, NavParams, TextInput} from 'ionic-angular';
import {ChatMessage, ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";

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
  chatUserId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  isOpenEmojiPicker = false;
  messageList: ChatMessage[];
  errorMessage: any;
  editorMessage: string;
  @ViewChild(Content) content: Content;
  @ViewChild('chatInput') messageInput: TextInput;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chatService: ChatServiceProvider,
              public storage: Storage,
              public rest: RestProvider,
              public event: Events) {
    this.chatUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid');
  }

  ionViewDidEnter(){
    this.storage.get('UserId').then((val) => {
      if(val != null){
        //加载用户数据
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.userId = "5b855b6a647eb469b805016d";
              this.userName = userinfo["UserNickName"];
              this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date().valueOf()); //加后缀防止浏览器缓存图片不改变
            },
            error => this.errorMessage = <any>error
          );

      }else{

      }
    });

    this.getMessages()
      .then(() => {
        this.scrollToBottom();
      })

    //听取消息的发布（订阅）
    this.event.subscribe('chat.received',(msg,time) =>{
      this.messageList.push(msg);
    })
  }

  ionicViewWillLeave(){
    this.event.unsubscribe('chat.received');
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

  //切换表情组件
  switchEmojiPicker(){
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  scrollToBottom():any{
    setTimeout(() =>{
      if(this.content.scrollToBottom){
        this.content.scrollToBottom();
      }
    },400)
  }

  //光标移动到输入框的回调
  focus(){
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.content.scrollToBottom();
  }

  sendMessage(){
    if(!this.editorMessage.trim())
      return;
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId : id,
      userId: this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
    }
    this.messageList.push(messageSend);
    this.scrollToBottom();
    this.editorMessage = '';

    if(!this.isOpenEmojiPicker){
      this.messageInput.setFocus();
    }
    this.chatService.sendMessage(messageSend)
      .then(() => {
        let index = this.getMessageIndex(id);
        if( index !== -1){
          this.messageList[index].status = 'success';
        }
      })
  }

  getMessageIndex(id:string){
    return this.messageList.findIndex(e => e.messageId === id)
  }

}
