///<reference path="../../../node_modules/@angular/common/http/src/response.d.ts"/>
import { Observable, throwError} from 'rxjs';
import { catchError, retry, } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {map} from "rxjs/internal/operators";


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {

  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";

  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  /*登录方法*/
  login(mobile,password):Observable<any>{
    return this.getUrlReturn(this.apiUrlLogin+"?mobile="+mobile+"&password="+password);
  }

  /*注册方法 * 全局获取 HTTP 请求的方法
   * @private
   * @param {string} mobile
   * @param {string} nickname
   * @param {string} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  register(mobile,nickname,password): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlRegister+ "?mobile="+ mobile + "&nickname=" + nickname + "&password="+ password);
  }

  /*获取问题的详情*
* @private
* @param {string} id //问题id
*/
  getQuestion(id): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlGetQuestion+"?id="+id);
  }

  /*获取问题的详情，传递userId,获取当前用户有没有关注此问题*
* @private
* @param {string} id //问题id
*/
  getQuestionWithUser(questionId,userId): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser+"?id="+questionId + "&userid="+ userId);
  }

  /*关注问题*
* @private
* @param {string} id //问题id
*/
  saveFavorite(questionId,userId): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlSaveFavourite+"?questionid="+questionId + "&userid="+ userId);
  }

  /*关注问题*
* @private
* @param {string} userId //用户id
* @param{string}  quedtionId //问题id
* @param{string}  content //回答内容
*
*/
  answer(userId,questionId,content): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlAnswer+"?userid="+userId+"&questionid="+questionId + "&content="+ content);
  }



  /*获取用户信息 *
   * @private
   * @param {string} userid
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  getUserInfo(userId){
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId)
  }

  /*更改昵称 *
   * @private
   * @param {string} userid
   * @param {string} nickname
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  updateNickName(userId,nickname): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUpdateNickName+ "?userid="+ userId + "&nickname=" + nickname);
  }

  /*保存提问 *
 * @private
 * @param {string} userid
 * @param {string} title
 * @param {string} content
 * @returns {Observable<string[]>}
 * @memberof RestProvider
 */
  saveQuestion(userId,title,content): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlQuestionSave+ "?userid="+ userId + "&title=" + title + "&content="+ content);
  }

  /*请求首页（feeds）信息流 *
* @private
* @param {string} userid
* @param {string} title
* @param {string} content
* @returns {Observable<string[]>}
* @memberof RestProvider
*/
  getFeeds(): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlFeeds);
  }

  /*请求发现页（feeds）信息流 *
* @private
* @returns {Observable<string[]>}
* @memberof RestProvider
*/
  getQuestions(): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlQuestionList);
  }

  /*请求通知页信息流 *
* @private
* @param {string} userid
* @returns {Observable<string[]>}
* @memberof RestProvider
*/
  getUserNotification(userId): Observable<string[]>{
  return this.getUrlReturn(this.apiUrlUserNotifications+"?userid="+userId);
}

  /*获取用户相关问题列表 *
* @private
* @param {string} userid
* @param {string} type question/answer/favourite
* @returns {Observable<string[]>}
* @memberof RestProvider
*/
  getUserQuestionList(userId,type): Observable<string[]>{
    return this.getUrlReturn(this.apiGetUserQuestionList+"?userid=" + userId + "&type=" + type);
  }

  /**
   * 全局获取 HTTP 请求的方法
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url:string){
    return this.http.get(url)
      .pipe(
        map((res:any) => JSON.parse(res)), //将数据转换为json,新版本的坑,旧方法的map不能用,需要map&&pipe
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理并在 console 中显示 error
   *
   * @private
   * @param {(Response | any)} error
   * @returns
   * @memberof RestProvider
   */
  private handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
