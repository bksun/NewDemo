import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { HomeComponent } from '../home/home.component';
import { SubpostComponent } from '../posts/subpost/subpost.component';
import { AuthServiceService } from '../auth-service.service';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'subcat', component: SubpostComponent}, 
  { path: 'create', component: PostCreateComponent}, // , canActivate: [AuthServiceService] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthServiceService]
})


export class AppRoutingModule { }
