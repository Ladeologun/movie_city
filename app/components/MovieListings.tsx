import React from 'react';
import { View,StyleSheet,FlatList,ActivityIndicator} from 'react-native';
import MovieCard from "./MovieCard"
import {fetchMovies} from "../server/service"
import { useQuery } from 'react-query';
import ListHeaderComponent from "./ListHeaderComponent"


const MovieListings: React.FC =()=> {
    const [movies, SetMovies] = React.useState([])
    const [page,SetPage] = React.useState(1)
    const { data, isLoading, isSuccess } = useQuery(["allmovies",page],()=>fetchMovies("allmovies",page))

    React.useEffect(()=>{
        if (isSuccess){
            SetMovies((p)=>p.concat(data)) 
        }
     
    },[data,page])

    const handleLoadMore = () =>{
        SetPage((preq)=>preq+1)
       
    }

    const renderFooter = ()=>{
        return(isLoading?
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>:null
        )
    }


    return (<>
        {movies && <View >
            <FlatList style={styles.container}
                data={movies}
                ListHeaderComponent={ListHeaderComponent}
                keyExtractor={(item:any) => item.id.toString()}
                key={'_'}
                numColumns={2}
                renderItem={({item})=><MovieCard item={item}/>}
                onEndReached = {handleLoadMore}
                onEndReachedThreshold={0}
                ListFooterComponent = {renderFooter}   
            />
        </View>}
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        borderRadius:10
    },
    loader:{
        marginTop:10,
        alignItems:"center"
    }
})
export default MovieListings;