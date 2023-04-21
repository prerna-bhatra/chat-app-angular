import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authData = localStorage.getItem('auth_chat') || '';

  items: MenuItem[] = [];
  isLoggedIn: boolean = false;

  constructor(private service: ConfigService) {
    this.service.isUserLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    console.log({ authchat: this.authData });
    console.log({ authData: this.authData.length });

    if (this.authData.length > 1) {
      const parsedData = JSON.parse(this.authData);

      if (parsedData.isLoggedIn) {
        this.isLoggedIn = true;
        this.items = [
          {
            label: 'Home',
            icon: 'pi  pi-home',
            routerLink: ['/'],
          },
        ];
      }
    } else {
      this.items = [
        {
          label: 'Home',
          icon: 'pi  pi-home',
          routerLink: ['/'],
        },

        {
          label: ' Sign-in',
          routerLink: ['/login'],
          // icon: 'pi  pi-sign-in',
        },
        {
          label: '    Sign-up',
          routerLink: ['/signup'],
          // icon: 'pi pi-fw pi-sign-up',
        },
      ];
    }
  }

  //isLoggedIn is true then this.item =[]
}
