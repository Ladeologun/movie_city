import React from 'react';
import { View,FlatList } from 'react-native';
import SectionHeader from "./SectionHeader"
import ListItemSeperator from "./ListItemSeperator"
import MovieCard from "./MovieCard"


interface Iprops{
    popularmovies:{
        data:{id:number
            backPoster: string
            popularity:number
            title:string
            poster: string
            overview: string
            rating:number
            language:string
            video:boolean }[],
        isLoading:boolean,
        isSuccess:boolean
    }
}

const PopularMovie: React.FC<Iprops> =({popularmovies})=> {
    const { data, isLoading, isSuccess } = popularmovies

    return (<>
        {isSuccess && <View>
            <SectionHeader title="Popular"/>
            <FlatList
                data={data.slice(5)}
                keyExtractor={item => item.id.toString()}
                key={'_'}
                horizontal
                renderItem={({item})=><MovieCard item={item}/>}
                ItemSeparatorComponent={ListItemSeperator}
            />
        </View>}
        </>
    );
}


export default PopularMovie;