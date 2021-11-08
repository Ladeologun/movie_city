import React from 'react';
import { View } from 'react-native';
import Carousel from "./Carousel"
import SectionHeader from "./SectionHeader"
import PopularMovie from "./PopularMovie"
import {fetchNowplaying,fetchPopular} from "../server/service"
import { useQuery } from 'react-query';


const ListHeaderComponent: React.FC =(props)=> {
    const nowplayingdata = useQuery("nowplaying",fetchNowplaying)
    const popularmovies:any = useQuery("popularmovie",fetchPopular)
    return (
        <View>
            <Carousel currentmovies={nowplayingdata} />
            <PopularMovie popularmovies={popularmovies}/>
            <SectionHeader title="All Movies"/>
        </View>
    );
}

export default ListHeaderComponent;