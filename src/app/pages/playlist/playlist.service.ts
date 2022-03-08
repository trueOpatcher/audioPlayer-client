import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, take } from "rxjs";
import { File } from "src/app/shared/file.model";
import { environment } from "src/environments/environment";
import * as $ from 'jquery';


@Injectable({providedIn:'root'})

export class PlaylistService {
    private SERVER_URL = environment.serverUrl;


    userFiles = new BehaviorSubject<File[]>([]);
    sharedFiles = new BehaviorSubject<File[]>([]);
    

    constructor(
                private http: HttpClient) {
        // this.dataStorageService.getFiles().subscribe(files => {
        //     this.files = files;
        // });

    }

    uploadFile(fileToUpload: any) {
        let formData = new FormData();
        formData.append('track', fileToUpload);
        formData.append('name', fileToUpload.name);
        return this.http.post(this.SERVER_URL + '/upload/mp3', formData, { withCredentials: true });

    }

    fetchSharedPlaylist() {
        console.log('fetching playlist');
     
         return this.http.get<any[]>(this.SERVER_URL + '/playlist', { withCredentials: true })
         .pipe(map(files => {
           let playlistData: File[] = [];
           console.log(files);
     
           files.forEach(file => {
           console.log(file.image);
             const url = this.SERVER_URL + '/download/mp3' + '?' + $.param({trackName: file.trackName});
             let imageUrl: any;

              if(file.imageID) {
                imageUrl = `${this.SERVER_URL}/download/image?id=${file.imageID}`;
              } else {
                imageUrl = null;
              }
              console.log(imageUrl);

              const id = file.trackID;
              const name = file.trackName;
              const userName = file.userName;
              const album = file.album;
              const artist = file.artist;
              const genre = file.genre;
              const title = file.title;
              const year = file.year;
              const imageID = file.imageID;
              const length = files.length;
              const isUserPlaylist = false;

      
              playlistData.push(
                {
                 id: id,
                 name: name,
                 userName: userName,
                  url: url,
                  album: album,
                  artist: artist,
                  genre: genre,
                  title: title,
                  year: year,
                  imageID: imageID,
                  imageUrl: imageUrl,
                  length: length,
                  isUserPlaylist: isUserPlaylist
                });
     
           });
           
            this.sharedFiles.next(playlistData);
            return playlistData;
         }));
         
       }
     
       fetchUserPlaylist() {
      
          return this.http.get<any[]>(this.SERVER_URL + '/userPlaylist', { withCredentials: true })
          .pipe(map(files => {
            let playlistData: File[] = [];
            console.log(files);
      
            files.forEach(file => {
              const url = this.SERVER_URL + '/download/mp3' + '?' + $.param({trackName: file.trackName});
              let imageUrl: any;

              if(file.imageID) {
                imageUrl = `${this.SERVER_URL}/download/image?id=${file.imageID}`;
              } else {
                imageUrl = null;
              }
              console.log(imageUrl);

              const id = file.trackID;
              const name = file.trackName;
              const userName = file.userName;
              const album = file.album;
              const artist = file.artist;
              const genre = file.genre;
              const title = file.title;
              const year = file.year;
              const imageID = file.imageID;
              const length = files.length;
              const isUserPlaylist = true;

      
              playlistData.push(
                {
                 id: id,
                 name: name,
                 userName: userName,
                  url: url,
                  album: album,
                  artist: artist,
                  genre: genre,
                  title: title,
                  year: year,
                  imageID: imageID,
                  imageUrl: imageUrl,
                  length: length,
                  isUserPlaylist: isUserPlaylist

                });
      
            });
            
             this.userFiles.next(playlistData);
             return playlistData;
          }));
          
        }


        deleteFile(id:string) {
          return this.http.delete(`${this.SERVER_URL}/delete/mp3?id=${id}`, { withCredentials: true });
        }



     
    


}