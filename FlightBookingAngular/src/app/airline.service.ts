import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private http:HttpClient) { }

  

GetAllAirlines(){
  return this.http.get<any>("http://localhost:5008/api/v1.0/flight/search/GetAllAirline");
}

BlockAirline(id:number){
  return this.http.put<any>("http://localhost:5008/api/v1.0/flight/airline/Inventory/BlockAirline/"+id,null)
}

UnblockAirline(id:number){
  return this.http.put<any>("http://localhost:5008/api/v1.0/flight/airline/inventory/UnblockAirline/"+id,null)
}

}
