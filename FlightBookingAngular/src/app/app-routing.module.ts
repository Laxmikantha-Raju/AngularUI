import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AirlineComponent } from './airline/airline.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FlightsheduleComponent } from './flightshedule/flightshedule.component';
import { FlightshedulelistComponent } from './flightshedulelist/flightshedulelist.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},     //finish -
  {path:'login',component:LoginComponent},            //finish -
  {path:'signup',component:RegisterUserComponent},    //finish -
  {path:'home', component:UserHomeComponent,canActivate:[AuthGuard] },      //finish -
  {path:'homes', component:AdminHomeComponent,canActivate:[AuthGuard] },    //finish -

  {path:'manageAirline',component:AirlineComponent,canActivate:[AuthGuard]},  //finish -
  {path:'viewAirlines',component:FlightsheduleComponent,canActivate:[AuthGuard]},
  {path:'flightlist',component:FlightshedulelistComponent},
  {path:'addbooking',component:BookingDialogComponent,canActivate:[AuthGuard]},   //done -
  {path:'bookingHistory',component:BookingComponent,canActivate:[AuthGuard]}, //done -

  {path:'contacts',component:ContactsComponent,canActivate:[AuthGuard]},
  { path:'**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
