import axios from "axios"

const API_KEY = "2e89953d222d79c0a7c7900c5bcc8735"
const BASE_URL = "https://api.themoviedb.org/3"
const MOVIES_URL = `${BASE_URL}/discover/movie`
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing`
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`


export const fetchMovies = async(key:string,page:number)=>{
    try{
        const {data} = await axios.get(MOVIES_URL,{
            params:{
                api_key:API_KEY,
                language:"en_US",
                page:page
            }
        })
        const posterurl = "https://image.tmdb.org/t/p/original/"
        const modifieddata = data['results'].map((m:any)=>({
            id:m["id"],
            backPoster: posterurl + m["backdrop_path"],
            popularity:Math.round(m["popularity"]),
            title:m["title"],
            poster: posterurl + m["poster_path"],
            overview:m["overview"],
            rating:m["vote_average"],
            language:m["original_language"],
            video:m["video"]
        }))
        return modifieddata

    }catch(error){
        console.log(error)
    }

}

export const fetchNowplaying = async()=>{
    try{
        const {data} = await axios.get(NOW_PLAYING_URL,{
            params:{
                api_key:API_KEY,
                language:"en_US"
            }
        })
        const posterurl = "https://image.tmdb.org/t/p/original/"
        const modifieddata = data['results'].map((m:any)=>({
            id:m["id"],
            backPoster: posterurl + m["backdrop_path"],
            popularity:Math.round(m["popularity"]),
            title:m["title"],
            poster: posterurl + m["poster_path"],
            overview:m["overview"],
            rating:m["vote_average"],
            language:m["original_language"],
            video:m["video"]
        }))
        return modifieddata

    }catch(error){
        console.log(error)
    }

}

export const fetchPopular = async()=>{
    try{
        const {data} = await axios.get(POPULAR_MOVIES_URL,{
            params:{
                api_key:API_KEY,
                language:"en_US"
            }
        })
        const posterurl = "https://image.tmdb.org/t/p/original/"
        const modifieddata = data['results'].map((m:any)=>({
            id:m["id"],
            backPoster: posterurl + m["backdrop_path"],
            popularity:Math.round(m["popularity"]),
            title:m["title"],
            poster: posterurl + m["poster_path"],
            overview:m["overview"],
            rating:m["vote_average"],
            language:m["original_language"],
            video:m["video"]
        }))
        return modifieddata

    }catch(error){
        console.log(error)
    }

}

export const fetchVideoKey = async(movie_id:number)=>{
   
    try{
        const {data} = await axios.get(`${BASE_URL}/movie/${movie_id}/videos`,{
            params:{
                api_key:API_KEY
            }
        })
        const modifieddata = data['results'][0]
        return modifieddata

    }catch(e){
        console.log(e)
    }
}

