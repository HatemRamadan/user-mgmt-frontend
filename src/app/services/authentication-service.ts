import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    

    login(username: string, password: string) {
        var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        headers_object.append("Authorization", "Basic " + btoa("admin"+":"+"admin"));
        
        const httpOptions = {
          headers: headers_object
        };
        const headerDict = {
            "Authorization": "Basic " + btoa(username+":"+password),
            'Content-Type': 'application/json',
            'Accept': 'application/json'

          }
          
          const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
          };
        return this.http.get<any>('http://localhost:8880/login',requestOptions)
            .pipe(map(user => {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}