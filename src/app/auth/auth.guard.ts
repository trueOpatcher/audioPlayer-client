import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { RealmAuthService } from "./realmAuth.service";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate {
    constructor(
                private router:Router,
                private realmAuthService: RealmAuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        
        // check if user login 
        return this.realmAuthService.authStatus.pipe(
            take(1),
            map(authStatus => {
              const isAuth = !!authStatus;
                if(isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
                
            })
        );
        
    }
    
}