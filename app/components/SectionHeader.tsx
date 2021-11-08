import React from 'react';
import { View,StyleSheet,Text, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../RootStackPrams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type favlistScreenProp = NativeStackScreenProps<RootStackParamList, 'mylist'>;

interface Iprops{
    title:string
}

const SectionHeader: React.FC<Iprops>=({title})=>{
    const navigation:any = useNavigation<favlistScreenProp>();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            {title =="Popular" &&
            <TouchableOpacity onPress={() => navigation.navigate("mylist")}>
                <Text style={styles.mylist}>My List</Text>
            </TouchableOpacity>}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 15,
        paddingBottom:5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent:"space-between"
    },
    text:{
        fontSize: 25,
        color:"#fff",
        borderBottomColor:"green",
        textDecorationColor:"gray",
        textShadowColor:"gray",
        textShadowOffset:{width:0.5,height:0.5}
    },
    mylist:{
        fontSize: 14,
        color:"skyblue",
        borderBottomColor:"green",
        textDecorationLine:"underline",
        textDecorationColor:"gray",
        textShadowColor:"gray",
        textShadowOffset:{width:0.5,height:0.5}
    }
})
export default SectionHeader;