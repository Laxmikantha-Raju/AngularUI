import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray, FormGroup,FormControl,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsheduleService } from '../flightshedule.service';
//import { PassengerComponent } from '../passenger/passenger.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent implements OnInit {

  public bookForm!:FormGroup;
  
  constructor(private router: Router,private fb:FormBuilder,private flight:FlightsheduleService,
    private toast:ToastrService) { }

  classtype:Array<string>=['Eco Class','Bis-Class'];
  gender:Array<string>=['Male','Female'];
  discount!: Array<any>;  // check
  mealtype:Array<string>=['Veg','Non Veg'];

  public PassengerList!:FormGroup; // check
  
  ngOnInit(): void {

    //this.getDiscount();

    this.bookForm = this.fb.group({

      bookingNoOfSeatBook:[''],
      bookingFlightNumber:[''],
      ClassType:[''],
      BookingMeal:[''],
      JourneyType:[''],
      userEmailid:[localStorage.getItem('userEmailid')],
      FlightId:[Number(localStorage.getItem('FlightId'))],
      userFirstName:[Number(localStorage.getItem('userFirstName'))],
      userId:[Number(localStorage.getItem('userId'))],
      DiscountId : [1],
      ReturnDate:[''],
      PNR:[''],
      tblPassengers: this.fb.array([])

    })
  }

 
 

 get pass(){
   return this.bookForm.controls["tblPassengers"] as FormArray;
 }

 addPass(){
    const form = this.fb.group({
      PassengerName:[''],
      passengerAge:[''],
      passengerGender:[''],
      passengerSeatNo:[''],
      PassengerIsActiceYn:['Y'],
    });
    this.pass.push(form);
 }

 getFormGroup(control: AbstractControl) { return control as FormGroup; }

 submit(){
     //console.log(this.bookForm.value);
    
     //this.flight.Bookticket(this.bookForm.value).
     let BookingPassengerDetails = {
      tblBookings:[{
        BookingNoOfSeatBook:this.bookForm.value.bookingNoOfSeatBook,
        BookingName:this.bookForm.value.userFirstName,
        BookingEmailId: this.bookForm.value.userEmailid,
        BookingIsActiceYn:'Y',
        BookingMeal:this.bookForm.value.BookingMeal,
        BookingFlightNumber:this.bookForm.value.bookingFlightNumber
      }],
      tblPassengers:this.bookForm.value.tblPassengers
     };
     console.log(BookingPassengerDetails);
     this.flight.Bookticket(BookingPassengerDetails).
     subscribe({
       next:()=>{
         this.toast.success("Booking Completed");
         this.bookForm.reset();
       },
       error:()=>
       {
        this.toast.error("Some Error occured");
       }
       
     })
  }

  backToShedule(){
     this.router.navigate(['/flightschedule']);
  }


  isAdmin(){
    if(localStorage.getItem('isAdmin')==="Y")
       return true;
    else   
       return false;
  }

  isUser(){
    console.log(localStorage.getItem('isAdmin'));
    if(localStorage.getItem('isAdmin')==="Y")
       return false;
    else   
       return true;
  }

  removePass(id:number){
      this.pass.removeAt(id);
  }

  // getDiscount(){
  //   this.flight.GetDiscountList().
  //    subscribe({
  //      next:(res)=>{
  //        console.log(res);
  //        this.discount = res;
  //      },
  //      error:()=>
  //      {
  //       this.toast.error("Some Error occured");
  //      }
       
  //    })
  // }

  addReturnDate(){
    let elem: HTMLElement=(document.getElementById("date")!); // check
    elem.setAttribute("style", "display:inline;");
    
  }

  removeReturnDate(){
    let elem: HTMLElement= (document.getElementById("date")!); // check
    elem.setAttribute("style", "display:none;");
    
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
