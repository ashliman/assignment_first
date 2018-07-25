import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService} from './login.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Loginform: FormGroup;
  email:FormControl;
  password:FormControl;
  loginData: any;
  loggedDetails:any;
  showError:boolean=false;

  constructor(private _router: Router, private loginServ:LoginService, private socialAuthService: AuthService) { }

  ngOnInit() {
    this.createForm();
    //this.createForm();  
    localStorage.clear();
  }

  createForm() {
    this.email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.password = new FormControl('', [Validators.required,Validators.minLength(6)]);
    this.Loginform = new FormGroup({
      email: this.email,
      password: this.password
  });
 }

  onSubmit()
  {
    if (this.Loginform.valid) {
      this.loginData = this.Loginform.value; 
      
      this.loginServ.login(this.loginData).subscribe(res => {               
          if(res)
          {
		  if(res.email==this.email.value && res.password==this.password.value){
            localStorage['userProfile']=JSON.stringify(res);
            localStorage.setItem('loginType','custom');
            this._router.navigate(['/dashboard']);
		 this.Loginform.reset(); 
		  }else{
		  this.showError=true;
		  }
          }
          else{
           
          }
        }
      );

     
    }
  }
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else 
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        //console.log(socialPlatform+" sign in data : " , userData);
        localStorage['userProfile']=JSON.stringify(userData);
        localStorage.setItem('loginType','social');
        this._router.navigate(['/dashboard']);
      }
    );
  }

  public socialSignOut() {   
    this.socialAuthService.signOut();
  }

}
