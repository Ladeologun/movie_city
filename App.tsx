import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import MovieListingsScreen from "./app/screens/MovieListingsScreen"
import MovieDetailsScreen from "./app/screens/MovieDetailScreen"
import FavouriteMovieScreen from "./app/screens/FavouriteMovieScreen"
import VideoPlayerScreen from "./app/screens/VideoPlayerScreen"


const queryClient = new QueryClient();
const Stack = createNativeStackNavigator()
const StackNavigator = ()=>(
  <Stack.Navigator>
    <Stack.Screen name="movies" component={MovieListingsScreen} options={{headerShown:false}}/>
    <Stack.Screen name="details" component={MovieDetailsScreen} options={{headerShown:false}}/>
    <Stack.Screen name="mylist" component={FavouriteMovieScreen} options={{headerShown:false}}/>
    <Stack.Screen name="video" component={VideoPlayerScreen} options={{headerShown:false}}/>
  </Stack.Navigator>
)

export default function App() {
  return (
   <NavigationContainer>
     <QueryClientProvider client={queryClient}>
       <StackNavigator />
     </QueryClientProvider>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
