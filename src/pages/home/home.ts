import { Component,ViewChild } from '@angular/core';
import { Nav, Platform,NavController ,MenuController, Searchbar} from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';
import { ContentpagesPage } from '../contentpages/contentpages';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { ApiProvider } from '../../providers/api/api';
import { AppSettings } from '../../app/app.settings'
import { DetailPage } from '../detail/detail'
// import { SubscriptionPage } from '../Subscription/subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  @ViewChild('searchbar') searchbar:Searchbar;
  public search_key:any;
  public search:any;
  public search_mode:boolean =false;
  public category_list:any =[];
  public norList :any=[];
  public base_url:any;
  public noImage:any;
  items = [];
  public shouldShowCancel:boolean = false;
 // rootPage: any = LoginPage;
 pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public apiProvider:ApiProvider ,  public menu: MenuController) {
    this.noImage = false;
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sign Up', component: SignupPage },
      { title: 'My Profile', component: ProfilePage },
      // { title: 'My Subscription', component: SubscriptionPage },
      { title: 'Change Password', component: ChangepasswordPage },
      { title: 'About Us', component: ContentpagesPage },
      // { title: 'Terms of Use', component: VerificationPage },
      // { title: 'Privacy Policy', component: ForgotpasswordPage },
      // { title: 'Disclamer', component: ChangepasswordPage },
      { title: 'Contact Us', component: ContactPage },
      { title: 'Logout', component: '' },
    ];
    this.search = '';

   this.menu.swipeEnable(true);
  }

  ionViewDidLoad() {
    this.openSearch();
    
    // console.log('ionViewDidLoad VerificationPage');
    this.search_key = '';
    this.base_url = AppSettings.api_url;
    this.getData();
  }

  setFilter(){
    if(this.search_key){
      this.norList = this.category_list.filter((obj)=>{
        console.log(obj);
        if(obj.category_name.includes(this.search_key)){
          console.log('fdfdjfhdjfhdjhj')
          return obj;
        }
      })
    } else {
      this.norList = this.category_list;
    }
   
    console.log(this.norList,'tttttttttttttttttttt');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // console.log(page.title,'titleeeeeeeeee');
    if(page.title == 'Logout'){
      this.logout();
    } else {
      this.nav.setRoot(page.component);
    }
   
  }
  gotoDetail(id,name){
    // console.log(id,'idddddddddddddd');
    this.navCtrl.push(DetailPage,{category_id:id,category_name:name});
  }




  logout(){
    // console.log('hereeeee');
    localStorage.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    this.navCtrl.setRoot(LoginPage);
  }
  

  getData(){
    let data = {
      search:this.search
    }
    this.apiProvider.showLoader();
    this.apiProvider.common_post_withToken('getCategories',data).subscribe((result)=>{
      if(result.body.status == true){
        this.noImage = true;
        this.category_list = result.body.categories;
        this.norList = result.body.categories;
        // this.category_list = [];
      } else{
        if(this.search_mode){
          this.search = ''
          this.getData2()
        }
      }
      this.apiProvider.hideLoader();
    })
  }

  getData2(){
    let data = {
      search:this.search
    }
    // this.apiProvider.showLoader();
    this.apiProvider.common_post_withToken('getCategories',data).subscribe((result)=>{
      if(result.body.status == true){
        this.category_list = result.body.categories;
        // this.category_list = [];
      } else{
        
      }
      // this.apiProvider.hideLoader();
    })
  }
  getItems($eve) {
    // console.log(this.search);
    this.getData();
  }

  checkFocus(){
    
  }
  openSearch() {
    setTimeout(() => {  
        // this.searchbar.setFocus();
    }, 5);
}


  toggleSearch(){
    
    if(this.search_mode){
      this.search = '';
      this.search_mode =false;
      this.search_key = '';
      this.norList = this.category_list;
    } else {
      this.search_mode =true;
      this.search = '';
    }
    // this.search_mode = (this.search_mode)?false:true;
    // if(!this.search_mode){
    //   this.search = '';
    // } 
  }
  
  closeSearch(){
    this.search_mode = (this.search_mode)?false:true;
    this.search = '';
    this.getData();
  }

}
