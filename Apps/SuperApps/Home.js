import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native'
import { CardProfile } from '../../components/CardProfile'
import { CardMenu } from '../../components/CardMenu'
// import { Carousel } from '../../components/Carousel/Carousel'
import { Search } from '../../components/Search'
import { Ionicons } from '@expo/vector-icons';
import { CardApps } from '../../components/CardApps'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react'
import { CardAppsB } from '../../components/CardAppsB'
import { useNavigation } from "@react-navigation/native";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'



const { width: screenWidth } = Dimensions.get('window');
export const Home = () => {

    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const [slide2, setSlide2] = useState()
    const [slide3, setSlide3] = useState()
    const [slide4, setSlide4] = useState()


    const { berita, agenda, program, galeri, profile } = useSelector(state => state.superApps)

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={item.image}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{ marginLeft: 10, color: COLORS.lighter, marginVertical: 10 }}>{item.tanggal}</Text>
                    <Text style={{ marginLeft: 10, color: COLORS.lighter }}> {item.subtitle} </Text>
                    <Text style={{ marginLeft: 10, marginVertical: 10 }}>{item.dari}</Text>
                </View>
            </View>
        );
    };

    const renderItem2 = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={item.image}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{ backgroundColor: COLORS.white, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{
                        marginLeft: 10,
                        marginVertical: 50,
                        textAlign: 'center',
                        fontSize: 13,
                    }}>
                        {item.title}
                    </Text>
                </View>
            </View>
        );
    };

    const renderItem3 = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={item.image}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{ backgroundColor: COLORS.white, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{
                        marginLeft: 10,
                        marginVertical: 50,
                        textAlign: 'center',
                        fontSize: 13,
                    }}>
                        {item.title}
                    </Text>
                </View>
            </View>
        );
    };

    const renderItem4 = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={item.image}
                    containerStyle={styles.galeri}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                {/* <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{
                        marginLeft: 10, color: '#111827',
                        marginVertical: 50,
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: 400
                    }}>
                        {item.title}
                    </Text>
                </View> */}
            </View>
        );
    };
    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    function handlePressModal() {
        bottomSheetModalRef.current?.present()
    }
    const navigation = useNavigation()
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <ScrollView>
                    <View style={{ backgroundColor: COLORS.primary, height: '6%', flexDirection: 'row', paddingTop: 20, gap: 20 }}>
                        <View style={{ paddingLeft: 20 }}>
                            <Ionicons name='notifications-outline' size={25} color={'white'} />
                        </View>
                        <View style={{ marginLeft: '7%', marginTop: 5 }}>
                            <Text style={{ color: COLORS.white, textAlign: 'right', fontWeight: FONTWEIGHT.bolder, marginBottom: 10, fontSize: FONTSIZE.H2 }}>{profile.nama}</Text>
                            <Text style={{ color: COLORS.white, textAlign: 'right', fontSize: FONTSIZE.H3 }}>{profile.nip}</Text>
                        </View>
                        <View>
                            <Image source={profile.avatar} style={{ width: 50, height: 50 }} />
                        </View>
                    </View>

                    <View>
                        <View style={{ height: '20%', backgroundColor: COLORS.primary, width: '100%', position: 'absolute' }} />
                        <CardApps
                            handlePressModal={handlePressModal}
                        />
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            snapPoints={animatedSnapPoints}
                            handleHeight={animatedHandleHeight}
                            contentHeight={animatedContentHeight}
                            index={0}
                            style={{ borderRadius: 50 }}
                            keyboardBlurBehavior="restore"
                            android_keyboardInputMode="adjust"
                            backdropComponent={({ style }) => (
                                <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                            )}
                        >
                            <BottomSheetView onLayout={handleContentLayout} >
                                <View style={{ marginVertical: 20 }}>
                                    <View style={{ marginLeft: 30 }}>
                                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>
                                            Aplikasi
                                        </Text>
                                    </View>
                                    <View style={{ marginVertical: 50 }}>
                                        <CardAppsB />
                                    </View>
                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>

                    <View style={{ marginVertical: 20, marginLeft: 30, flexDirection: 'row' }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}>Berita Terkini</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ListBerita')} style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3, flex: 1, color: '#1868AB' }}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.containerr}>
                            <Carousel
                                ref={carouselRef}
                                sliderWidth={screenWidth}
                                sliderHeight={screenWidth}
                                itemWidth={screenWidth - 60}
                                data={berita.lists.slice(0, 3)}
                                renderItem={renderItem}
                                hasParallaxImages={true}
                            />
                        </View>
                        {/* <Carousel data={CarouselData} /> */}
                    </View>

                    <View style={{ marginVertical: 20, marginLeft: 30, }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2, }}>Agenda Prioritas KKP Dengan 5 Kebijakan</Text>
                    </View>
                    <View style={styles.containerr}>
                        <Carousel
                            ref={carouselRef}
                            sliderWidth={screenWidth}
                            sliderHeight={screenWidth}
                            itemWidth={screenWidth - 60}
                            data={agenda}
                            renderItem={renderItem2}
                            hasParallaxImages={true}
                            onSnapToItem={setSlide2}
                        />
                        <Pagination
                            dotsLength={agenda.length}
                            inactiveDotColor={'black'}
                            dotStyle={styles.paginationDot}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            activeDotIndex={slide2}
                            carouselRef={carouselRef}
                            tappableDots={!!carouselRef}
                        />
                    </View>

                    <View style={{ marginLeft: 30, marginBottom: 20 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2, }}>7 Program Prioritas</Text>
                    </View>

                    <View style={styles.containerr}>
                        <Carousel
                            ref={carouselRef}
                            sliderWidth={screenWidth}
                            sliderHeight={screenWidth}
                            itemWidth={screenWidth - 60}
                            data={program}
                            renderItem={renderItem3}
                            hasParallaxImages={true}
                            onSnapToItem={setSlide3}
                        />
                        <Pagination
                            dotsLength={program.length}
                            inactiveDotColor={'black'}
                            dotStyle={styles.paginationDot}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            activeDotIndex={slide3}
                            carouselRef={carouselRef}
                            tappableDots={!!carouselRef}
                        />
                    </View>

                    <View style={{ marginLeft: 30, marginBottom: 20 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2, }}>Galeri</Text>
                    </View>

                    <View style={[styles.containerr, { marginBottom: 80 }]}>
                        <Carousel
                            ref={carouselRef}
                            sliderWidth={screenWidth}
                            sliderHeight={screenWidth}
                            itemWidth={screenWidth - 60}
                            data={galeri}
                            renderItem={renderItem4}
                            hasParallaxImages={true}
                            onSnapToItem={setSlide4}
                        />
                        <Pagination
                            dotsLength={galeri.length}
                            inactiveDotColor={'black'}
                            dotStyle={styles.paginationDot}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            activeDotIndex={slide4}
                            carouselRef={carouselRef}
                            tappableDots={!!carouselRef}
                        />
                    </View>
                </ScrollView >
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {

        marginVertical: 20
    },
    containerCard: {
        backgroundColor: '#F4F7FE',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 36,
        marginLeft: 20
    },
    containerr: {
        flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,// Prevent a random Android rendering issue
        backgroundColor: 'white',
        // borderRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    galeri: {
        flex: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8
    }
});
