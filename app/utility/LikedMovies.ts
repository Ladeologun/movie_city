import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
    id:number
    backPoster: string
    popularity:number
    title:string
    poster: string
    overview: string
    rating:number
    language:string
    video:boolean
  }

export const getMoviesbyId = async (item:Movie) => {
    try {
      const jsonValue = await AsyncStorage.getItem("mymovies")
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (value){
          if (value.find((m:any)=>m.id === item.id)){
              return true
          }else{
              return false
          }
      }else{
          return false
      }
    } catch(e) {
      console.log(e)
    }
  }