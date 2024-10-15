import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  // if the user is authenticated, allow access
  if(inject(AuthService).isUserAuthenticated()){
    return true;
  } else{
    inject(Router).navigate(['login']);  // Redirect to login if not authenticated
    return false; // Block access to the route
  }

};

