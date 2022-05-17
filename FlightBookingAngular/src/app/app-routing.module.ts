import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},     //done -
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegisterUserComponent},    //done -
  {path:'home', component:UserHomeComponent,canActivate:[AuthGuard] },      //done -
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
