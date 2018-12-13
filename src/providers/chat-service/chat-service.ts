import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Events} from "ionic-angular";

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//聊天信息的属性
export class ChatMessage {
  messageId: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;

}
//用户信息的属性
export class UserInfo {
  userId: string;
  username: string;
  userImgUrl: string;
}

@Injectable()
export class ChatServiceProvider {

  constructor(public http: HttpClient,
              public event: Events) {

  }

  /*
  *获取消息列表
  * 从api获取或者模拟的json获取 */
  getMessageList():Promise<any>{
    const url = '../../assets/mock/msg-list.json';
    return this.http.get(url)
      .toPromise()
      .catch(error => Promise.reject(error || "错误信息"))
  }

  //发送消息并改变消息的状态
  sendMessage(message:ChatMessage){
    return new Promise(resolve => setTimeout(() => {
      resolve(message);
      },Math.random()*1000))
      .then(() => {
        this.mockNewMessage(message);
      })
  }


/*
* 模拟对方回复了一个消息，
* 前台为了及时接收这个回复消息，引入event模块*/
  mockNewMessage(message:ChatMessage){
    const id = Date.now().toString();
    let messageSend = {
      messageId : id,
      userId: '123321',
      username: '高圆圆',
      userImgUrl: 'https://imoocqa.gugujiankong.com/users/5bd15d35647eb42d8c013aa2.jpg',
      toUserId: message.userId,
      time: Date.now(),
      message: message.username+'，你是个好人，但是我们不合适...',
      status: 'success'
    };

    //进行消息发布广播
    setTimeout(() => {
      this.event.publish('chat.received',messageSend,Date.now())
    },Math.random()*1000)

  }

}
