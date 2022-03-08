
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { StreamState } from 'src/app/interfaces/stream-state';
import { File } from 'src/app/shared/file.model';
import { AudioService } from '../audio.service';
import { OnInit } from '@angular/core';

import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { PlaylistService } from '../playlist/playlist.service';


@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
    get file(){return this.currentFile.file}

    
  state!: StreamState;
  currentFile: any = {
  };

  fileSub!: Subscription;

  constructor(private audioService: AudioService,
              private playlistService: PlaylistService) {


      this.audioService.getState().subscribe( state => {
          
          // console.log(state.error);
          this.state = state;
      });
  }

  ngOnInit () {
    this.fileSub = this.audioService.currentFile.subscribe(currentFile => {
      this.currentFile = currentFile;
      console.log(currentFile);
    })
  }
 

 
  play() {
      this.audioService.play();
  }

  pause() {
      this.audioService.pause();
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

  isFirstPlaying() {
      if (this.audioService.currentFile.getValue().index === 0) {
          return true;
      }
      return false;
  }

  isLastPlaying() {
      if (this.audioService.currentFile.getValue().index === this.file?.length - 1) {
          return true;
      } else {
          return false;
      }


  }

  previous() {
      const index = this.audioService.currentFile.getValue().index - 1;
      if(this.currentFile.isUserPlaylist === true) {
        const file = this.playlistService.userFiles.getValue()[index];
        this.openFile(file, index);
    } else {
        const file = this.playlistService.userFiles.getValue()[index];
        this.openFile(file, index);
    }

  }

  next() {
      const index = this.audioService.currentFile.getValue().index + 1;
      if(this.currentFile.isUserPlaylist === true) {
          const file = this.playlistService.userFiles.getValue()[index];
          this.openFile(file, index);
      } else {
          const file = this.playlistService.userFiles.getValue()[index];
          this.openFile(file, index);
      }
      
      
      

  }

  onSliderChangeEnd(change: any) {
      this.audioService.seekTo(change.value);
  }
    

  ngOnDestroy(): void {
    //   if(this.fileSub) {
    //     this.fileSub.unsubscribe();
    //   }
      
  }

}