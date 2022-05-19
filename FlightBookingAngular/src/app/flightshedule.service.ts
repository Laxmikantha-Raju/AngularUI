import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsheduleService {

  constructor(private http:HttpClient) { }


  PostFlight(data:any){
    return this.http.post<any>("http://localhost:5008/api/v1.0/flight/airline/Inventory/AddInventory",data);
  }
  
  GetAllFlights(){
    return this.http.get<any>("http://localhost:5008/api/v1.0/flight/search/GetAllFlight");
  }

  GetAllUnblockAirline(){
    return this.http.get<any>("http://localhost:5008/api/v1.0/flight/airline/Inventory/UnBlockedAirline");
  }
  
  UpdateFlights(data:any,id:number){
    return this.http.put<any>("http://localhost:5008//api/v1.0/flight/airline/Inventory/UpdateShedule/"+id,data);
  }
  
  DeleteFlights(id:number){
    return this.http.delete<any>("http://localhost:5008/api/v1.0/flight/airline/Inventory/UpdateInventory/"+id);
  }

  GetAllBooking(){
    return this.http.get<any>("http://localhost:5006/api/v1.0/flight/airline/Booking/GetAllBooking");
    
  }

  Bookticket(data:any){
    return this.http.post<any>("http://localhost:5006/api/v1.0/flight/airline/Booking/BookTicket",data);
    
  }

  cancelTicket(id:number){
    return this.http.put<any>("http://localhost:5006/api/v1.0/flight/airline/Booking/CancelById/"+id,null);
  }

  GetDiscountList(){
    return this.http.get<any>("http://localhost:5006/api/v1.0/flight/airline/GetDiscountList");
    
  }


}
