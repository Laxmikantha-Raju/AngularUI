import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private router:Router) { }

  ngOnInit(): void {
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
    if(localStorage.getItem('isAdmin')==="Y")
       return false;
    else   
       return true;
  }

}
