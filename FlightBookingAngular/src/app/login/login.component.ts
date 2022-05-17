import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedError: boolean = false;
  constructor(private fb: FormBuilder,
    private user: UserService,
    private router: Router,
    private toast: ToastrService) { }


  public loginForm!: FormGroup;
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      UserEmailid: [''],
      UserPassword: ['']
    })
  }

  UserLogin() {
    console.log(this.loginForm.value.UserEmailid);
    console.log(this.loginForm.value.UserPassword);

    var body = {
      UserEmailid: this.loginForm.value.UserEmailid,
      UserPassword: this.loginForm.value.UserPassword
    }
    console.log(this.user.LoginUser(body));

    if (this.loginForm.valid) {
      this.user.LoginUser(body)
        .subscribe({
          next: (res: any) => {
            //console.log(res);
            localStorage.setItem('userToken', res.icToken.token);
            localStorage.setItem('userFirstName', res.UserName);
            localStorage.setItem('userId', res.icTblUserDetails[0].userId);
            localStorage.setItem('userEmailid', res.icTblUserDetails[0].userEmailid);
            localStorage.setItem('isAdmin', res.icTblUserDetails[0].userIsAdmin);
            //console.log(localStorage.getItem('email'));
            //alert("Login Success");
            //console.log(localStorage.getItem('isAdmin'));

            if (localStorage.getItem('isAdmin') == "Y") {            
                this.toast.success("Login success")
                this.router.navigate(['/homes'])
              }
              else {
                this.toast.success("Login success")
                this.router.navigate(['/home'])
              }
            

          },
          error: (err: HttpErrorResponse) => {
            this.isLoggedError = true;
            //alert("Incorrect username or password")
            this.toast.error("Enter valid credentials")
          }
        })

    }
  }

  rememberMe() {

  }

}
