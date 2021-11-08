import React from 'react';
import {StyleSheet} from "react-native"
import colors from "../config/colors"
import Screen from "../components/Screen"
import Header from "../components/Header"
import MovieListings from "../components/MovieListings"


const MovieListingsScreen:React.FC = ()=> {
    return (
        <Screen style={styles.screen}>
            <Header title="MOVIES" />
            <MovieListings />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingHorizontal:10,
        backgroundColor:colors.primary,
    }
})
export default MovieListingsScreen;