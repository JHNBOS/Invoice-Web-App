import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import User from './models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('signedInUser')) {
            const user = JSON.parse(sessionStorage.getItem('signedInUser')) as User;
            const roles = route.data['roles'] as Array<number>;

            if (roles != null && roles.length > 0) {
                if (roles.indexOf(user.role_id) !== -1) {
                    return true;
                }
            }
        }

        // Not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
