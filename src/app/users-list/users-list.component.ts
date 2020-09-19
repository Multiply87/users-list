import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
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
  username: string;
  name: string;
  role: string;
  selectedList: User[];

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

  addUser() {
    if (!this.username || !this.name || !this.role) {
      alert("Заполнены не все поля");
      return;
    }
    this.name = this.name[0].toUpperCase() + this.name.substring(1);
    this.username = this.username[0].toUpperCase() + this.username.substring(1);
    this.usersService.addUser({
      id: this.usersService.generateId(),
      name: this.name,
      username: this.username,
      email: '',
      role: this.role,
      phone: '',
      website: '',
    });

    this.usersList = this.usersService.getUsersList();
  }

  deleteUsers() {
    this.usersService.deleteUsers(this.selectedList);
    this.usersList = this.usersService.getUsersList();
    console.log(this.usersList);
  }

  selectItem(users: MatListOption) {
    this.selectedList = Array.prototype.map.call(users, user => user._value);
  }
}
