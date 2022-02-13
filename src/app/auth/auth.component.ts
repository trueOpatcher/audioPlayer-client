import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { RealmAuthService } from "./realmAuth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    constructor(private router: Router,
        private realmAuthService: RealmAuthService,
        private authService: AuthService) {

    }

    loading = false;
    error: string = '';

    ngOnInit(): void {
        // this.loading = true;
        // this.realmAuthService.autoLogin();
        // this.loading = false;
    }


    authForm = new FormGroup({
        'email': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
    });




    onSubmit() {
        if (!this.authForm.valid) {
            return;
        }
        const email = this.authForm.value.email;
        const password = this.authForm.value.password;
        this.loading = true;

        //handle user signup
        if (this.realmAuthService.signMode) {
            this.realmAuthService.signUp(email, password).subscribe({
                next: userData => {
                    console.log('signUp');
                    // this.realmAuthService.user.next(userData);
                    this.loading = false;
                    this.router.navigate(['/pages']);
                },
                error: error => {
                    console.log(error);
                }
            });

        }

        // handle user login  
        else {
            this.realmAuthService.login(email, password)
                .subscribe({
                    next: () => {
                        
                        this.loading = false;
                        this.realmAuthService.authStatus.next(true);
                        this.router.navigate(['/pages']);
                    },
                    error: err => {
                        console.log(err);
                    }
                }
                );

        }
    }



}