import { Injectable, OnInit } from "@angular/core";
import { catchError, lastValueFrom, map, of, tap, timeout } from "rxjs";
import { File } from "../shared/file.model";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})


export class DataStorageSerice implements OnInit {


  

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

  }

  


  responseHandler(trackName: string) {

  }

  //   // tslint:disable-next-line: max-line-length
  //   {
  //     url: "https://music-server-test.herokuapp.com/download/mp3?name=testy&trackID=61fae96a3b1ffd50b00da6f5",
  //     name: "Perfect",
  //     artist: " Ed Sheeran"
  //   },
  //   {
  //     // tslint:disable-next-line: max-line-length
  //     url:
  //       "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  //     name: "Man Atkeya Beparwah",
  //     artist: "Nusrat Fateh Ali Khan"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Penny Lane",
  //     artist: "The Beatles"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Jojn Rod",
  //     artist: "bert"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Jojn Rod",
  //     artist: "bert"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Jojn Rod",
  //     artist: "bert"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Jojn Rod",
  //     artist: "bert"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Jojn Rod",
  //     artist: "bert"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Jojn Rod",
  //     artist: "bert"
  //   },
  //   {
  //     url:
  //       "https://cdn.pixabay.com/download/audio/2021/12/17/audio_93d90514a5.mp3?filename=this-minimal-technology-12327.mp3",
  //     name: "Jojn Rod",
  //     artist: "bert"
  //   }
  // ];

  // getFiles() {
  //   return of(this.files);
  // }


}