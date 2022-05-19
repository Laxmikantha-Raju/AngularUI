import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlightsheduleService } from '../flightshedule.service';
import { ToastrService } from 'ngx-toastr';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-flightshedulelist',
  templateUrl: './flightshedulelist.component.html',
  styleUrls: ['./flightshedulelist.component.css'],
  providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class FlightshedulelistComponent implements OnInit {

  public flightForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private router:Router,
    private toast:ToastrService,
    private flight:FlightsheduleService,
    private dialogRef: MatDialogRef<FlightshedulelistComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }
  gender=['Male','Female'];
  date1:Date; 
  date2:Date; 
  str1:string; 
  str2:string; 
  actionBtn:string ='save';

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      flightNumber:['',Validators.required],
      flightFromPlace:['',Validators.required],
      flightToPlace:['',Validators.required],
      flightStartDateTime :['',Validators.required],
      flightEndDateTime:[''],
      flighScheduleDays:[''],
      flightInstrumentUsed:['',Validators.required],
      flightBusinessClassSeat:['',Validators.required],
      flightEconomyClassSeat:['',Validators.required],
      flightTicketCost:['',Validators.required],
      flightIsActiveYN:['',Validators.required]
    }),
    console.log(this.editData);

    if(this.editData!=null){
      console.log("yes");
      this.actionBtn ='update';
      this.flightForm.controls['flightNumber'].setValue(this.editData.flightNumber);
      this.flightForm.controls['flightFromPlace'].setValue(this.editData.flightFromPlace);
      this.flightForm.controls['flightToPlace'].setValue(this.editData.flightToPlace);
      this.flightForm.controls['flighScheduleDays'].setValue(this.editData.flighScheduleDays);
      this.flightForm.controls['flightInstrumentUsed'].setValue(this.editData.flightInstrumentUsed);
      this.flightForm.controls['flightBusinessClassSeat'].setValue(this.editData.flightBusinessClassSeat);
      this.flightForm.controls['flightEconomyClassSeat'].setValue(this.editData.flightEconomyClassSeat);
      this.flightForm.controls['flightTicketCost'].setValue(this.editData.flightTicketCost);
      this.flightForm.controls['flightStartDateTime'].setValue(this.editData.flightStartDateTime);
      this.flightForm.controls['flightEndDateTime'].setValue(this.editData.flightEndDateTime);
      this.flightForm.controls['FlightIsActiveYN'].setValue(this.editData.FlightIsActiveYN);
    }

  }

  
  addFlight(){
    console.log(this.editData);
    if(!this.editData){
    console.log(this.flightForm.value);
    this.date1 = this.flightForm.get('flightStartDateTime')?.value; //check
    // this.flightForm.get('flightStartDateTime')?.setValue(this.date1.toISOString()); //check
    this.flightForm.get('flightStartDateTime')?.setValue(this.date1); //check
    this.date2 = this.flightForm.get('flightEndDateTime')?.value; //check
    //this.flightForm.get('flightEndDateTime')?.setValue(this.date2.toISOString()); //check
    this.flightForm.get('flightEndDateTime')?.setValue(this.date2); //check


    if(this.flightForm.valid){
      this.flight.PostFlight(this.flightForm.value)
      .subscribe({
        next:(res) =>{
          console.log(res);
          
          this.toast.success("Flight added successfully")
          this.flightForm.reset();
          this.dialogRef.close('save');
       },
       error:()=>{
         this.toast.error("Error occured")
       }
     })
      }
    }
    else{
      
      console.log(this.flightForm);
      this.updateFlight();
    }
  //  console.log(this.flightForm.value);
  }
  updateFlight(){
    this.flight.UpdateFlights(this.flightForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        
        this.toast.success("Flight updated successfully")
        this.flightForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        this.toast.error("Error occured");
      }
      
    })
  }

}

