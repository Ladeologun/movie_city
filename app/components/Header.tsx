import React from 'react';
import { Image, View,StyleSheet,Text } from 'react-native';
import colors from "../config/colors"

interface Iprops{
    title:string
}

const Header: React.FC<Iprops> =({title}) =>{

    return (
        <View style={styles.container}>
            <Image resizeMode="contain" style={styles.image} source={{uri:"https://res.cloudinary.com/ladeologun/image/upload/v1635837893/Youtubeimages/movie%20city/movie-city-1_trhuvo.jpg"}}/>
            <View style={styles.textcontainer}>
                <Text  style={styles.text}>{title}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        height:50,
        flexDirection:"row",
        backgroundColor:"white",
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:15
    },
    image:{
        height:"100%",
        width:50,
        margin:0,
    },
    text:{
        fontSize:16,
        color:colors.primary,
        fontFamily:"Avenir"
    },
    textcontainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-evenly",
        // backgroundColor:"red",
        paddingRight:30
    }
})
export default Header;