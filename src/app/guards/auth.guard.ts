import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService, AlertService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  canActivate() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // authorized so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
