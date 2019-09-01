import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication-service';
import {UserService} from '../services/user-service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../models/user';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  margin =0;
  width=0;
  username="";
  username2="";
  name="";
  name2="";
  email="";
  email2="";
  editMode=false;
  editNameMode=false;
  editUsernameMode=false;
  editEmailMode=false;
  showProfile=true;
  user:User={
    "username": "",
    "role": "",
    "name": "",
    "email": "",
    "deleted": false
  };
  
  constructor(private authenticationService:AuthenticationService, private userService:UserService, private router:Router) { }

  ngOnInit() {
  this.username=this.authenticationService.currentUserValue.username;
  this.name=this.authenticationService.currentUserValue.name;
  this.email=this.authenticationService.currentUserValue.email;
  this.name2 = this.name;
  this.username2 = this.username;
  this.email2 = this.email;
  this.user= JSON.parse(JSON.stringify(this.authenticationService.currentUserValue));  
}

  logout(){
    this.authenticationService.logout();
  }
  closeEditSideMenu(){
    this.width=0;
    this.margin=0;
  }
  openManageSideMenu(){
    this.width=250;
    this.margin=250;
  }
  showEditUsername(){
    this.editUsernameMode = !this.editUsernameMode;
  }
  showEditEmail(){
    this.editEmailMode = !this.editEmailMode;
  }
  showEditName(){
    this.editNameMode = !this.editNameMode;
  }
  enableEdit(){
    this.editMode =!this.editMode;
  }

  saveEditName(){
    this.user.name=this.name2
    delete (this.user.authdata);
    this.userService.editUser(this.user,this.username)
    .pipe(first())
          .subscribe(
              data => {
                  this.authenticationService.currentUserValue.name=this.name2;
                  localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.currentUserValue));
                  this.name=this.name2;
                  this.editNameMode=false;
                  this.editMode=false;
              },
              error => {
                  console.log(error);
              });
  }

  saveEditUsername(){
    delete (this.user.authdata);
    this.user.username=this.username2;
    this.userService.editUser(this.user,this.username)
    .pipe(first())
          .subscribe(
              data => {
                  this.authenticationService.currentUserValue.username=this.username2;
                  this.username= this.username2;
                  localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.currentUserValue));
                  this.editUsernameMode=false;
                  this.editMode=false;
                  this.authenticationService.logout();
                  this.router.navigate(["home"]);
              },
              error => {
                  console.log(error);
              });
  }

  saveEditEmail(){
    delete (this.user.authdata);
    this.user.email = this.email2;
    this.userService.editUser(this.user,this.username)
    .pipe(first())
          .subscribe(
              data => {
                  this.authenticationService.currentUserValue.email=this.email2;
                  localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.currentUserValue));
                  this.email=this.email2;
                  this.editEmailMode=false;
                  this.editMode=false;
              },
              error => {
                  console.log(error);
              });
  }
  navToShowUsers(){
    this.router.navigate(["admin/users"]);
    this.showProfile=false;
  }

  navToShowGroups(){
    this.router.navigate(["admin/groups"]);
    this.showProfile=false;
  }

  navToEditMyProfile(){
    this.router.navigate(["admin"]);
    this.showProfile=true;
    this.enableEdit();
  }

}
