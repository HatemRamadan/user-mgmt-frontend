import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';
const routes: Routes = [
   
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
        children:[
            {path:"users", component: UsersComponent},
            {path:"groups", component: GroupsComponent}
        ]},
    { path: 'user', component: UserComponent,canActivate: [AuthGuard]},
    { path: '', component:HomeComponent},

     // otherwise redirect to home
     { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
export const routingComponents = [LoginComponent,AdminComponent,HomeComponent,UserComponent,UsersComponent,GroupsComponent];