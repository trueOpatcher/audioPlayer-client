import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoggedinGuard } from "./auth/loggedin.guard";



const routes: Routes = [
    { path: '', redirectTo:'/pages', pathMatch: 'full' },
    {   
        path: 'auth',
        canActivate: [LoggedinGuard],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    { path: '**', redirectTo: '' }
];


@NgModule ({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class RoutingModule {

}