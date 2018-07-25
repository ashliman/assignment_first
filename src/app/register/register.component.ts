import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, AbstractControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService} from './register.service';

function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmpassword')

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
      return { invalid: true };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  Regform: FormGroup;
  email:FormControl;
  password:FormControl;
  confirmpassword:FormControl;
  name:FormControl;
  regData:any;

  get cpwd() {
    return this.Regform.get('confirmpassword');
  }

  constructor(private _router: Router, private regServ:RegisterService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();  
    localStorage.clear();
  }

  createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.password = new FormControl('', [Validators.required,Validators.minLength(6)]);
    this.name = new FormControl('', [Validators.required,Validators.minLength(6)]);
    this.confirmpassword=new FormControl('', [passwordConfirming]);
 }

  createForm() {
    this.Regform = new FormGroup({
        email: this.email,
        password: this.password,
        name:this.name,
        confirmpassword:this.confirmpassword,

    });
  }

  onSubmit()
  {
    if (this.Regform.valid) {
      this.regData = this.Regform.value; 
      
      this.regServ.register(this.regData).subscribe(res => {               
          if(res)
          {
            this._router.navigate(['/login']);
          }
          else{
           
          }
        }
      );

      this.Regform.reset();
    }
  }

}
