import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http: HttpClient,private router:Router) { }
  readonly BaseURL = 'http://localhost:5002/api/v1.0/flight';


  PostUser(data:any){
    return this.http.post<any>("http://localhost:5004/api/v1.0/flight/airline/Register/Registeruser",data);
  }

  LoginUser(data:any){
    
    return this.http.post<any>("http://localhost:5002/api/v1.0/flight/Admin/Login/Login",data);
  }    
}
