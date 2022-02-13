import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RealmAuthService } from '../auth/realmAuth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    userAuthenticated = false;
    signMode = false;
    private userSub!: Subscription;

    constructor(
        private authService: AuthService,
        private realmAuthService: RealmAuthService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    onChangeMode() {
        this.realmAuthService.changeSignMode();
        this.signMode = this.realmAuthService.signMode;
    }
    ngOnInit() {

        this.userSub = this.realmAuthService.authStatus.subscribe(user => {
            this.userAuthenticated = !!user;

        });
    }
    onLogout() {
        this.realmAuthService.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onDisplayPlaylist() {
        this.router.navigate(['pages/playlist'], { relativeTo: this.route });
    }

}