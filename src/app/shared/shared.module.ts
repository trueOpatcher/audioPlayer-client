import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spiner.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
    ],
    imports: [CommonModule],
    exports: [
        CommonModule,
        LoadingSpinnerComponent
    ]
})

export class SharedModule {

}