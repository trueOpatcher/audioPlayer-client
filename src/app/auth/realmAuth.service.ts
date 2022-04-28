import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as Realm from "realm-web";
import { BehaviorSubject, catchError, firstValueFrom, lastValueFrom, map, Observable, of, ReplaySubject, take, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user.model";




@Injectable({providedIn: 'root'})




export class RealmAuthService {
    signMode = new BehaviorSubject<boolean>(false);
    

    private SERVER_URL = environment.serverUrl;
    
    private app: Realm.App = new Realm.App ({id: "musicplayer-gxlig"});
    

    authStatus = new BehaviorSubject<boolean>(false);

    constructor(private router: Router,
                private http: HttpClient) {
   
    }

    login(email: string, password: string) {
    console.log('in login');
        
        
        return this.http.post<any>(this.SERVER_URL + '/auth/login', {
            email: email,
            password: password
        }, {observe: 'response', withCredentials: true});
            
            // tap(resData => {
            //     this.responseHandler(
            //         resData.body.profile.data.email,
            //         resData.body.id,
            //         resData.body.accessToken,
            //         resData.body.refreshToken
            //     );
            // })
        
        
    }

    async isUserLoggedin() {
        
    }


    signUp(email: string, password: string, userName: string) {
       return this.http.post(this.SERVER_URL + '/auth/signup', {
            email: email,
            password: password,
            userName: userName
        }, {withCredentials: true});

    }

    async logout() {
        console.log('logout');
        await firstValueFrom(this.http.get(this.SERVER_URL + '/auth/logout', { withCredentials: true })).then(() => {
            console.log('in logout observable');
            localStorage.clear();
            this.authStatus.next(false);
            this.router.navigate(['/auth']);
        }).catch(error => {
            console.log(error);
        });
        
    }


    

    async autoLogin() {
        await firstValueFrom(this.http.get<any>(this.SERVER_URL + '/auth/isAuth',{ withCredentials: true }).pipe(
            map(resData => resData.isAuth)
        )).then(isAuth => {
            console.log('is user auth: ', isAuth);
            this.authStatus.next(isAuth);
            this.router.navigate(['/pages']);
        }).catch(error => {
          console.log(error);
        });

        
        
    }
    
   


}