import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { authResponse } from '../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private authService:AuthService, private router:Router){
    
  }
  ngOnInit(): void {
  }
  login(form:NgForm){
    const username=form.value.username;
    const password=form.value.password;
    this.authService.login(username,password).subscribe((response)=>{
      
    });
  }
  register(){
    this.router.navigate(['/register']);
  }

}
