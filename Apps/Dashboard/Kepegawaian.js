import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TopsDash } from '../Korespondensi/AppNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setBerita, setPengumuman } from '../../store/Dashboard'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { useRef } from 'react'

const beritas = [
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/berita.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
        image: require('../../assets/superApp/berita.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
        image: require('../../assets/superApp/berita.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        title: 'KKP RESMI PUNYA LOGO BARU',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/logobaru.png'),
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
        pembuat: 'Firman Hidranto',
        dilihat: '219'
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        title: 'KKP RESMI PUNYA LOGO BARU',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/logobaru.png'),
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
        pembuat: 'Firman Hidranto',
        dilihat: '219'
    },
];

const dataPengumuman = [
    {
        judul: 'Daftar Nama PNS Pensiun dan Ahli Waris TMT 30 Desember 2020',
        tanggal: '31 Desember 2021'
    },
    {
        judul: 'Pengumuman Pengembalian Dana PNS Pensiun dan Ahli Waris Tahap V',
        tanggal: '01 Desember 2021'
    },
    {
        judul: 'Pengumuman Pengembalian Dana PNS Pensiun dan Ahli Waris Tahap III melalui BRI',
        tanggal: '06 Desember 2021'
    },
    {
        judul: 'Data PNS Ahli Waris',
        tanggal: '27 Desember 2021'
    },
    {
        judul: 'Surat Pernyataan Pengembalian Tabungan',
        tanggal: '23 Desember 2021'
    },
    {
        judul: 'Surat Pernyataan Pengembalian Tabungan',
        tanggal: '23 Desember 2021'
    },
    {
        judul: 'Surat Pernyataan Pengembalian Tabungan',
        tanggal: '23 Desember 2021'
    },
    {
        judul: 'Surat Pernyataan Pengembalian Tabungan',
        tanggal: '23 Desember 2021'
    },
    {
        judul: 'Surat Pernyataan Pengembalian Tabungan',
        tanggal: '23 Desember 2021'
    },
    {
        judul: 'Surat Pernyataan Pengembalian Tabungan',
        tanggal: '23 Desember 2021'
    },
    {
        judul: 'Surat Pernyataan Pengembalian Tabungan',
        tanggal: '23 Desember 2021'
    },
];


const { width: screenWidth } = Dimensions.get('window');

export const Kepegawaian = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setBerita(beritas))
        dispatch(setPengumuman((dataPengumuman)))
    }, []);

    const { berita, pengumuman } = useSelector(state => state.dashboard)
    const navigation = useNavigation()

    const carouselRef = useRef(null);

    const renderBerita = ({ item, index }, parallaxProps) => {
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            borderRadius: 20,
                            width: 28,
                            height: 28,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 20
                        }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Kepegawaian</Text>
                        </View>
                    </View>

                    <View style={{ height: '100%' }}>
                        <TopsDash />
                    </View>

                    {/* <ScrollView style={{ flex: 1 }}>

                        <View>
                            <View style={{ marginVertical: 20, marginLeft: 30, flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}>Berita Terkini</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('ListBerita')} style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3, flex: 1, color: '#1868AB' }}>View all</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <View style={styles.containerr}>
                                <Carousel
                                    ref={carouselRef}
                                    sliderWidth={screenWidth}
                                    sliderHeight={screenWidth}
                                    itemWidth={screenWidth - 60}
                                    data={berita.lists.slice(0, 3)}
                                    renderItem={renderBerita}
                                    hasParallaxImages={true}
                                />
                            </View>
                        </View>

                        <View>
                            <View style={{ marginVertical: 20, marginLeft: 30, flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}>Pengumuman</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('DetailPengumuman')} style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3, flex: 1, color: '#1868AB' }}>View all</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '87%', backgroundColor: COLORS.white, marginLeft: 30, borderRadius: 16 }}>
                            {pengumuman.lists.slice(0, 5).map((item) =>
                                <View style={{ marginHorizontal: 20 }}>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>
                                    </View>
                                    <View style={{ marginVertical: 10 }}>
                                        <Text style={{ color: COLORS.lighter }}>{item.tanggal}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: COLORS.lighter, opacity: 0.5, marginBottom: 10 }} />
                                </View>
                            )}
                        </View>

                    </ScrollView> */}
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
        marginHorizontal: 8
    },

});
