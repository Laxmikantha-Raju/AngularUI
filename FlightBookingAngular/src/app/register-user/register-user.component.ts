import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public userForm!:FormGroup;
  //gender:string[]=['Male','Female'];
  //constructor(private formBuilder: FormBuilder,private http: HttpClient, private router:Router) { }
  constructor(public service : UserService,
    private fb: FormBuilder,
    private router:Router,
    private user:UserService,private toast:ToastrService){}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      UserFirstName:['',Validators.required],
      UserEmailid:['',[Validators.required,Validators.email]],
      Passwords : this.fb.group({
        UserPassword:['',[Validators.required,Validators.minLength(5)]],
        ConfirmPassword:['',Validators.required]
      },{validator : this.comparePasswords}),
      //Gender:['',Validators.required],
      UserIsAdmin:['false']
    })
  }

  


  comparePasswords(fb: FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if(confirmPasswordCtrl?.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('UserPassword')?.value != confirmPasswordCtrl?.value){
        confirmPasswordCtrl?.setErrors({passwordMismatch:true});
      }
      else{
        confirmPasswordCtrl?.setErrors(null);
      }
    }
  }



  addUser(){
    
    var body = {
      userFirstName: this.userForm.value.UserFirstName,
      userEmailid: this.userForm.value.UserEmailid,
      userIsAdmin: 'N',
      userPassword: this.userForm.value.Passwords.UserPassword
   }
    //console.log(body);
    
    if(this.userForm.valid){
      this.user.PostUser(body)
      .subscribe({
        next:(res:any) =>{
          this.toast.success("User added successfully")
          alert("User added successfully");
          this.userForm.reset();
          this.router.navigate(['/login']);
       },
       error:()=>{
        this.toast.error("Error occured")

       }
     })
      
    }
  }  
}