import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authData = localStorage.getItem('auth_chat') || '';

  items: MenuItem[] = [];
  isLoggedIn: boolean = false;

  constructor(private service: ConfigService, private router: Router) {
    this.service.isUserLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this.checkLogin();

    this.service.isUserLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;

      this.items = [
        {
          label: 'Home',
          icon: 'pi  pi-home',
          routerLink: ['/'],
        },
        {
          label: ' Sign-in',
          visible: !this.isLoggedIn,
          routerLink: ['/login'],
        },
        {
          label: '    Sign-up',
          routerLink: ['/signup'],
          visible: !this.isLoggedIn,
        },
        {
          label: 'logout',
          command: (event?: any) => {
            localStorage.removeItem('auth_chat');
            this.service.isUserLoggedIn.next(false);
            this.router.navigate(['/login']);
          },
          styleClass: 'logout-class',
          visible: this.isLoggedIn,
        },
      ];
    });
  }

  checkLogin() {
    if (localStorage.getItem('auth_chat')) {
      // this.isLoggedIn = true;
      this.service.isUserLoggedIn.next(true);
    } else {
      // this.isLoggedIn = false;
      this.service.isUserLoggedIn.next(false);

      //  this.router.navigate(['/login']);
    }
  }

  //isLoggedIn is true then this.item =[]
}
