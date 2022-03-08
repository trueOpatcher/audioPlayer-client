import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { FooterComponent } from "./footer/footer.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { PlayerComponent } from "./player/player.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { SharedModule } from "../shared/shared.module";
@NgModule ({
    declarations: [
        PlayerComponent,
        PagesComponent,
        PlaylistComponent,
        FooterComponent
    ],
    imports: [
        RouterModule,
        PagesRoutingModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,

    ]
})

export class PagesModule {

}