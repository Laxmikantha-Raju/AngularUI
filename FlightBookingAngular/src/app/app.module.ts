import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { UserService } from './shared/user.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AirlineComponent } from './airline/airline.component';
import { FlightsheduleComponent } from './flightshedule/flightshedule.component';
import { FlightshedulelistComponent } from './flightshedulelist/flightshedulelist.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { ContactsComponent } from './contacts/contacts.component';

import { AuthGuard } from './auth.guard';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatMomentDateModule } from '@angular/material-moment-adapter'; 
import {MatSortModule} from '@angular/material/sort';
import {MAT_DATE_FORMATS, DateAdapter,MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    RegisterUserComponent,
    UserHomeComponent,
    AdminHomeComponent,
    AirlineComponent,
    BookingComponent,
    BookingDialogComponent,
    FlightsheduleComponent,
    FlightshedulelistComponent,
    ContactsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [UserService,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
