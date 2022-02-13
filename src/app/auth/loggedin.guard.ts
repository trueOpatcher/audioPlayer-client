import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { map, Observable, take } from "rxjs";
import { RealmAuthService } from "./realmAuth.service";


@Injectable({providedIn:'root'})

export class LoggedinGuard implements CanActivate {
    constructor(private realmAuthService: RealmAuthService,
                private router: Router) {

    }

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // let isAuth = this.realmAuthService.authStatus.;
        // onsole.log('auth guard', isAuth);
        // let isAuth = false;
        // if(isAuth){
        //    return false;
        // } else {
        //     return true;
        // }
        return this.realmAuthService.authStatus.pipe(
            take(1),
            map(authStatus => {
              const isAuth = !!authStatus;
                if(isAuth) {
                    return false;
                }
                return true;
                
            })
        );
    }

}