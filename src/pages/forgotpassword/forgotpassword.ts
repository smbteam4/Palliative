import { Component, ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Validators, FormBuilder, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from '../login/login'
import { e } from '@angular/core/src/render3';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  forgotForm: FormGroup;
  submitAttempted: boolean = false;
  codeSuccess:boolean = false;
  title:any;
  @ViewChild("0tp0") el_otp1: ElementRef;
  @ViewChild("0tp2") el_otp2: ElementRef;
  @ViewChild("0tp3") el_otp3: ElementRef;
  @ViewChild("abc") el_otp4: ElementRef;
  user:any;
  public otp0;
  public otp1;
  public otp2;
  public otp3;
  public setPassword_screen:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public apiProvider:ApiProvider,  fb: FormBuilder, public menu:MenuController) {
   
    this.forgotForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    });
    this.setPassword_screen = false;
  
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.user = {
      password:'',
      confirmPassword:''
    }
    this.setTitle();
  }
  
  /**
   * set title
   */

   setTitle(){
    if(!this.codeSuccess && !this.setPassword_screen) {
      this.title = "Frogot Password"
    } else if(this.codeSuccess && !this.setPassword_screen) {
      this.title = "Verify Code"
    } else if(this.codeSuccess && this.setPassword_screen) {
      this.title = "Set Password"
    }
   }
  sendCode() {
    // this.apiProvider.showLoader();
    let data = {
      email:this.forgotForm.value.email
    }
    this.apiProvider.showLoader();
    setTimeout(()=>{
   
      this.apiProvider.common_post('forgotPassword',data).subscribe((result)=>{
        console.log(result.body.message)
        if(result.body.status == true) {
          // this.apiProvider.showLongToast(result.body.message);
          this.codeSuccess = true;
          this.setTitle();
          // this.navCtrl.setRoot(HomePage);
          // this.navCtrl.setRoot(VerificationPage,{
          //   email:this.forgotForm.value.email
          // });
        } else {
         
        }
        this.apiProvider.hideLoader();
      })
    },1000)
    
  }
  verifyResetCode(){
    if(this.otp0  && this.otp1 && this.otp2 && this.otp3) { 
      this.apiProvider.showLoader();
      let data = {
        otp:this.otp0 + this.otp1 + this.otp2 +this.otp3,
        email: this.forgotForm.value.email
      }
      this.apiProvider.common_post('verify_reset_code', data).subscribe((result)=>{
        if(result.body.status == true) {
          // this.apiProvider.showLongToast(result.body.message);
          this.setPassword_screen = true;
          this.setTitle();
        }
        this.apiProvider.hideLoader();
        this.apiProvider.showLongToast(result.body.messsage)
      })
    } else {
      // this.apiProvider.showLongToast('Enter valid verification code')
    }
  }
  resendCode(){
    let data = {
      email:this.forgotForm.value.email
    }
    this.apiProvider.showLoader();
    setTimeout(()=>{
   
      this.apiProvider.common_post('forgotPassword',data).subscribe((result)=>{
        if(result.body.status == true) {
          this.apiProvider.showLongToast(result.body.message)
          this.codeSuccess = true;
          this.setTitle();
          // this.navCtrl.setRoot(HomePage);
          // this.navCtrl.setRoot(VerificationPage,{
          //   email:this.forgotForm.value.email
          // });
        } else {
          
        }
        this.apiProvider.hideLoader();
      })
    },1000)
  }

  setPassword(){
    // if(this.otp0  && this.otp1 && this.otp2 && this.otp3) {
      if(!this.user.password  ){
        // alert('password required');
        this.apiProvider.showLongToast('Please set a new password')
        return;
      } else if (!this.user.confirmPassword) {
        this.apiProvider.showLongToast('Please confirm your new password')
        return;
      }
      if(this.user.password == this.user.confirmPassword){
        this.apiProvider.showLoader();
        let data = {
          otp:this.otp0 + this.otp1 + this.otp2 +this.otp3,
          email:this.forgotForm.value.email,
          password:this.user.password,
          confirmPwd:this.user.confirmPassword
        }
        this.apiProvider.common_post('setPassword',data).subscribe((result)=>{
          if(result.body.status == true) {
            // this.codeSuccess = true;
            this.setTitle();
            this.navCtrl.setRoot(LoginPage);
            
          } else {
            
          }
          this.apiProvider.hideLoader();
        })
      } else {
        // alert('password mismatch');
        this.apiProvider.showLongToast('Passwords do not match')
        return;
      }
    // }else {
    //   // alert('invalid otp');
    //   return;
    // }
  }


  changeNum(eve){

  }


  setFocus(event,el) {
    // console.log(el,'test meee');
    // console.log(event)
    // if(event.target.value.length >1) {
    //   event.target.value = event.target.value.substring(0,event.target.value.length-1);
    //   event.preventDefault();
    // }else {
      
    //   if (event.keyCode == 8)
    //   return false;
    // else
    if(event.target.value.length)
      el.focus();
    // }
    // document.getElementById('itemtest').focus();
    // event.setFocus();
    // console.log(event.keyCode)
    // let element = event.srcElement.nextElementSibling;
    // console.log(element,'erledfkdfkldjkjfdkljfldjfldfljlj')
   
  }

  backHandle(event,el) {
    // event.focus();
    // let element = event.srcElement.previousElementSibling;
    // if (element == null)
    //   return;
    // else
    //   element.focus();
    // if(event.target.value.length >1) {
    //   event.target.value = event.target.value.substring(0,event.target.value.length-1);
    //   event.preventDefault();
    // }else {
      //   if (event.keyCode == 8)
      //     return false;
      // else
      if(!event.target.value.length)
        el.focus();
    // }
  
  }

  setInput(event) {
    if(event.target.value.length >1) {
      event.target.value = event.target.value.substring(0,event.target.value.length-1);
    }
  }

  



}
