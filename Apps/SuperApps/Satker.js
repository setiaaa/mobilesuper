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
import { CardLiniMasaSatker } from '../../components/CardLinimasaSatker';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { CardUltah } from '../../components/CardUltah';
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { useSelector } from 'react-redux';



const { width: screenWidth } = Dimensions.get('window');

export const Satker = () => {
    const carouselRef = useRef(null);

    const [entries, setEntries] = useState([]);
    // const [berita, setBerita] = useState([]);
    const [selected, setSelected] = useState('');

    const [slide, setSlide] = useState()
    const [slide2, setSlide2] = useState()

    // useEffect(() => {
    //     setEntries(ENTRIES);
    //     setBerita(Berita);
    // }, []);

    const { berita, galeri, profile, mading, linimasa, ultah } = useSelector(state => state.superApps)

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={[styles.item, { marginVertical: 20 }]}>
                <ParallaxImage
                    source={item.image}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    };

    const renderItem2 = ({ item, index }, parallaxProps) => {
        return (
            <View style={[styles.item, { marginVertical: 20, }]}>
                <ParallaxImage
                    source={item.image2}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{ backgroundColor: COLORS.white, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Image source={item.avatar} style={{ borderRadius: 50 }} />
                        <View>
                            <Text style={{ marginLeft: 10, marginVertical: 10, fontSize: 12, fontWeight: 600, color: '#1868AB' }}>{item.nama}</Text>
                            <Text style={{ marginLeft: 8, color: COLORS.lighter }}> {item.tanggal} </Text>
                        </View>
                    </View>
                    <Text style={{ marginVertical: 20 }}>{item.deskripsi}</Text>
                </View>
            </View>
        );
    };

    const CardLiniMasaSatker = ({ image, judul, nama, jenis }) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginVertical: 20, marginLeft: 30 }}>
                    <Image source={image} style={{ width: 80, height: 80 }} />
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ width: '90%' }}>
                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>{judul}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 5,
                                backgroundColor: jenis === 'Penelitian' ? COLORS.warningLight : jenis === 'Kegiatan' ? COLORS.infoLight : COLORS.successLight,
                                borderRadius: 30,
                                height: 30,
                                width: 90,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                {jenis === 'Penelitian' ? (
                                    <Ionicons name='document-outline' color={'#F6AD1D'} style={{ marginTop: 2 }} />
                                ) : jenis === 'Kegiatan' ? (
                                    <Ionicons name='analytics-outline' color={'#1868AB'} style={{ marginTop: 3 }} />
                                ) : (
                                    <Ionicons name='videocam-outline' color={'#11C15B'} style={{ marginTop: 2 }} />
                                )}
                                <Text style={{ color: jenis === 'Penelitian' ? COLORS.warning : jenis === 'Kegiatan' ? COLORS.info : COLORS.success }}>{jenis}</Text>
                            </View>

                            {/* <Divider bold style={{ transform: [{ rotate: '90deg' }], width: 5 }} /> */}
                            <Text style={{ fontSize: 11, color: COLORS.lighter }}>| {nama}</Text>

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

    const navigation = useNavigation()

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ backgroundColor: COLORS.primary, flexDirection: 'row', gap: 20, paddingTop: 20, height: 120 }}>
                <View style={{ paddingLeft: 20 }}>
                    <Ionicons name='notifications-outline' size={25} color={COLORS.white} />
                </View>
                <View style={{ marginLeft: '7%', marginTop: 5 }}>
                    <Text style={{ color: 'white', textAlign: 'right', fontWeight: FONTWEIGHT.bold, marginBottom: 10 }}>{profile.nama}</Text>
                    <Text style={{ color: 'white', textAlign: 'right', fontSize: FONTSIZE.H3 }}>{profile.nip}</Text>
                </View>
                <View>
                    <Image source={profile.avatar} style={{ width: 50, height: 50 }} />
                </View>
            </View>

            <View>
                <View style={{ height: '40%', backgroundColor: COLORS.primary, width: '100%', position: 'absolute' }} />
                <CardSatker />
            </View>

            <View style={[styles.containerr]}>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    data={galeri}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    onSnapToItem={setSlide}
                />
                <Pagination
                    dotsLength={galeri.length}
                    inactiveDotColor={'black'}
                    dotStyle={styles.paginationDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    activeDotIndex={slide}
                    carouselRef={carouselRef}
                    tappableDots={!!carouselRef}
                />
            </View>

            <View style={[styles.containerr]}>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    data={mading}
                    renderItem={renderItem2}
                    hasParallaxImages={true}
                    onSnapToItem={setSlide2}
                />
                <Pagination
                    dotsLength={mading.length}
                    inactiveDotColor={'black'}
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
                        data={linimasa}
                        renderItem={({ item }) => <CardLiniMasaSatker
                            image={item.image}
                            judul={item.judul}
                            nama={item.nama}
                            jenis={item.jenis}
                            item={item}
                        />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
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
            <View style={{ marginTop: 20, marginBottom: 40 }}>
                <CardUltah
                    ultah={ultah}
                />
            </View>

        </ScrollView>
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
        // borderRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
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
    }
})
