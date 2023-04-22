import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IEUserDetails } from '../signup/signup';
import { ConfigService } from '../config.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { IEMessage } from './chat';
import { IEAvailableRoom } from '../rooms/rooms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  authData = localStorage.getItem('auth_chat') || '';
  parsedAuthDetails: IEUserDetails = {
    fullname: '',
    username: '',
    access_token: '',
  };

  userDetails: any = {
    sub:'',
    _id: '',
    fullname: '',
    username: '',
  };

  messages: IEMessage[] = [];
  roomDetails: IEAvailableRoom = {
    _id: '',
    name: '',
  };

  message: string = '';

  subscription: Subscription | undefined;

  constructor(
    private config_service: ConfigService,
    private router: ActivatedRoute,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    if (this.authData.length > 1) {
      const parsedData = JSON.parse(this.authData);
      this.parsedAuthDetails = parsedData;

      this.userDetails = this.config_service.getAuthDetails(
        this.parsedAuthDetails.access_token
      );
      

      if (parsedData.isLoggedIn) {
        this.subscription = this.router.params.subscribe((params: any) => {
          this.roomDetails.name = params.roomName;
          this.roomDetails._id = params.roomId;
          const roomId = params.roomId;
          const emitchatroom = this.socket.emit('enter-chat-room', {
            roomId,
            nickname: this.userDetails.fullname,
          });
          this.config_service.getMessagesByRoomId(roomId).subscribe((data) => {
            if (data.isError) {
              alert(data.err);
            } else {
              this.messages = data.result;
              console.log({ msgs: this.messages });
            }
          });
        });

        this.socket.on('message', (message: IEMessage) => {
          this.messages.push(message);
        });
      }
    }
  }

  sendMessage() {
    this.socket.emit('add-message', {
      text: this.message,
      room: this.roomDetails._id,
      ownerId: this.userDetails.sub,
    });
    this.message = '';

    const element = document.getElementsByClassName("chat-area")[0];
    element.scrollTop = element.scrollHeight+1000
  }
}
