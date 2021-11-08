import React from 'react';
import { View,StyleSheet,Image,Text,Dimensions, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from "../config/colors"

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

const {width,height} = Dimensions.get("window")

const CarouselItem: React.FC<Iprops> =({item})=> {
    const navigation:any = useNavigation()
    return (
        <TouchableOpacity onPress={() =>navigation.navigate("details",item)}>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:item.poster}} />
                <View style={styles.textview}>
                    <Text style={styles.itemTitle}>{item.title} </Text>
                    <Text numberOfLines={2} style={styles.itemDescription}>{item.overview}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        width:width-2,
        height:height * 0.45,
        shadowColor:colors.white,
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.5,
        shadowRadius:3,
        elevation:5
    },

    textview:{
        position:"absolute",
        bottom:10,
        margin:10,
        left:5
    },
    image:{
        width:"100%",
        height:"100%",
        borderBottomRightRadius:10,
        overflow:"hidden"

    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem;