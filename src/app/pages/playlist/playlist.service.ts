import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataStorageSerice } from "src/app/pages/data-storage.service";
import { File } from "src/app/shared/file.model";


@Injectable({providedIn:'root'})

export class PlaylistService {
    url = 'http://localhost:3000/upload/mp3';
    files: File[] = [];

    constructor(private dataStorageService: DataStorageSerice,
                private http: HttpClient) {
        // this.dataStorageService.getFiles().subscribe(files => {
        //     this.files = files;
        // });

    }

    uploadFile(fileToUpload: any) {
        console.log(fileToUpload);
        console.log(fileToUpload.name);

        

        let formData = new FormData();
        formData.append('track', fileToUpload);
        formData.append('name', fileToUpload.name);
        return this.http.post(this.url, formData, {
            withCredentials: true
        });

    }
    


}