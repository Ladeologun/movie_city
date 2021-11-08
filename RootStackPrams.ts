export type RootStackParamList = {
    movie: undefined;
    details: {
        id:number
        backPoster: string
        popularity:number
        title:string
        poster: string
        overview: string
        rating:number
        language:string
        video:boolean
      };
    video: {
        iso_639_1: string
        iso_3166_1: string
        name: string
        key: string,
        site: string,
        size: number,
        type: string,
        official: boolean,
        published_at: string,
        id: string
    } |undefined
    mylist: undefined;
    };