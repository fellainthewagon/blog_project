import { Component, OnInit } from '@angular/core';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';
import { map, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  //@ts-ignore
  dataSource: UserData = null;
  columnsToDisplay: string[] = ['id', 'name', 'username', 'email', 'role'];
  //@ts-ignore
  pageEvent: PageEvent;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  /**
   *       SETUP FIRST DATA
   */

  initDataSource() {
    this.userService
      .findAll(1, 3)
      .pipe(
        tap((users) => console.log(users)),
        map((userData: UserData) => (this.dataSource = userData))
      )
      .subscribe();
  }

  /**
   *       PAGINATION
   */

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;

    this.userService
      .findAll(page, size)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }
}
