import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {LoginPage} from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import {AF} from '../providers/af';
export const firebaseConfig = {
  apiKey: "AIzaSyBT9J9Y7L8o_BORLgS0hc6u3QEz1t8TWPk",
  authDomain: "desarrollo-2cfcd.firebaseapp.com",
  databaseURL: "https://desarrollo-2cfcd.firebaseio.com",
  projectId: "desarrollo-2cfcd",
  storageBucket: "desarrollo-2cfcd.appspot.com",
  messagingSenderId: "220244118795"
};
@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AF
  ]
})
export class AppModule {}
