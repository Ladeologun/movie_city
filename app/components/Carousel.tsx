import React,{useRef,useEffect} from 'react';
import { FlatList, View,Animated,StyleSheet,Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CarouselItem from "./CarouselItem"


interface Iprops{
    datalist:{
        id:number
        backPoster: string
        popularity:number
        title:string
        poster: string
        overview: string
        rating:number
        language:string
        video:boolean
    }[]
}

const { width } = Dimensions.get('window')

function infiniteScroll(dataList:Iprops["datalist"],mySlide:any){
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function() {
        scrolled ++
        if(scrolled < numberOfData){
        scrollValue = scrollValue + width}

        else{
            scrollValue = 0
            scrolled = 0
        }
        if (mySlide.current) {
            mySlide.current.scrollToOffset({
                animated: true,
                offset: scrollValue,
            });
        }
        
    }, 5000)
}

function Carousel({currentmovies}:any) {
    const { data, isLoading, isSuccess } = currentmovies
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const mySlide = useRef<FlatList<any>>(null);


    useEffect(()=>{
        isSuccess?infiniteScroll(data.slice(0,5), mySlide):""
    })


    return (<>
        {isSuccess && (<View>
            <FlatList
                ref={mySlide} 
                data={data.slice(0,5)}
                keyExtractor={data=>data.id.toString()}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=><CarouselItem item={item} />}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }], {useNativeDriver: false}
                )}
            
            />
            <LinearGradient
                start={{x:0,y:0}}
                end={{x:0,y:1}}
                colors={['transparent','#0F111D']}
                style={
                    {width:"100%",height:25,alignItems:"center",justifyContent:"flex-end"}
                }
            >
            <View style={styles.dotView}>
                    {data.slice(0,5).map((_a:any, i:number) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: 10, backgroundColor: '#fff', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}

            </View>
            </LinearGradient>
        </View>)}
    </>);
}

const styles = StyleSheet.create({
    dotView: { flexDirection: 'row', justifyContent: 'center' }
})

export default Carousel;