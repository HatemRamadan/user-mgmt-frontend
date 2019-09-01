import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ViewEncapsulation} from '@angular/core';

import { AuthenticationService } from './services/authentication-service';
import { User } from './models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html',styleUrls:['app.component.css'],encapsulation: ViewEncapsulation.None })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
