import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { PagesComponent } from "./pages.component";
import { PlayerComponent } from "./player/player.component";
import { PlaylistComponent } from "./playlist/playlist.component";


const routes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: ''},
            { path: 'player', component: PlayerComponent },
       
            { path: 'playlist', component: PlaylistComponent },
        
        
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {

}