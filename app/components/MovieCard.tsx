import React from 'react';
import { View,StyleSheet,ImageBackground,TouchableOpacity,Text,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const { width} = Dimensions.get('window')

interface Iprops{
    item:{
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
}

const MovieCard: React.FC<Iprops> =({item})=> {
    const navigation:any = useNavigation()
    return (
        <View style={styles.container}>

            <ImageBackground style={styles.imagebackground} source={{uri: item.poster}}>
                <TouchableOpacity
                    onPress={() =>navigation.navigate("details",item)}>

                    <Ionicons name="play-circle-outline" size={50} color="white" />

                </TouchableOpacity>
            </ImageBackground>

            <Text numberOfLines={1} style={styles.text}> {item.title} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: width*0.5,
        marginBottom:10,
    },
    imagebackground:{
        width: '100%',
        height: 150,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        overflow:"hidden"
    },
    text:{
        color:"#fff"
    }
})
export default MovieCard;