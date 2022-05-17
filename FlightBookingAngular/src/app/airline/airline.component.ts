import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AirlineService } from '../airline.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {

  constructor(private airline :AirlineService, private toast:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.GetAllAirline();
  }
  displayedColumns: string[] = ['name','contact','address','status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetAllAirline(){
      this.airline.GetAllAirlines()
    .subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(res);
        //console.log(res[0].startDateTime);
      },
      error:(err:any)=>
      {
        // alert("something went wrong");
        this.toast.error("Something went wrong")
      }
      })
  }

  BlockAirline(id:number){
     this.airline.BlockAirline(id)
    .subscribe({
      next:(res:any)=>{
        this.toast.error("Airline Blocked");
        // alert("Airline Blocked");
          this.GetAllAirline();
      },
      
      error:(err:any)=>
      {
        this.toast.error("Something went wrong")
        // alert("something went wrong");
      }
      })
  }

  UnblockAirline(id:number){
     this.airline.UnblockAirline(id)
    .subscribe({
      next:(res)=>{
        this.toast.success("Airline Unblocked");
        // alert("Airline Unlocked successful");
          this.GetAllAirline();
      },
      
      error:(err)=>
      {
        this.toast.error("Something went wrong")

        // alert("something went wrong");
      }
      })
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  
  isAdmin(){
    if(localStorage.getItem('isAdmin')==="Y")
       return true;
    else   
       return false;
  }

  isUser(){
    //console.log(localStorage.getItem('isAdmin'));
    if(localStorage.getItem('isAdmin')==="N")
       return false;
    else   
       return true;
  }

}
