import React from 'react';
import { SafeAreaView,StyleSheet, View } from 'react-native';
import Constants from "expo-constants"

interface Iprops{
    children:any
    style?:any
}

const Screen: React.FC<Iprops> = ({children,style})=> {
    return (
        <SafeAreaView style={[styles.screen,style]}>
            <View style={[{flex:1},style]}>
                {children}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    screen:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
    }
})
export default Screen;