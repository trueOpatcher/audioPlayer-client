import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/pages/audio.service';
import { DataStorageSerice } from 'src/app/pages/data-storage.service';
import { File } from 'src/app/shared/file.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})



export class PlayerComponent {

  currentFile: any = {};
  files: any = [];
  state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  }; 

  constructor(
    private audioService: AudioService
  ) {
    // get media files
    this.audioService.fetchPlaylist().subscribe(files => {
      console.log(files);
      this.files = files;
    });
    // listen to stream state
    audioService.getState().subscribe(state => {
      this.state = state;
    });
  }      


  
  openFile(file: File, index: number) {
    this.audioService.currentFile.next({ index, file });
    this.audioService.stop();
    this.playStream(file.url);
  }
  
  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  stop() {
    this.audioService.stop();
  }

  

  

  


}
