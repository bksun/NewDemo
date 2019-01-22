import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  email:string;
  constructor(private authServ: AuthServiceService) { }

  ngOnInit() {
    this.authListenerSubs = this.authServ.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      alert('home init');
    });

    const temp = localStorage.getItem('email');
    if( temp !== 'undefined' || temp !== null ) {
      this.email = temp
      console.log('email-home', temp);
    }
    else {
      this.email = 'Test-User';
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    // alert('logout');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    // console.log(localStorage.getItem('user'));
    this.authServ.logout();
  }

}
