import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
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
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { CardTautan } from '../../components/CardTautan'
import { Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CardVisiMisi } from '../../components/CardVisiMisi'
import { CardVideo } from '../../components/CardVideo'
import YoutubePlayer from "react-native-youtube-iframe";
import { Button } from 'react-native'
import { useCallback } from 'react'
import { Portal } from 'react-native-portalize'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getTokenValue } from '../../service/session'

const { width: screenWidth } = Dimensions.get('window');
export const Home = () => {

    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const [slide2, setSlide2] = useState(0)
    const [slide3, setSlide3] = useState(0)
    const [slide4, setSlide4] = useState(0)

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleVisiMisi, setModalVisibleVisiMisi] = useState(false);
    const [modalVisibleVideo, setModalVisibleVideo] = useState(false);


    const { berita, agenda, program, galeri, profile, visimisi, banner } = useSelector(state => state.superApps)

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
                    <Text style={{ marginLeft: 10, fontWeight: FONTWEIGHT.bold }}>{item.dari}</Text>
                    <Text style={{ marginLeft: 10, color: COLORS.lighter, marginVertical: 10, textAlign: 'left' }}> {item.subtitle} </Text>
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

    const bannerKegiatan = ({ item }, parallaxProps) => {
        return (
            <View style={styles.items}>
                <ParallaxImage
                    source={item.image}
                    containerStyle={styles.imageContainer}
                    style={styles.images}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                }}>
                    <View style={{
                        backgroundColor: COLORS.primary,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: 70,
                        opacity: 0.5
                    }} />
                    <Text style={{ color: COLORS.white, marginVertical: 20, marginHorizontal: 40, textAlign: 'center' }}>{item.deskripsi}</Text>
                </View>
            </View >
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

    const closeBottomSheet = () => {
        bottomSheetModalRef.current.collapse();
    };
    const navigation = useNavigation()

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

    // const [token, setToken] = useState('')

    // getTokenValue().then(val => {
    //     setToken(val)
    // })

    // console.log(token)

    return (
        <SafeAreaView style={{ flex: 1 }} key={1}>
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <ScrollView>
                        <View style={{ width: '100%', height: 170, position: 'absolute', top: 0, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
                            <Image source={require('../../assets/superApp/headerfix.png')} style={{ width: '100%', height: '100%', borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }} />
                        </View>

                        <View style={{ height: '3.5%', flexDirection: 'row', paddingTop: 20, gap: 20 }}>
                            <View style={{ paddingLeft: 20 }}>
                                <Ionicons name='notifications-outline' size={25} color={'white'} />
                            </View>
                            <View style={{ justifyContent: 'flex-end', flex: 1, marginTop: 5, flexDirection: 'row', gap: 10, marginRight: '11%' }}>
                                <View style={{}}>
                                    <Text style={{ color: COLORS.white, textAlign: 'right', fontWeight: FONTWEIGHT.bolder, marginBottom: 10, fontSize: FONTSIZE.H2 }}>{profile.nama}</Text>
                                    <Text style={{ color: COLORS.white, textAlign: 'right', fontSize: FONTSIZE.H3 }}>{profile.nip}</Text>
                                </View>
                                <View>
                                    <Image source={profile.avatar} style={{ width: 50, height: 50, borderRadius: 8 }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <CardApps
                                handlePressModal={handlePressModal}
                            />
                            <Portal>
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
                                    <View onLayout={handleContentLayout} >
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
                                    </View>
                                </BottomSheetModal>
                            </Portal>
                        </View>

                        <View style={[styles.containerr, { marginTop: 20 }]}>
                            <Carousel
                                ref={carouselRef}
                                sliderWidth={screenWidth}
                                sliderHeight={screenWidth}
                                itemWidth={screenWidth - 60}
                                data={banner}
                                renderItem={bannerKegiatan}
                                hasParallaxImages={true}
                            />
                        </View>

                        <View style={{ marginHorizontal: 30, marginTop: 20 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>Tautan Pintas</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20, marginLeft: 30 }}>
                            <CardTautan
                                setModalVisible={setModalVisible}
                            />
                        </View>

                        <View style={{ marginVertical: 20, marginLeft: 30, flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}>Video</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('')} style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3, flex: 1, color: '#1868AB' }}>Selengkapnya</Text>
                            </TouchableOpacity>
                        </View>

                        <CardVideo
                            setModalVisibleVideo={setModalVisibleVideo}
                        />

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisibleVideo}
                            onRequestClose={() => {
                                setModalVisibleVideo(!modalVisibleVideo);
                            }}
                        >
                            <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                            <View style={{ alignItems: 'center', flex: 1, display: 'flex', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisibleVideo(false)
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '15%',
                                        left: 20
                                    }}>

                                    <View style={{
                                        backgroundColor: COLORS.primary,
                                        width: 51,
                                        height: 51,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50
                                    }}>
                                        <Ionicons name='close-outline' color={COLORS.white} size={24} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: 380, height: 283 }} >
                                    <YoutubePlayer
                                        height={300}
                                        play={playing}
                                        videoId={"tV6yMXX2hPs"}
                                        onChangeState={onStateChange}
                                    />
                                </View>
                            </View>
                        </Modal>

                        <View style={{ marginTop: 15, alignItems: 'center' }}>
                            <CardVisiMisi
                                setModalVisibleVisiMisi={setModalVisibleVisiMisi}
                            />
                        </View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisibleVisiMisi}
                            onRequestClose={() => {
                                setModalVisibleVisiMisi(!modalVisibleVisiMisi);
                            }}
                        >
                            <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <View style={{ backgroundColor: COLORS.white, width: '90%', height: 500, borderRadius: 10, marginTop: 100 }}>

                                    <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 20, alignItems: 'flex-end' }} onPress={() => { setModalVisibleVisiMisi(false) }}>
                                        <Ionicons name='close-outline' size={24} />
                                    </TouchableOpacity>

                                    <View style={styles.cardVisiMisi}>
                                        <Text style={{ color: COLORS.white, textAlign: 'center', marginVertical: 5 }}>VISI KKP</Text>
                                    </View>
                                    <Text style={{ marginHorizontal: 30, fontSize: FONTSIZE.H4, marginTop: 20 }}>{visimisi.visi}</Text>

                                    <View style={[styles.cardVisiMisi, { marginTop: 20 }]}>
                                        <Text style={{ color: COLORS.white, textAlign: 'center', marginVertical: 5 }}>MISI KKP</Text>
                                    </View>

                                    {visimisi.misi.map((item, index) =>
                                        <View key={index} style={{ flexDirection: 'row', gap: 10, marginLeft: 30, marginTop: 20 }}>
                                            <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: COLORS.primary, marginTop: 5 }} />
                                            <Text style={{ width: 260, fontSize: FONTSIZE.H4 }}>{item.text}</Text>
                                        </View>
                                    )}

                                </View>
                            </View>
                        </Modal>

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

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <View style={{ backgroundColor: COLORS.white, width: '90%', height: 500, borderRadius: 10, marginTop: 100 }}>

                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>Kerumahtanggaan</Text>
                                        <TouchableOpacity style={{ alignItems: 'flex-end', flex: 1 }} onPress={() => { setModalVisible(false) }}>
                                            <Ionicons name='close-outline' size={24} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 20 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/superApp/Tp1.png')} style={{ width: 48, height: 48 }} />
                                            <Text style={{ fontSize: FONTSIZE.H4 }}>Semar</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/superApp/Tp2.png')} style={{ width: 48, height: 48 }} />
                                            <Text style={{ fontSize: FONTSIZE.H4 }}>Sistolik</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/superApp/Tp3.png')} style={{ width: 48, height: 48 }} />
                                            <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Bus Jemputan</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>Pengawasan</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 20 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Lapor.go.id</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>WBS KKP</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Sidak</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>JDIH</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>Kinerja dan Pengembangan Pegawai</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 20, }}>
                                        <View>
                                            <View>
                                                <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            </View>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Emonev{'\n'} Bapennas</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            </View>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Kinerjaku</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            </View>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>E-Milea</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            </View>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>E-Kinerja {'\n'}BKN</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                                            </View>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>SIASN{'\n'} BKN</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </Modal>

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
                                dotColor={'black'}
                                inactiveDotColor={COLORS.grey}
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
                                dotColor={'black'}
                                inactiveDotColor={COLORS.grey}
                                dotStyle={styles.paginationDot}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                activeDotIndex={slide3}
                                carouselRef={carouselRef}
                                tappableDots={!!carouselRef}
                            />
                        </View>

                        <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2, }}>Galeri</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('ListGaleri')} style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3, flex: 1, color: '#1868AB' }}>View all</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.containerr, { marginBottom: 80 }]}>
                            <Carousel
                                ref={carouselRef}
                                sliderWidth={screenWidth}
                                sliderHeight={screenWidth}
                                itemWidth={screenWidth - 60}
                                data={galeri.lists.slice(0, 3)}
                                renderItem={renderItem4}
                                hasParallaxImages={true}
                                onSnapToItem={setSlide4}
                            />
                            <Pagination
                                dotsLength={galeri.lists.slice(0, 3).length}
                                dotColor={'black'}
                                inactiveDotColor={COLORS.grey}
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
        </SafeAreaView>
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
    items: {
        width: screenWidth - 60,
        height: screenWidth - 170,
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
    images: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8,
    },
    galeri: {
        flex: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8
    },
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    cardVisiMisi: {
        backgroundColor: COLORS.primary,
        width: 77,
        height: 30,
        marginHorizontal: 15,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12
    }
});
