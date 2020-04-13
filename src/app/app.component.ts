import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
