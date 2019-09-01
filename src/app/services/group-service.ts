import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from '../models/group';
import { User } from '../models/user';
import {Status} from '../models/status';

@Injectable({ providedIn: 'root' })
export class GroupService {
    constructor(private http: HttpClient) { }
    getGroups(){
        return this.http.get<Group[]>("http://localhost:8880/groups");
    }
    getMembers(id:number){
        return this.http.get<User[]>("http://localhost:8880/groups/"+id);
    }
    deleteGroup(id:number){
        return this.http.delete<Status>("http://localhost:8880/group/"+id);
    }
    addGroup(group:Group){
        return this.http.post<Status>("http://localhost:8880/group",group);
    }
    addUserToGroup(username:string,groupId:number){
        return this.http.put<Status>("http://localhost:8880/move",{"username":username, "newGroupID":groupId});
    }
    removeUser(username:string,groupId:number){
        return this.http.put<Status>("http://localhost:8880/move",{"username":username, "oldGroupID":groupId});
    }
    getMyGroups(){
        return this.http.get<Group[]>("http://localhost:8880/myGroups");
    }
    getNumOfGroups(){
        return this.http.get<Status>("http://localhost:8880/groupsNum");
    }
}