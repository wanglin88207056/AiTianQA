import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HttpModule } from '@angular/http';

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
import {ChatDetailsPage} from "../pages/chat-details/chat-details";
import { EmojiProvider } from '../providers/emoji/emoji';
import {ComponentsModule} from "../components/components.module";
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import {RelativetimePipe} from "../pipes/relativetime/relativetime";
import {UserdatalistPage} from "../pages/userdatalist/userdatalist";
import { SettingsProvider } from '../providers/settings/settings';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';
import {ScanPage} from "../pages/scan/scan";
import {VersionPage} from "../pages/version/version";


@NgModule({
  declarations: [
    MyApp,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    HomePage,
    DiscoveryPage,
    ChatPage,
    ChatDetailsPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    TabsPage,
    RelativetimePipe,
    UserdatalistPage,
    ScanPage,
    VersionPage
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回'
    }),
    ComponentsModule,
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
    ChatDetailsPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    TabsPage,
    UserdatalistPage,
    ScanPage,
    VersionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    File,
    FileTransfer,
    FilePath,
    Camera,
    EmojiProvider,
    ChatServiceProvider,
    SettingsProvider,
    QRScanner,
  ]
})
export class AppModule {}
