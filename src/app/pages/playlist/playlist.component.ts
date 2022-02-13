import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlaylistService } from './playlist.service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
    fileToUpload: File | null = null;
    showPlaylist = false;
    


    uploadForm = new FormGroup({
        'file': new FormControl(null)
    });

    constructor(private http: HttpClient,
                private playlistService: PlaylistService) {

    }
    dataStorage: any;

    

    onClickAdd() {
        this.showPlaylist = !this.showPlaylist;
    }


    onSubmit() {
        if(this.fileToUpload == null) {
            console.log('File is not selected');
        } else {
            this.playlistService.uploadFile(this.fileToUpload).subscribe({
                next: () => console.log('done'),
                error: (error) => console.log(error)
            });

        }

        
    }


    onSelectFile(event: any) {
        console.log(event.target);
        console.log(event.target.files);
        let file: File = event.target.files[0];
        if(file != null) {
            this.fileToUpload = file;
        }
    }

    
}