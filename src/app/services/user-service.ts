import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { User } from '../models/user';
import {Status} from '../models/status';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAllUsers() {
        return this.http.get<User[]>("http://localhost:8880/");
    }
    editUser(user:User,username:string){
        return this.http.put<Status>("http://localhost:8880/update/"+username,user);
    }
   
    deleteUser(username:string){
        return this.http.delete<Status>("http://localhost:8880/user/"+username);
    }
    undoDeleteUser(username:string){
        return this.http.put<Status>("http://localhost:8880/user/"+username,null);
    }
    addUser(user:User){
        return this.http.post<Status>("http://localhost:8880/user",user);
    }
    getNumOfUsers(){
        return this.http.get<Status>("http://localhost:8880/usersNum");
    }
}