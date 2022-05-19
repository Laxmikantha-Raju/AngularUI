import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightsheduleService } from '../flightshedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  
  displayedColumns: string[] = ['PNR','FlightId','EmailId','NoOfSeats',
  'BookingStatus','action'];
  dataSource: MatTableDataSource<any>;
  userFirstName: string|null;
  userId:string|null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private flight:FlightsheduleService,
    private router:Router,
    private toast:ToastrService) {
    this.userFirstName = localStorage.getItem('userFirstName');
    this.userId = localStorage.getItem('userId');
   }

  ngOnInit(): void {
    this.getBooking();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  getBooking(){
    console.log(localStorage.getItem('userFirstName'));
   // this.flight.GetAllBooking(this.userFirstName)
    this.flight.GetAllBooking()
    .subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err:any)=>
      {  
          this.toast.error("Something went wrong");        
      }
    

    })
  }

  
  cancelTicket(id:any){

    //console.log("id is : "+id);
     this.flight.cancelTicket(id).subscribe({
       next:(res:any)=>
         {
          this.toast.info("Ticket Cancelled")
          this.getBooking();
       },
       error:(err:any)=>
       {  
           this.toast.error("Something went wrong, try again later");          
       }

     })
    
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
