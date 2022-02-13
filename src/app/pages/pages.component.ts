import { Component, NgModule, OnInit } from "@angular/core";
import { DataStorageSerice } from "./data-storage.service";


@Component ({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{
    
    constructor() {

    }

    ngOnInit(): void {
    }
}