import { Component, OnInit } from '@angular/core';
import { userModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  constructor(private userService:UserService){
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response)=>{
      const res =  response as Array<userModel>; 
      this.users=res;
    });
    
  }
  users:Array<userModel>=[];
  

}
