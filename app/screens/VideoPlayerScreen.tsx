import React, { useState, useCallback } from "react";
import { Button, View, Alert,StyleSheet,TouchableOpacity,Image} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Screen from "../components/Screen"
import colors from "../config/colors"
import {RootStackParamList} from '../../RootStackPrams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


interface Iprops{
    navigation:NativeStackScreenProps<RootStackParamList, 'video'>|any;
    route:any
}

const VideoPlayerScreen:React.FC<Iprops> = ({route,navigation})=> {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert("video has finished playing!");
        }
      }, []);
    
    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
      }, []);

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



    return (
        <Screen style={styles.screen}>
            {renderHeaderBar()}
            <View style={styles.playercon}>
                <YoutubePlayer
                    height={300}
                    width = {499}
                    play={playing}
                    videoId={route.params.key}
                    onChangeState={onStateChange}
                />
            <Button title={playing ? "PAUSE" : "PLAY"} onPress={togglePlaying} />
            </View>
            
        </Screen>
    );
}


const styles = StyleSheet.create({
    screen:{
        paddingHorizontal:10,
        backgroundColor:colors.primary,
       

    },
    barcontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:24,
        marginBottom:70
    },
    backarrow:{
        justifyContent:"center",
        alignItems:"center",
        width:50,
        height:50,
        borderRadius:20,
        backgroundColor:'rgba(0, 0, 0, 0.4)'
    },
    playercon:{
        justifyContent:"center",
        alignItems:"center"
    }
})
export default VideoPlayerScreen;