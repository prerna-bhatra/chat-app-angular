import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { IEAvailableRoom } from '../rooms/rooms';
import { Socket } from 'ngx-socket-io';
import { IEUserData, IEUserDetails } from '../signup/signup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  authData = localStorage.getItem('auth_chat') || '';
  parsedAuthDetails: IEUserDetails = {
    fullname: '',
    username: '',
    access_token: '',
  };

  userDetails: any = {
    _id: '',
    fullname: '',
    username: '',
  };

  roomName: string = '';
  rooms: IEAvailableRoom[] = [];

  isLoggedIn: boolean = false;

  constructor(
    private config_service: ConfigService,
    private socket: Socket,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authData.length > 1) {
      const parsedData = JSON.parse(this.authData);
      this.parsedAuthDetails = parsedData;

      if (parsedData.isLoggedIn) {
        this.isLoggedIn = true;

        this.config_service.rooms().subscribe((data) => {
          if (data.isError) {
            alert(data.err);
          } else {
            this.rooms = data.result;
          }
        });
      }
    }
  }

  addRoom() {
    if (this.roomName.trim().length > 5) {
      this.config_service.addRoom({ name: this.roomName }).subscribe((data) => {
        if (data.isError) {
          alert(data.err);
        } else if (!data.isError) {
          this.rooms.unshift({
            _id: data.result._id,
            name: data.result.name,
          });
          alert('successfully created room ');
        }
      });
    } else {
      alert('please enter room name wih min 5 letters');
    }
  }

  joinRoom(roomId: string, roomName: string) {
    this.router.navigate([`/chat-room`, { roomId, roomName }]);
  }
}
