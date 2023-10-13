import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { CardSatker } from '../../components/CardSatker';
import { StyleSheet } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { CardUltah } from '../../components/CardUltah';
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTokenValue } from '../../service/session';
import { getBennerSatker, getGallerySatker, getPesan, getSatkerLinimasa, getSatkerNews, getUltah } from '../../service/api';

const BannerSetjen = [
    {
        image: require('../../assets/superApp/setjen_1.jpg'),
        title: 'Pelantikan CPNS menjadi PNS di Lingkup Sekretariat Jenderal',
        additional_title: 'Kementerian Kelautan dan Perikanan melantik 10 Kepala Pelabuhan Perikanan pada Jumat '
    },
    {
        image: require('../../assets/superApp/setjen_2.jpg'),
        title: 'Sekjen KKP, Antam Novambar melantik Dewan Pengawas BLU LPMUKP',
        additional_title: 'Sekretaris Jenderal KKP, Antam Novambar melantik Dewan Pengawas untuk Badan Layanan Umum Lembaga Pengelola Modal Usaha Kelautan dan Perikanan (BLU LPMUKP) di Kantor Pusat KKP'
    },
    {
        image: require('../../assets/superApp/setjen_3.jpg'),
        title: 'Sosialisasi Zona Integritas dan Penandatanganan Pakta Integritas Petugas Pelayanan Terpadu Satu Pintu Kementerian Kelautan dan Perikanan (PTSP KKP)',
        additional_title: 'Pada hari Selasa (20/8) telah dilaksanakan Sosialisasi Zona Integritas dan Penandatanganan Pakta Integritas Petugas Pelayanan Terpadu Satu Pintu Kementerian Kelautan dan Perikanan (PTSP KKP)'
    }
]



const { width: screenWidth } = Dimensions.get('window');

