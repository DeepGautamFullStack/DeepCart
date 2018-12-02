import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../Services/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class authGuardGuard implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}
 // This tutorial is by DotNet Techy YouTube Channel
    // For more info about channel You can visit this link
    //  https://www.youtube.com/c/dotnettechy

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      //this.router.navigate(['login']);
      console.log('You are not authrised to view this page')
      return false;
    }
    return true;
  }

}
