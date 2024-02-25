import { CanActivate, Router, UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BasicAuthService } from './basic-auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private service = inject(BasicAuthService)
  private router = inject(Router);

  canActivate(): boolean | UrlTree  {
    if (this.service.isAuthenticated) {
      return true;
    }

    return this.router.parseUrl('/auth/login');
  }
}


// export function authenticationGuard(): CanActivateFn {
//   return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//
//     const isAuthenticated = inject(BasicAuthService).isAuthenticated;
//     if (isAuthenticated) {
//       return true;
//     }
//
//     const router = inject(Router);
//     return router.parseUrl('/auth/login');
//   }
// }