export const Satker = () => {
    const carouselRef = useRef(null);

    const [entries, setEntries] = useState([]);
    // const [berita, setBerita] = useState([]);
    const [selected, setSelected] = useState('');

    const [slide, setSlide] = useState(0)
    const [slide2, setSlide2] = useState(0)
    const [token, setToken] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getBennerSatker(token))
            dispatch(getGallerySatker(token))
            dispatch(getSatkerNews(token))
            dispatch(getPesan(token))
            dispatch(getUltah(token))
            dispatch(getSatkerLinimasa(token))
        }
    }, [token])

    // useEffect(() => {
    //     setEntries(ENTRIES);
    //     setBerita(Berita);
    // }, []);


    const { benner, gallery, berita, pesan, ultah, linimasa } = useSelector(state => state.satker)
    const { profile } = useSelector((state) => state.superApps);

    console.log(profile.satuan_kerja_nama)

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={[styles.item, { marginVertical: 20 }]}>
                <ParallaxImage
                    source={{ uri: item.main_images.image }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    };

    const renderItem2 = ({ item, index }, parallaxProps) => {
        const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge"
        return (
            <>
                <View style={[styles.items, { marginTop: 20 }]}>
                    <ParallaxImage
                        source={{ uri: item.image }}
                        containerStyle={styles.imageContainer}
                        style={styles.images}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                </View>
                <View style={{ backgroundColor: COLORS.white, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Image source={{ uri: BASE_URL + item.avatar }} style={{ borderRadius: 50, width: 60, height: 60 }} />
                        <View>
                            <Text style={{ marginLeft: 10, marginVertical: 10, fontSize: 12, fontWeight: 600, color: '#1868AB' }}>{item.nama}</Text>
                            <Text style={{ marginLeft: 8, color: COLORS.lighter }}> {item.created_at} </Text>
                        </View>
                    </View>
                    <Text style={{ marginVertical: 20 }}>{item.content}</Text>
                </View>
            </>
        );
    };

    const CardLiniMasaSatker = ({ image, judul, nama, jenis, index, item }) => {
        return (
            <View key={index} style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <Image source={{ uri: item.cover }} style={{ width: 80, height: 80 }} />
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ width: '88%' }}>
                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>{item.title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 5,
                                backgroundColor: item.category === 'Video / Jurnal' ? COLORS.successLight : item.category === 'Infografis' ? COLORS.warningLight : COLORS.infoLight,
                                borderRadius: 30,
                                height: 30,
                                width: 110,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                {item.category === 'Infografis' ? (
                                    <Ionicons name='document-outline' color={'#F6AD1D'} style={{ marginTop: 2 }} />
                                ) : item.category === 'Kegiatan' ? (
                                    <Ionicons name='analytics-outline' color={'#1868AB'} style={{ marginTop: 3 }} />
                                ) : (
                                    <Ionicons name='videocam-outline' color={'#11C15B'} style={{ marginTop: 2 }} />
                                )}
                                <Text style={{ color: item.category === 'Infografis' ? COLORS.warning : item.category === 'Kegiatan' ? COLORS.info : COLORS.success }}>{item.category}</Text>
                            </View>

                            {/* <Divider bold style={{ transform: [{ rotate: '90deg' }], width: 5 }} /> */}
                            {/* custom divider */}
                            <View style={{ height: '100%', width: 1, backgroundColor: '#DBDADE' }} />
                            <Text style={{ fontSize: 11, color: COLORS.lighter, width: 100 }}>{item.creator.name}</Text>

                        </View>
                    </View>
                </View >
                <Divider bold style={{ width: '90%' }} />
            </View>
        )
    }

    const renderItem3 = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.image }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{ marginLeft: 10, color: '#6B7280', marginVertical: 10 }}>{item.title}</Text>
                </View>
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
                    <Text numberOfLines={2} style={{ color: COLORS.white, marginVertical: 20, marginHorizontal: 40, textAlign: 'center' }}>{item.title}</Text>
                </View>
            </View >
        );
    };

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{ flexGrow: 1 }}
                nestedScrollEnabled={true}
            >
                <View style={{ width: '100%', height: 170, position: 'absolute', top: 0, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
                    <Image source={require('../../assets/superApp/headerfix.png')} style={{ width: '100%', height: '100%', borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }} />
                </View>

                <View style={{ flexDirection: 'row', gap: 20, paddingTop: 20, height: 120 }}>
                    <View style={{ paddingLeft: 20 }}>
                        <Ionicons name='notifications-outline' size={25} color={COLORS.white} />
                    </View>
                    <View style={{ justifyContent: 'flex-end', flex: 1, marginTop: 5, flexDirection: 'row', gap: 10, marginRight: '11%' }}>
                        <View style={{}}>
                            <Text style={{ color: COLORS.white, textAlign: 'right', fontWeight: FONTWEIGHT.bolder, marginBottom: 10, fontSize: FONTSIZE.H2 }}>{profile.nama}</Text>
                            <Text style={{ color: COLORS.white, textAlign: 'right', fontSize: FONTSIZE.H3 }}>{profile.nip}</Text>
                        </View>
                        <View>
                            <Image source={{
                                uri:
                                    "https://apigw.kubekkp.coofis.com/" +
                                    "bridge/" +
                                    profile.avatar,
                            }}
                                style={{ width: 50, height: 50, borderRadius: 8 }} />
                        </View>
                    </View>
                </View>

                <CardSatker profile={profile} />

                <View style={[styles.containerr, { marginTop: 20 }]}>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={benner.length === 0 ? BannerSetjen : benner}
                        renderItem={bannerKegiatan}
                        hasParallaxImages={true}
                    />
                </View>

                <View style={[styles.containerr, { marginTop: 20 }]}>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={gallery.results?.slice(0, 3)}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                        onSnapToItem={setSlide}
                    />
                    <Pagination
                        dotsLength={gallery.results?.slice(0, 3).length}
                        dotColor={'black'}
                        inactiveDotColor={COLORS.grey}
                        dotStyle={styles.paginationDot}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        activeDotIndex={slide}
                        carouselRef={carouselRef}
                        tappableDots={!!carouselRef}
                    />
                </View>

                <View style={{ marginLeft: 30, flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: FONTSIZE.H2 }}>Berita Terkini</Text>
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
                            data={berita.lists}
                            renderItem={renderItem3}
                            hasParallaxImages={true}
                        />
                    </View>
                </View>

                <View style={[styles.containerr, { marginVertical: 20 }]}>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={pesan}
                        renderItem={renderItem2}
                        hasParallaxImages={true}
                        onSnapToItem={setSlide2}
                    />
                    <Pagination
                        dotsLength={pesan.length}
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
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: COLORS.primary }
                    }}
                    style={{ width: '90%', marginLeft: 20, borderRadius: 16 }}
                    theme={{
                        arrowColor: COLORS.primary,
                        selectedDayBackgroundColor: COLORS.primary,
                        todayTextColor: COLORS.primary,
                    }}
                />
                <View style={[styles.cardListSatker, { flex: 1, justifyContent: 'center', paddingVertical: 40 }]}>
                    <Text style={{ marginLeft: 20, fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.Judul }}>Linimasa Pengetahuan</Text>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            scrollEnabled={false}
                            data={linimasa}
                            renderItem={({ item, index }) => <CardLiniMasaSatker
                                item={item}
                                index={index}
                            />
                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 40 }}>
                    <CardUltah
                        ultah={ultah}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    galeri: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8
    },
    containerr: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    images: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    items: {
        width: screenWidth - 60,
        height: screenWidth - 170,
    },
    cardListSatker: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        width: '90%',
        marginLeft: 20,
        opacity: 0.9,
        borderRadius: 12,
        marginVertical: 40
    },
    vertical: {
        rotation: 12
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8,
    },
})
