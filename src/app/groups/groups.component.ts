import { Component, OnInit } from '@angular/core';
import {Group} from '../models/group';
import {User} from '../models/user';
import { first } from 'rxjs/operators';
import {GroupService} from '../services/group-service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups:Group[]=[];
  users:User[]=[];
  group2:Group={
    groupid:0,
    description:"",
    name:"",
    users:[]
  };
  groupsReady=false;
  showDeleted=false;
  showSaved=false;
  showError=false;

  username="";
  showUserDeleted=false;

  constructor(private groupService:GroupService) { }

  ngOnInit() {
    this.groupService.getGroups().pipe(first()).subscribe(
      data =>{
        this.groups=data;
        this.groupsReady = true;
      },
      error=>{
        this.showError=true;
      }
    );
    this.showDeleted=false;
    this.showSaved=false;
    this.username="";
    this.showUserDeleted=false;
    this.users=[];
    this.showError=false;
  }
  showMembers(group:Group){
    
    this.group2 = JSON.parse(JSON.stringify(group));
    // this.users=group.users;
    
    this.groupService.getMembers(this.group2.groupid).pipe(first()).subscribe(
      data =>{
        this.users=data;
      },
      error=>{
        this.showError=true;
        setTimeout(() => {
          this.showError=false;
        }, 2000);
      }
    );
  }
  closeModal(){
    this.ngOnInit();
  }
  deleteGroup(){
    this.groupService.deleteGroup(this.group2.groupid).pipe(first()).subscribe(
      data =>{
        this.showDeleted=true;
        var element: HTMLElement = document.getElementById("modalClose");
        element.click();         
      },
      error=>{
        this.showError=true;
        setTimeout(() => {
          this.showError=false;
        }, 2000);
      }
    );
  }
  
  addUser(){
    this.groupService.addUserToGroup(this.username,this.group2.groupid).pipe(first()).subscribe(
      data =>{
        this.showSaved=true;
        setTimeout(() => {
          this.showSaved=false;
        }, 2000);
        this.showMembers(this.group2);
        this.username="";
      },
      error=>{
        this.showError=true;
        setTimeout(() => {
          this.showError=false;
        }, 2000);
      }
    );

  }
  
  addGroup(){
    this.groupService.addGroup(this.group2).pipe(first()).subscribe(
      data =>{      
        var element: HTMLElement = document.getElementById("modal2Close");
        element.click();         
      },
      error=>{
        this.showError=true;
        setTimeout(() => {
          this.showError=false;
        }, 2000);
      }
    );
  }

  removeUser(username:string){
    this.groupService.removeUser(username,this.group2.groupid).pipe(first()).subscribe(
      data =>{   
        this.showMembers(this.group2);
        this.showUserDeleted=true;
        setTimeout(() => {
          this.showUserDeleted=false;
        }, 2000);   
      },
      error=>{
        this.showError=true;
        setTimeout(() => {
          this.showError=false;
        }, 2000); 

      }
    );
  }
}