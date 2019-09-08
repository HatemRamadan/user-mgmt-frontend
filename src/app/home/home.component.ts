import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication-service';
import {GroupService} from '../services/group-service';
import {UserService} from '../services/user-service';
import {first} from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role = this.authenticationService.currentUserValue===null?"":this.authenticationService.currentUserValue.role; 
  isLoggedIn = this.role!=="";
  // isLoggedIn=true;
  groups="";
  users="";
  homeReady=false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private groupService:GroupService,
    private userService:UserService) {
   }

  ngOnInit() {
    this.getNumOfGroups();
    this.getNumOfUsers();
    
  }

  navToLogin(){
    this.router.navigate(["login"]);
  }
  navToProfile(){
    if(this.authenticationService.currentUserValue.role==="admin")
      this.router.navigate(["admin"]);
    else
      this.router.navigate(["user"]);  
  }

  getNumOfGroups(){
    this.groupService.getNumOfGroups().pipe(first()).subscribe(
      data=>{
        this.groups=data.message;
        this.homeReady=this.users!=="";
      },
      error=>{

      }
    )
  }
  getNumOfUsers(){
    this.userService.getNumOfUsers().pipe(first()).subscribe(
      data=>{
        this.users=data.message;
        this.homeReady=this.groups!=="";
      },
      error=>{

      }
    )
  }

logout(){
  this.authenticationService.logout();

  this.ngOnInit();
}
}
