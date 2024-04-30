import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { userModel } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService:AuthService){
    
  }
  ngOnInit(): void {
  }
  register(form:NgForm){
    const user:userModel=
    {
      username:form.value.username,
      password:form.value.password,
      name:form.value.name,
      lastname:form.value.lastname,
      email:form.value.email
    }

    this.authService.register(user).subscribe(response =>{
      console.log(response);
    });
  }

}
