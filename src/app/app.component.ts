import { Component,ViewEncapsulation} from '@angular/core';
import {LoginServiceService} from "./login/login-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None  // <-- Disable encapsulation

})
export class AppComponent {
  title = 'complaint-management-system';

  credentials = { username: '', password: '' };

  constructor(private authService: LoginServiceService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);  // Navigate to a protected route on successful login
      },
      error: (err) => console.error('Login failed', err)
    });
  }

}
