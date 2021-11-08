import React from 'react';
import { View,StyleSheet,Text,FlatList,TouchableOpacity,Image } from 'react-native';
import Screen from "../components/Screen"
import {getMovies} from "../utility/Cache"
import colors from "../config/colors"
import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import {RootStackParamList} from '../../RootStackPrams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



interface Iprops{
    navigation:NativeStackScreenProps<RootStackParamList, 'mylist'>|any;
}
const FavouriteMovieScreen:React.FC<Iprops> = ({navigation})=> {
    // CHANGED NULL TO []

    const [MovieList,SetMovieList] = React.useState<any>([])
    React.useEffect(()=>{
        const fetchmovies = async ()=>{
            let movies = await getMovies("mymovies")
            SetMovieList(movies)
        }
        fetchmovies()
    },[MovieList])

    function renderHeaderBar(){
        return(
            <View style={styles.barcontainer}>
                <TouchableOpacity style={styles.backarrow} onPress={()=>navigation.goBack()}>
                    <Image source={require("../assets/left-arrow.png")} style={{width:20,height:20,tintColor:"#fff"}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backarrow} onPress={()=>navigation.navigate("movies")}>
                    <Image source={require("../assets/upload.png")} style={{width:20,height:20,tintColor:"#fff"}}/>
                </TouchableOpacity>

            </View>
        )
    }



    return (<>{MovieList &&
        <Screen style={styles.screen}>
            <Header title="FAVOURITES"/>
            {renderHeaderBar()}
            <FlatList style={styles.container}
                data={MovieList}
                keyExtractor={item => item.id.toString()}
                key={'_'}
                numColumns={2}
                renderItem={({item})=><MovieCard item={item}/>}
            />
            {!MovieList.length && <Text style={styles.emptylist}>YOU DO NOT HAVE ANY MOVIE IN YOUR LIST</Text>}
        </Screen>}
        </>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingHorizontal:10,
        backgroundColor:colors.primary
    },
    container:{
        borderRadius:10
    },
    barcontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:15
    },
    backarrow:{
        justifyContent:"center",
        alignItems:"center",
        width:50,
        height:50,
        borderRadius:20,
        backgroundColor:'rgba(0, 0, 0, 0.4)'
    },
    emptylist:{
        color:"#fff",
        position:"absolute",
        top:120,
        left:40,
        fontFamily:"Avenir",
        fontWeight:"bold"
    }
})


export default FavouriteMovieScreen;