import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightsheduleService } from '../flightshedule.service';
import { FlightshedulelistComponent } from '../flightshedulelist/flightshedulelist.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flightshedule',
  templateUrl: './flightshedule.component.html',
  styleUrls: ['./flightshedule.component.css']
})
export class FlightsheduleComponent implements OnInit {

  displayedColumns: string[] = ['airlineId','fromPlace','toPlace','startDateTime','endDateTime','sheduledDay','instrumentUsed',
  'totalNBCSeats','totalBCSeats','bcTicketCost','nBcTicketCost','mealType','action'];
  dataSource: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog:MatDialog,
    private flight:FlightsheduleService,
    private router:Router,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.getAllFlights();
   // this.showButtonAdmin();
  }

  
  openDialog() {
    this.dialog.open(FlightshedulelistComponent, {
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllFlights();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  editFlight(row:any){
    this.dialog.open(FlightshedulelistComponent,{
        width:'30%',
        data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllFlights();
      }
    });
  }
  

  

  getAllFlights(){
    this.flight.GetAllUnblockAirline()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(res);
        //console.log(res[0].startDateTime);
      },
      error:(err)=>
      {
        alert("something went wrong");
      }

    })
  }
  deleteFlight(id:number){
    this.flight.DeleteFlights(id)
    .subscribe({
      next:(res)=>
      {
        //alert("Deleted successfully");
        this.toast.success("Deleted shedule successfully")
        this.getAllFlights();
      },
      error:()=>
      {
          //alert("some Error occured")
        this.toast.error("Error Occured")
      }

    })
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  openBooking(){
    this.router.navigate(['/booking']);
  }

  addBooking(id:string){
    console.log(id);
    localStorage.setItem('FlightId',id);
    this.router.navigate(['/addbooking']);
    
  }
  
  isAdmin(){
    if(localStorage.getItem('isAdmin')==="Y")
       return true;
    else   
       return false;
  }

  isUser(){
    //console.log(localStorage.getItem('isAdmin'));
    if(localStorage.getItem('isAdmin')==="Y")
       return false;
    else   
       return true;
  }

}
