import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { User } from '../models/user';
import { UserService } from '../services/user-service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from "../services/group-service";
import { Group } from '../models/group';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username = "";
  username2 = "";
  name = "";
  name2 = "";
  email = "";
  email2 = "";
  editMode = false;
  editNameMode = false;
  editUsernameMode = false;
  editEmailMode = false;
  showProfile = true;
  groupsReady = false;
  showMyGroups = false;
  groups: Group[] = [];
  user: User = {
    "username": "",
    "role": "",
    "name": "",
    "email": "",
    "deleted": false
  };
  users=[];

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private groupService: GroupService) { }

  ngOnInit() {
    this.username = this.authenticationService.currentUserValue.username;
    this.name = this.authenticationService.currentUserValue.name;
    this.email = this.authenticationService.currentUserValue.email;
    this.name2 = this.name;
    this.username2 = this.username;
    this.email2 = this.email;
    this.user = JSON.parse(JSON.stringify(this.authenticationService.currentUserValue));
    this.groupsReady = false;
    this.showMyGroups = false;
    this.users=[];
  }

  logout() {
    this.authenticationService.logout();
  }

  showEditUsername() {
    this.editUsernameMode = !this.editUsernameMode;
  }
  showEditEmail() {
    this.editEmailMode = !this.editEmailMode;
  }
  showEditName() {
    this.editNameMode = !this.editNameMode;
  }
  enableEdit() {
    this.showProfile=true;
    this.showMyGroups=false;
    this.groupsReady=false;
    this.editMode = !this.editMode;
  }
  showGroups() {
    this.showMyGroups = !this.showMyGroups;
    if (!this.showMyGroups){
      this.groupsReady=false;
      this.showProfile = true;
    }
    else {
      this.editMode=false;
      this.showProfile = false;
      this.groupService.getMyGroups().pipe(first()).subscribe(
        data => {
          this.groupsReady = true;

          this.groups = data;

        },
        error => {

        }
      )
    }
  }
  saveEditName() {
    this.user.name = this.name2
    delete (this.user.authdata);
    this.userService.editUser(this.user, this.username)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.currentUserValue.name = this.name2;
          localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.currentUserValue));
          this.name = this.name2;
          this.editNameMode = false;
          this.editMode = false;
        },
        error => {
          console.log(error);
        });
  }

  saveEditUsername() {
    delete (this.user.authdata);
    this.user.username = this.username2;
    this.userService.editUser(this.user, this.username)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.currentUserValue.username = this.username2;
          this.username = this.username2;
          localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.currentUserValue));
          this.editUsernameMode = false;
          this.editMode = false;
          this.authenticationService.logout();
          this.router.navigate(["home"]);
        },
        error => {
          console.log(error);
        });
  }

  saveEditEmail() {
    delete (this.user.authdata);
    this.user.email = this.email2;
    this.userService.editUser(this.user, this.username)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.currentUserValue.email = this.email2;
          localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.currentUserValue));
          this.email = this.email2;
          this.editEmailMode = false;
          this.editMode = false;
        },
        error => {
          console.log(error);
        });
  }
  showMembers(groupID:number){
    this.groupService.getMembers(groupID)
    .pipe(first())
    .subscribe(
      data =>{
        this.users = data;
      },
      error =>{

      }
    )
  }
  closeModal(){
    this.users=[];
  }
  getStyle(id:number){
    if(id%2==0)
      return {"background-image": "url(\"assets/n0.jpg\")"};

      if(id%3==0)
      return {"background-image": "url(\"assets/n1.jpg\")"};
      
      return {"background-image": "url(\"assets/n2.jpg\")"};
    
    
  }
}
