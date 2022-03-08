export class File {
    constructor(
       public userName: string,
       public id: string,
       public url: string,
       public name: string,
       public length: number,
       public isUserPlaylist: boolean,
       public title?: string,
       public artist?: string,
       public album?: string,
       public genre?: string[],
       public year?: number,
       public imageID?: string,
       public imageUrl?: string,
       
       
    ) {

    }
}