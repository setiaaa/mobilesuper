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

const ENTRIES1 = [
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/Card.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
        image: require('../../assets/superApp/Card.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
        image: require('../../assets/superApp/Card.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
        image: require('../../assets/superApp/Card.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
        image: require('../../assets/superApp/Card.png')
    },
];

const ENTRIES2 = [
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/Rectangle.png')
    },
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/Rectangle.png')
    },
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/Rectangle.png')
    },
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/Rectangle.png')
    },
    {
        ttitle: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/Rectangle.png')
    },
];

const ENTRIES3 = [
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/Rectangle2.png')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/Rectangle2.png')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/Rectangle2.png')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/Rectangle2.png')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/Rectangle2.png')
    },
];

const ENTRIES4 = [
    {
        image: require('../../assets/superApp/Photo.png')
    },
    {
        image: require('../../assets/superApp/Photo.png')
    },
    {
        image: require('../../assets/superApp/Photo.png')
    },
    {
        image: require('../../assets/superApp/Photo.png')
    },
    {
        image: require('../../assets/superApp/Photo.png')
    },
];

const { width: screenWidth } = Dimensions.get('window');
export const Home = () => {
    const CarouselData = [
        {
            image: require('../../assets/superApp/Card.png')
        },
        {
            image: require('../../assets/superApp/Card.png')
        },
        {
            image: require('../../assets/superApp/Card.png')
        },
        {
            image: require('../../assets/superApp/Card.png')
        },
    ];

    const [entries, setEntries] = useState([]);
    const [entries2, setEntries2] = useState([]);
    const [entries3, setEntries3] = useState([]);
    const [entries4, setEntries4] = useState([]);

    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const [slide, setSlide] = useState()
    const [slide2, setSlide2] = useState()
    const [slide3, setSlide3] = useState()
    const [slide4, setSlide4] = useState()

    useEffect(() => {
        setEntries(ENTRIES1);
        setEntries2(ENTRIES2);
        setEntries3(ENTRIES3);
        setEntries4(ENTRIES4);
    }, []);



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
                    <Text style={{ marginLeft: 10, color: '#6B7280', marginVertical: 10 }}>{item.tanggal}</Text>
                    <Text style={{ marginLeft: 10, color: '#6B7280' }}> {item.subtitle} </Text>
                    <Text style={{ marginLeft: 10, color: '#111827', marginVertical: 10 }}>{item.dari}</Text>
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
                <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{
                        marginLeft: 10, color: '#111827',
                        marginVertical: 50,
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: 400
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
                <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{
                        marginLeft: 10, color: '#111827',
                        marginVertical: 50,
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: 400
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

    const initialSnapPoints = useMemo(() => ["50%", "CONTENT_HEIGHT"], [])
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
        <BottomSheetModalProvider>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#752A2B', height: '6%', flexDirection: 'row', gap: 20, paddingTop: 20 }}>
                    {/* <View style={{ width: '90%' }}>
                    <Search
                        placeholder={'Pencarian'}
                    />
                </View> */}
                    <View style={{ paddingLeft: 20 }}>
                        <Ionicons name='notifications-outline' size={25} color={'white'} />
                    </View>
                    <View style={{ marginLeft: '23%', marginTop: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'right', fontWeight: 800, marginBottom: 10 }}>YANI DAMA PUTERA</Text>
                        <Text style={{ color: 'white', textAlign: 'right', fontSize: 11 }}>Direktur Utama ARMS</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/superApp/img.png')} style={{ width: 50, height: 50 }} />
                    </View>
                </View>

                <View>
                    <View style={{ height: '20%', backgroundColor: '#752A2B', width: '100%', position: 'absolute' }} />
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
                                    <Text style={{ fontSize: 15, fontWeight: 600 }}>
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

                <View style={{ marginVertical: 20, marginLeft: 20, flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Berita Terkini</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ListBerita')} style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12, flex: 1, color: '#1868AB' }}>View all</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.containerr}>
                        <Carousel
                            ref={carouselRef}
                            sliderWidth={screenWidth}
                            sliderHeight={screenWidth}
                            itemWidth={screenWidth - 60}
                            data={entries}
                            renderItem={renderItem}
                            hasParallaxImages={true}
                        />
                    </View>
                    {/* <Carousel data={CarouselData} /> */}
                </View>

                <View style={{ marginVertical: 20, marginLeft: 20, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 13, }}>Agenda Prioritas KKP Dengan 5 Kebijakan</Text>
                </View>
                <View style={styles.containerr}>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={entries2}
                        renderItem={renderItem2}
                        hasParallaxImages={true}
                        onSnapToItem={setSlide2}
                    />
                    <Pagination
                        dotsLength={entries.length}
                        inactiveDotColor={'black'}
                        dotStyle={styles.paginationDot}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        activeDotIndex={slide2}
                        carouselRef={carouselRef}
                        tappableDots={!!carouselRef}
                    />
                </View>

                <View style={{ marginLeft: 20, marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 13, }}>7 Program Prioritas</Text>
                </View>

                <View style={styles.containerr}>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={entries3}
                        renderItem={renderItem3}
                        hasParallaxImages={true}
                        onSnapToItem={setSlide3}
                    />
                    <Pagination
                        dotsLength={entries2.length}
                        inactiveDotColor={'black'}
                        dotStyle={styles.paginationDot}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        activeDotIndex={slide3}
                        carouselRef={carouselRef}
                        tappableDots={!!carouselRef}
                    />
                </View>

                <View style={{ marginLeft: 20, marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 13, }}>Galeri</Text>
                </View>

                <View style={[styles.containerr, { marginBottom: 80 }]}>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={entries4}
                        renderItem={renderItem4}
                        hasParallaxImages={true}
                        onSnapToItem={setSlide4}
                    />
                    <Pagination
                        dotsLength={entries.length}
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
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
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
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8
    }
});
