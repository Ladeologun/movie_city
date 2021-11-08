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
  

export const getMovies = async (storage_key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storage_key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e)
    }
  }


export const store = async (storage_key:string,value:Movie) => {
    try{
        const favmovies = await getMovies(storage_key)
    
        if (favmovies == null){
            const jsonValue = JSON.stringify([value])
            await AsyncStorage.setItem(storage_key, jsonValue)
        }else if (favmovies.find((item:any) => item.id === value.id)){
            const filtmovies = favmovies.filter((m:any)=>m.id != value.id)
            const jsonValue = JSON.stringify(filtmovies)
            await AsyncStorage.removeItem(storage_key)
            await AsyncStorage.setItem(storage_key, jsonValue)
        }else{
            const updatedmovie = [...favmovies,value]
            const jsonValue = JSON.stringify(updatedmovie)
            await AsyncStorage.setItem(storage_key, jsonValue)
        }

    }catch(e){
        console.log(e)
    }

}
  
  
