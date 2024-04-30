import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../models/user.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  serverUrl:string="http://localhost:8080";
  getAllUsers(){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.serverUrl+"/users",{"headers": headers}).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error:HttpErrorResponse) {
    if(error.status===0){
      console.error("Se ha producido un error:",error.error);
    }
    else{
      console.error("Se retornó el código de estado",error.status,error.error);
    }
    return throwError(()=> new Error("Hubo un problema. Inténtelo de nuevo"));
  }
}
