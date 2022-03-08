import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';

import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/pages/audio.service';
import { File } from 'src/app/shared/file.model';
import { FormControl, FormGroup } from '@angular/forms';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})


export class PlaylistComponent  implements OnInit {



  fileToUpload: File | null = null;

  showDownBtn = false;
  showStorage = false;

  sharedFiles: any = [];
  userFiles: any = [];

  state!: StreamState; 

  constructor(
    private audioService: AudioService, 
    private playlistService: PlaylistService
  ) {
    // get media files
    this.updatePlaylist();
    // listen to stream state
    audioService.getState().subscribe(state => {
      this.state = state;
    });
  }   
  
  ngOnInit() {
  }
//


uploadForm = new FormGroup({
  'file': new FormControl(null)
});


onDeleteFile(fileID: string) {
  this.playlistService.deleteFile(fileID).subscribe({
    next: () => { 
      console.log('deleted');
      this.updatePlaylist();
    },
    error: (error) => console.log(error)
  })
}


options(options: boolean) {
  this.showStorage = options;
}

onClickAdd() {
  this.showDownBtn = !this.showDownBtn;
}


onSubmit() {
  if(this.fileToUpload == null) {
      console.log('File is not selected');
      return;
  } else if(this.userFiles.length > 4) {
    console.log('Reach max limit');
    return;
  }

  const fileToUpload = this.fileToUpload;
  this.fileToUpload = null;
      this.playlistService.uploadFile(fileToUpload).subscribe({
          next: () =>{ 
            console.log('done'); 
            this.updatePlaylist();
          },
          error: (error) => { console.log(error) }
      })

  

  
}

onSelectFile(event: any) {
  

 
  let file: File = event.target.files[0];
  if(file != null) {
      this.fileToUpload = file;
  }
}





  //
  openFile(file: File, index: number) {
    this.audioService.currentFile.next({ index, file });
    this.audioService.stop();
    this.playStream(file.url);
  }
  
  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {

    });
  }

  stop() {
    this.audioService.stop();
  }

  
  private updatePlaylist() {
    this.playlistService.fetchSharedPlaylist().subscribe(sharedFiles => {
      
      this.sharedFiles = sharedFiles;
    });

    this.playlistService.fetchUserPlaylist().subscribe(userFiles => {
      this.userFiles = userFiles;
    })
  }

  

  


}
