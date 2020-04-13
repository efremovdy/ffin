import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  templateUrl: 'documents.component.html'
})
export class DocumentsComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authService: AuthService,
    //private userService: UserService
  ) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    //this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  /* deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  } */
}
