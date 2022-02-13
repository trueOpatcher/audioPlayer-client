import { Component } from '@angular/core';
import { AudioService } from '../audio.service';
import { File } from 'src/app/shared/file.model';
import { StreamState } from 'src/app/interfaces/stream-state';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent {


    constructor(private audioService: AudioService) {

    }

    state: StreamState = {
        playing: false,
        readableCurrentTime: '',
        readableDuration: '',
        duration: undefined,
        currentTime: undefined,
        canplay: false,
        error: false,
    };

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

        if (this.audioService.currentFile.getValue().index === this.audioService.files.getValue().length - 1) {
            return true;
        } else {
            return false;
        }


    }

    previous() {
        const index = this.audioService.currentFile.getValue().index;
        const file = this.audioService.files.getValue()[index];
        this.openFile(file, index);

    }

    next() {
        const index = this.audioService.currentFile.getValue().index + 1;
        const file = this.audioService.files.getValue()[index];
        
        this.openFile(file, index);
        

    }

    onSliderChangeEnd(change: any) {
        this.audioService.seekTo(change.value);
    }
}