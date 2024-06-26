import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../models/user.model';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { authResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient:HttpClient) {
    
    
  }
  currentUserLogin:boolean=false;
  token:string="";
  serverUrl:string="http://localhost:8080";
  login(username:string, password:string){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.serverUrl+"/auth/login",{"username":username,"password":password},{"headers": headers}).pipe(
      tap((response => {
        const res =  response as authResponse; 
        if(res.body.token!=undefined){
          sessionStorage.setItem("token",res.body.token);
          this.token=res.body.token;
          this.currentUserLogin=true;
        }
       

      })),
      catchError(this.handleError)
    );
    
  }
  logout():void{
    sessionStorage.removeItem("token");
    this.token="";
    this.currentUserLogin=false;

  }
  getToken(){
    return sessionStorage.getItem("token");
  }
  islogin(){
    return sessionStorage.getItem("token");
  }

  register(user:userModel){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.serverUrl+"/auth/register",user,{"headers": headers})
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
