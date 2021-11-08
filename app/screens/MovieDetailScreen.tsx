import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground,Image,StyleSheet,ScrollView,Platform,Dimensions} from 'react-native';
import colors from "../config/colors"
import {LinearGradient} from 'expo-linear-gradient';
import {store} from "../utility/Cache"
import { useQuery } from 'react-query';
import {fetchVideoKey} from "../server/service"
import {getMoviesbyId} from "../utility/LikedMovies"
import {RootStackParamList} from '../../RootStackPrams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


const { width, height } = Dimensions.get('window')
interface Iprops{
    navigation:NativeStackScreenProps<RootStackParamList, 'details'>|any;
    route:any
}

const MovieDetailsScreen:React.FC<Iprops> = ({route,navigation}) => {
    const [like,SetLike] =React.useState(false)
    const [refresh,SetRefresh] = React.useState(false)
    const movie_id = route.params.id
    const [selectedMovie,SetSelectedMovie] = React.useState(null)
    const {data,isLoading, isSuccess} = useQuery(["myvideos",route.params.id],()=>fetchVideoKey(route.params.id))



    React.useEffect(()=>{
        isSuccess?SetSelectedMovie(data):SetSelectedMovie(null)
        const getvideobyId = async()=>{
            const videobyId:any = await getMoviesbyId(route.params)
            SetLike(videobyId)
        }
        getvideobyId();
    },[data,like,refresh])


    function renderHeaderBar(){
        return(
            <View style={styles.barcontainer}>
                <TouchableOpacity style={styles.backarrow} onPress={()=>navigation.goBack()}>
                    <Image source={require("../assets/left-arrow.png")} style={{width:20,height:20,tintColor:"#fff"}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backarrow} onPress={()=>navigation.navigate("mylist")}>
                    <Image source={require("../assets/upload.png")} style={{width:20,height:20,tintColor:"#fff"}}/>
                </TouchableOpacity>

            </View>
        )
    }

    function renderButtons(){
        return(<>
            <View style={styles.barcontainer}>
                <TouchableOpacity style={styles.backarrow} onPress={()=>navigation.navigate("video",selectedMovie)}>
                    <Image source={require("../assets/play-button.png")} style={{width:20,height:20,tintColor:"yellow"}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backarrow} onPress={async()=>{
                    await store("mymovies",route.params)
                    SetRefresh((prev)=>!prev)}}>{like?
                    <Image source={require("../assets/heart.png")} style={{width:20,height:20,tintColor:"red"}}/>:
                    <Image source={require("../assets/love.png")} style={{width:20,height:20,tintColor:"#fff"}}/>}
                </TouchableOpacity>

            </View>
            </>
        )
    }
    

    function renderHeaderSection(){
        return(
            <ImageBackground source={{uri:route.params.poster}}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={{flex:1}}>
                    {renderHeaderBar()}
                    <View style={{flex:1,justifyContent:"flex-end"}}>
                       
                        <LinearGradient
                            start={{x:0,y:0}}
                            end={{x:0,y:1}}
                            colors={['transparent','#0F111D']}
                            style={
                                {width:"100%",height:200,alignItems:"center",justifyContent:"flex-end"}
                            }
                        >
                             {renderButtons()}
                            <Text style={styles.title}>{route.params.title}</Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    function renderVotesandPopularity(){
        return(
            <View style={styles.votesandpopularity}>
                <View style={[styles.categorycontainer,{marginLeft:0}]}>
                    <Text style={styles.categorttext}>{route.params.language}</Text>
                </View>
                <View style={[styles.categorycontainer,{paddingHorizontal:24}]}>
                    <Text style={styles.categorttext}>{route.params.popularity}</Text>
                </View>
                <View style={[styles.categorycontainer,{paddingHorizontal:24}]}>
                    <Image source={require("../assets/star.png")} resizeMode="contain" style={{width:15,height:15,marginRight:5}}/>
                    <Text style={styles.categorttext}>{route.params.rating}</Text>
                </View>
            </View>
        )
    }

    function renderMovieDetails(){
        return(
            <View style={styles.overviewcon}>
                <Text style={styles.textoverview}>Overview</Text>
                <Text numberOfLines={5} style={styles.textdetails}>{route.params.overview}</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.contentcontainer} style={styles.container}>
            {renderHeaderSection()}
            {renderVotesandPopularity()}
            {renderMovieDetails()}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentcontainer:{
        flex:1,
        backgroundColor:colors.primary
    },
    container:{
        backgroundColor:colors.primary
    },
    background:{
        width:"100%",
        height:height < 700?height*0.6:height*0.7
    },
    barcontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:Platform.OS ==="ios"?40:20,
        paddingHorizontal:24,
    },
    backarrow:{
        justifyContent:"center",
        alignItems:"center",
        width:50,
        height:50,
        borderRadius:20,
        backgroundColor:'rgba(0, 0, 0, 0.4)'
    },
    title:{
        color:"#fff",
        marginTop:8,
        fontFamily: "Avenir", 
        fontSize: 30, 
        lineHeight: 36
    },
    votesandpopularity:{
        flexDirection:"row",
        marginTop:8,
        alignItems:"center",
        justifyContent:"center",
    },
    categorycontainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'center',
        marginLeft:8,
        paddingHorizontal:8,
        paddingVertical:3,
        borderRadius:8,
        backgroundColor:"#363636",
    },
    categorttext:{
        color:"#fff",
        fontSize:14, 
        lineHeight: 22,
        fontFamily:"Avenir"
    },
    overviewcon:{
        flex:1,
        paddingHorizontal:8,
        marginTop:8,
        justifyContent:"center",
    },
    textdetails:{
        color:"gray",
        fontSize:16,
        fontFamily:"Avenir",
        marginTop:8,
        fontWeight:"100"
    },
    textoverview:{
        fontFamily:"Avenir",
        fontSize:18,
        color:"#fff"
    }

})
export default MovieDetailsScreen;