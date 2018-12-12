import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(public http: HttpClient) {

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

}
