import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap} from 'rxjs/operators';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { AppSettings } from '../../app/app.settings'
import { JwtHelperService } from '@auth0/angular-jwt';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';

// import { of } from 'rxjs';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private jwtHelper = new JwtHelperService();
  private baseUrl = AppSettings.api_url+'users/';
  private baseUrl2 = AppSettings.api_url+'palliativeApp/' 
  // private s3_url = environment.s3_upload;
  private loader: any;
  constructor( private http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController) { }


  


  /**
   * without token
   * @param url -> api url
   * @param data -> data to be passed
   */

  common_post(url,data){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token':''
      })
    }
    let options = {
      headers: httpOptions.headers
    };

    let cur_url = this.baseUrl + url;
    return this.http.post<any>(cur_url, data, { headers: options.headers, observe: 'response' }).pipe((result)=>{
        // this.loader.dismiss();
        return result;
     
    })
  }

   /**
   * without token
   * @param url -> api url
   * @param data -> data to be passed
   */

  common_get(url,data){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    let options = {
      headers: httpOptions.headers
    };
    // let params = new URLSearchParams(); 
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      // httpParams = httpParams.append(key, temp[key]);
      httpParams = httpParams.append(key, data[key] )
    });
    // params.append("data", )
      // params.append('search',data.search);
    let cur_url = this.baseUrl2 + url;
    // let options2 = { headers: options.headers, params: params };
    return this.http.get<any>(cur_url,{headers:options.headers,observe:'response',params:httpParams}).pipe((result)=>{
        // this.loader.dismiss();
        return result;
     
    })
  }


  /**
   * without token
   * @param url -> api url
   * @param data -> data to be passed
   */

  common_post_withToken(url,data){

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
    }
    let options = {
      headers: httpOptions.headers
    };
    let cur_url = '';
    if(url == 'changePassword')
      cur_url = this.baseUrl + url;
    else 
      cur_url = this.baseUrl2 + url;
    return this.http.post<any>(cur_url, data, { headers: options.headers, observe: 'response' }).pipe((result)=>{
        // this.loader.dismiss();
        return result;
     
    })
  }

  logout(){
    localStorage.clear();
    // this.navCtrl.setRoot(LoginPage);
  }

  public showLoader(){
    this.loader = this.loadingCtrl.create({
      content: AppSettings.Loading_text
    });

    this.loader.present();
    return this.loader;
  }
  public hideLoader(){
    this.loader.dismiss();
  }


  showLongToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: AppSettings.toast_delay,
    });
    toast.present();
  }


  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Your files were successfully saved',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  
}
