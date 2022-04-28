import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { RealmAuthService } from "./realmAuth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})




export class AuthComponent implements OnInit {

    get userName() {return this.authForm.get('userName')}
    get email() {return this.authForm.get('email')};
    get password() {return this.authForm.get('password')}
    get confirmPassword() {return this.authForm.get('confirmPassword')};

    matchingValidator(): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            let confirmPassword = control.value;
            let password = this.password?.value;
    
            if(!confirmPassword) {
                return null;
            }
            
            if(password === confirmPassword) {
                return null;
            } else {
                return { confirmPassword: true };
               
            }
    
        }
    }


    constructor(private router: Router,
        private realmAuthService: RealmAuthService) {

    }

    authForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(7)]),
        'userName': new FormControl(null, Validators.required),
        'confirmPassword': new FormControl(null, Validators.required)

    });

    signMode: boolean = false;
    loading = false;
    error: string = '';

    



    ngOnInit(): void {
        this.realmAuthService.signMode.subscribe(signMode => {
            this.authForm.reset();

            this.signMode = signMode;
            if(this.signMode === false) {
                this.userName?.clearValidators();
                this.confirmPassword?.clearValidators();
            } else {
                this.userName?.setValidators([Validators.required]);
                this.confirmPassword?.setValidators([this.matchingValidator()]);
            }

            this.userName?.updateValueAndValidity();
            this.confirmPassword?.updateValueAndValidity();
        })
        // console.log(this.signMode);
        
        // this.authForm.get('userName')?.valueChanges.subscribe(() => {
        //     console.log(this.authForm);
        //     if(this.signMode == true) {
        //         this.authForm.get('useName')?.setValidators([Validators.required]);
        //     } else {
        //         this.authForm.get('useName')?.setValidators(null);
        //     }
        // })
    }


    

    




    onSubmit() {

        if (!this.authForm.valid) {
            return;
        }
        const email = this.authForm.value.email;
        const password = this.authForm.value.password;
        const userName = this.authForm.value.userName;
        this.loading = true;

        //handle user signup
        if (this.realmAuthService.signMode.getValue()) {
            this.realmAuthService.signUp(email, password, userName).subscribe({
                next: userData => {
                    console.log('signUp');
                    this.realmAuthService.authStatus.next(true);
                    this.loading = false;
                    this.router.navigate(['/pages']);
                },
                error: error => {
                    console.log(error);
                    this.loading = false;
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
                        this.loading = false;
                        console.log(err);
                    }
                }
                );

        }
    }



}