import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the DesclaimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-desclaimer',
  templateUrl: 'desclaimer.html',
})
export class DesclaimerPage {
  public desclaimerData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ApiProvider:ApiProvider) {
    this.getDesclaimer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DesclaimerPage');
  }

  getDesclaimer() {
    let data = {
      url:'disclaimer'
    }
    this.ApiProvider.common_get('getCmsdetails',data).subscribe((result)=>{
      if(result.status)
        this.desclaimerData = result.body.data;
      else 
        this.ApiProvider.showLongToast(result.body.message);
    })
  }
}
