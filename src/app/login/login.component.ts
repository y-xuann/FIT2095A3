import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }
  login() {
    this.authService.userLogin(this.user.username, this.user.password).subscribe(
      (response: any) => {
        if (response.isAuthenticated) {
          this.authService.updateIsAuthenticated(true)
          this.router.navigate(['dashboard']);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.router.navigate(['invalid-data']);
        }
      }
    );
  }

  signup(){
    this.router.navigate(['signup']);
  }
}
