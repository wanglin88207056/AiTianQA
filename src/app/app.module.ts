import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from "@angular/common/http";

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ChatPage} from "../pages/chat/chat";
import {NotificationPage} from "../pages/notification/notification";
import {MorePage} from "../pages/more/more";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {DiscoveryPage} from "../pages/discovery/discovery";
import { RestProvider } from '../providers/rest/rest';
import {LoginPage} from "../pages/login/login";
import {IonicStorageModule} from "@ionic/storage";
import {RegisterPage} from "../pages/register/register";
import {UserPage} from "../pages/user/user";
import {HeadfacePage} from "../pages/headface/headface";
// 导入外部加载进来的组件
import { File } from "@ionic-native/file";
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import {  FilePath } from "@ionic-native/file-path";
import {  Camera } from "@ionic-native/camera";
import {QuestionPage} from "../pages/question/question";
import {DetailsPage} from "../pages/details/details";
import {AnswerPage} from "../pages/answer/answer";


@NgModule({
  declarations: [
    MyApp,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    File,
    FileTransfer,
    FilePath,
    Camera
  ]
})
export class AppModule {}
