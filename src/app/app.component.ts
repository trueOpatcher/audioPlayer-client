import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { RealmAuthService } from './auth/realmAuth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular Player';
  loading = false;
  
  constructor (
    private realmAuthService: RealmAuthService,
    private router: Router) {
      this.router.events.subscribe((event: Event) => {
        if(event instanceof NavigationStart){
          this.loading = true;
      }
      if(event instanceof NavigationCancel) {
          this.loading = false;
      }
      if(event instanceof NavigationError) {
          this.loading = false;
      }
      if(event instanceof NavigationEnd) {
          this.loading = false;
      }
      });
   
  }

 

  ngOnInit(): void {
    this.realmAuthService.autoLogin();
    console.log('autoLogin 2');
  }

  

}
