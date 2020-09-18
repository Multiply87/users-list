import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UsersService } from './../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  title = 'Список пользователей';
  constructor(public usersService: UsersService) { }


  ngOnInit(): void {
    this.usersList = this.usersService.getUsersList();
  }

  search(query: string) {
    //console.log(query);
    this.usersList = this.usersService.findUser(query);
  }

  sort(direction: string) {
    console.log(direction);
    this.usersList = this.usersService.sortUsers(direction);
  }
}
