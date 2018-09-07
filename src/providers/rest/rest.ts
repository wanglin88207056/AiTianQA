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
    if (error.error instanceof ErrorEvent) {
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
