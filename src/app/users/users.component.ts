import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  usersReady = this.users.length !== 0;
  user2: User = {
    "username": "",
    "role": "",
    "name": "",
    "email": "",
    "deleted": false
  };
  isAdmin = false;
  originalUser: User;
  errors = false;
  showSaved = false;
  showDeleted = false;
  deleted = false;
  done = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().pipe(first())
      .subscribe(
        data => {
          this.users = data;
          this.usersReady = true;
        },
        error => {
          console.log(error);
        });
    this.showSaved = false;
    this.showDeleted = false;
    this.done=false;
    this.user2 = {
      "username": "",
      "role": "",
      "name": "",
      "email": "",
      "deleted": false
    };
  }

  editUser(user: User) {
    this.user2 = JSON.parse(JSON.stringify(user));
    this.originalUser = user;
    this.isAdmin = this.user2.role === "admin";
    this.deleted=user.deleted;
  
  }
  saveChanges() {

      this.userService.editUser(this.user2, this.originalUser.username).
        pipe(first()).
        subscribe(
          data => {
            this.showSaved=true;
            setTimeout(() => {
              this.showSaved=false;
            },2000);
          },
          error => {
            this.errors = true;
          });
  }
  deleteUser() {
    this.userService.deleteUser(this.originalUser.username).pipe(first()).subscribe(
      data => {
        this.showDeleted = true;
        setTimeout(() => {
          this.showDeleted=false;
        }, 2000);
      },
      error => {
        this.errors = true;
      });
  }
  undoDeleteUser(){
    this.userService.undoDeleteUser(this.originalUser.username).pipe(first()).subscribe(
      data => {
        this.done = true;
        setTimeout(()=>{this.done = false;},2000);
      },
      error => {
        this.errors = true;
      });
  }
  closeModal() {
    this.ngOnInit();
  }
  addUser(){
    this.user2.role=this.isAdmin?"admin":"user";
    this.userService.addUser(this.user2).pipe(first()).subscribe(
      data => {
        this.showSaved = true;
        setTimeout(() => {
          this.showSaved=false;
        },2000);
      },
      error => {
        this.errors = true;
      });
  }
  getStyle(id:number){
    if(id%4==0)
    return "assets/p0.jpg";

    if(id%2==0)
    return "assets/p2.png";

    if(id%3==0)
    return "assets/p1.jpeg";
    
    return "assets/p3.jpg";

  }
}
