import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RealmAuthService } from '../auth/realmAuth.service';
import { AudioService } from "../pages/audio.service";


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
        private realmAuthService: RealmAuthService,
        private router: Router,
        private route: ActivatedRoute,
        private audioService: AudioService) {

    }

    onChangeMode(signMode: boolean) {
        this.signMode = signMode;
        this.realmAuthService.signMode.next(signMode);
    }

    
    ngOnInit() {

        this.userSub = this.realmAuthService.authStatus.subscribe(user => {
            this.userAuthenticated = !!user;

        });
    }
    onLogout() {
        this.realmAuthService.logout();

        this.audioService.stop();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onDisplayPlaylist() {
        this.router.navigate(['pages/playlist'], { relativeTo: this.route });
    }

}