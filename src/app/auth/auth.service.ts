import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject, throwError } from "rxjs";
import { User } from "./user.model";


export interface AuthReceiveData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {



constructor(private http: HttpClient,
            private router: Router) {

}

    

    user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    signUp(email: string, password: string) {
        return this.http.post<AuthReceiveData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWDHM4nHlW3kdTjIrxLSsrMrcZ1a3P26o', {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(
            catchError(this.errorHandler),
            tap(resData => {
                
                this.responseHandler(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }


    signIn(email: string, password: string) {
        return this.http.post<AuthReceiveData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWDHM4nHlW3kdTjIrxLSsrMrcZ1a3P26o',
         {
            email: email,
            password: password,
            returnSecureToken: true
         }
         ).pipe(
             catchError(this.errorHandler),
             tap(resData => {
                 console.log(resData);
                 this.responseHandler(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                 );
             })
         );
    }



    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

    }

    autoLogin() {
        const userData: {
            email: string;
            id: string; 
            _token: string;
            _tokenExpirationDate: string;
          } = JSON.parse(localStorage.getItem('userData') || '{}');
          console.log(userData);
          if (!userData) {
            return;
          }

        // const loadedUser = new User(
        //     userData.email,
        //     userData.id,
        //     userData._token,
        //     new Date(userData._tokenExpirationDate)
        // );

        // if(loadedUser.token) {
        //     this.user.next(loadedUser);
        //     const expirationDuration =
        //     new Date(userData._tokenExpirationDate).getTime() -
        //     new Date().getTime();
        //     this.autoLogout(expirationDuration);
        // }
    }

    autoLogout(expirationDur: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDur);
    }

    private responseHandler(
        email: string,
        id: string,
        token: string,
        expiresIn: number
    )   {
        const expirationOfToken = new Date(new Date().getTime() + expiresIn * 1000);
        // const user = new User(email,id,token,expirationOfToken);
        // this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        // localStorage.setItem('userData',JSON.stringify(user));
    }

    private errorHandler(errorRes: HttpErrorResponse) {
        let errorMessage = 'Unknown error occured';

        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct.';
              break;
          }

        return throwError(errorMessage);
        
    }

}