import React from 'react';
import { View,StyleSheet } from 'react-native';
import colors from "../config/colors"

function ListItemSeperator() {
    return (
        <View style={styles.seperator}/>
    );
}

const styles = StyleSheet.create({
    seperator:{
        width:10,
        height:"100%",
        backgroundColor:colors.primary
    }
})

export default ListItemSeperator;