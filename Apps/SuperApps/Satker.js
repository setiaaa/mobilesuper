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

const ENTRIES = [
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.png'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.png'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.png'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.png'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.png'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
];

const data = [
    {
        id: '1',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',

    },
    {
        id: '2',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Kegiatan',
    },
    {
        id: '3',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Infografis',
    },
    {
        id: '4',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
    },
    {
        id: '5',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
    },
    {
        id: '6',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
    }
];

const Berita = [
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


const { width: screenWidth } = Dimensions.get('window');

export const Satker = () => {
    const carouselRef = useRef(null);

    const [entries, setEntries] = useState([]);
    const [berita, setBerita] = useState([]);
    const [selected, setSelected] = useState('');

    const [slide, setSlide] = useState()
    const [slide2, setSlide2] = useState()

    useEffect(() => {
        setEntries(ENTRIES);
        setBerita(Berita);
    }, []);

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
                <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Image source={item.avatar} style={{ borderRadius: 50 }} />
                        <View>
                            <Text style={{ marginLeft: 10, color: '#6B7280', marginVertical: 10, fontSize: 12, fontWeight: 600, color: '#1868AB' }}>{item.nama}</Text>
                            <Text style={{ marginLeft: 8, color: '#6B7280' }}> {item.tanggal} </Text>
                        </View>
                    </View>
                    <Text style={{ color: '#111827', marginVertical: 20 }}>{item.deskripsi}</Text>
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
                            <Text style={{ fontSize: 13, fontWeight: 600 }}>{judul}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 5,
                                backgroundColor: jenis === 'Penelitian' ? '#FEF2DB' : jenis === 'Kegiatan' ? '#E4EEF5' : '#D9F5E5',
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
                                <Text style={{ color: jenis === 'Penelitian' ? '#F6AD1D' : jenis === 'Kegiatan' ? '#1868AB' : '#11C15B' }}>{jenis}</Text>
                            </View>

                            {/* <Divider bold style={{ transform: [{ rotate: '90deg' }], width: 5 }} /> */}
                            <Text style={{ fontSize: 11, color: '#9F9EA3' }}>| {nama}</Text>

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
            <View style={{ backgroundColor: '#752A2B', flexDirection: 'row', gap: 20, paddingTop: 20, height: 120 }}>
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
                <View style={{ height: '40%', backgroundColor: '#752A2B', width: '100%', position: 'absolute' }} />
                <CardSatker />
            </View>

            <View style={[styles.containerr]}>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    data={entries}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    onSnapToItem={setSlide}
                />
                <Pagination
                    dotsLength={entries.length}
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
                    data={entries}
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
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: '#800000' }
                }}
                style={{ width: '90%', marginLeft: 20, borderRadius: 16 }}
                theme={{
                    arrowColor: '#800000',
                    selectedDayBackgroundColor: '#800000',
                    todayTextColor: '#800000',
                }}
            />
            <View style={[styles.cardListSatker, { flex: 1, justifyContent: 'center', paddingVertical: 40 }]}>
                <Text style={{ marginLeft: 20, color: '#111827', fontWeight: 600, fontSize: 17 }}>Linimasa Pengetahuan</Text>
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={data}
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
            <View style={{ marginLeft: 20, flexDirection: 'row', marginBottom: 20 }}>
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
                        data={berita}
                        renderItem={renderItem3}
                        hasParallaxImages={true}
                    />
                </View>
            </View>
            <View style={{ marginTop: 20, marginBottom: 40 }}>
                <CardUltah />
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
