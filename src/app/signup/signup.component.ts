import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = { username: '', password: '', confirm_password:'' };

  constructor(private authService: AuthService, private router: Router) { }
  login(){
    this.router.navigate(['login']);}

  signup(){
    this.authService.userSignup(this.user.username, this.user.password, this.user.confirm_password).subscribe(
      (response: any) => {
      this.router.navigate(['login']);
    },
    (error) =>{
    if (error.status === 400){
      this.router.navigate(['invalid-data']);
    }}
  );}
}
