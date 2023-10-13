import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { useEffect } from 'react'
import { Image } from 'react-native'
import { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setAgendaDetail } from '../../store/GrupKalender'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'


const data =
{
    gambar: [
        {
            image: require('../../assets/superApp/Cover.png')
        },
        {
            image: require('../../assets/superApp/Cover.png')
        },
        {
            image: require('../../assets/superApp/Cover.png')
        },
        {
            image: require('../../assets/superApp/Cover.png')
        },
        {
            image: require('../../assets/superApp/Cover.png')
        },
    ],
    judul: 'Fish Finger',
    nama: 'Alto Belly',
    tanggal: '24 januari 2023',
    member: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
    ],
    lokasi: 'Jakarta Pusat',
    busana: 'Formal',
    pengingat: 'Alto Belly',
    deskripsi: "Fish Finger merupakan produk olahan ikan terbuat dari surimi ikan atau potongan daging ikan putih, yang kemudian dilapisi tepung roti lalu digoreng dan dapat juga dikemas menjadi olahan makanan beku Before you get into the nitty-gritty of coming up with a perfect title, start with a rough draft: your working title. What is that, exactly? A lot of people confuse working titles with topics. Let's clear that Topics are very general and could yield several different blog posts. Think raising healthy kids, or kitchen storage. A writer might look at either of those topics and choose to take them in very, very different directions.A working title, on the other hand, is very specific and guides the creation of a single blog post. For example, from the topic raising healthy kids, you could derive the following working title See how different and specific each of those is? That's what makes them working titles, instead of overarching topics. Unprecedented Challenge Preliminary thinking systems Bandwidth efficient Green space Social impact Thought partnership Fully ethical life",
    disukai: '324',
    orangSuka: [
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
        {
            avatar: AVATAR.U2,
            nama: 'Rizky Novriansyah',
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
        },
    ],
    dilihat: '45',
    jmlKomentar: '2',
    Komentar: [
        {
            id: '1',
            avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
            nama: 'Yani Dama Putera',
            tanggal: '23 Januari 2023',
            jam: '14.01',
            isi: 'Informasi yang bermanfaat',
            jmlhBalas: '1',
            balas:
                [
                    {
                        idBalas: '1.1',
                        avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                        nama: 'Rizky Novriansyah',
                        tanggal: '24 Januari 2023',
                        jam: '14.01',
                        isi: 'Terima Kasih',
                    },

                    {
                        idBalas: '1.2',
                        avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                        nama: 'Rizky Novriansyah',
                        tanggal: '24 Januari 2023',
                        jam: '14.01',
                        isi: 'Terima Kasih',
                    }

                ],

        },
        {
            id: '2',
            avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
            nama: 'Salies Apriliyanto',
            tanggal: '22 Januari 2023',
            jam: '14.01',
            isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
            jmlhBalas: '1',
            balas:
                [
                    {

                        idBalas: '2.1',
                        avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                        nama: 'Rizky Novriansyah',
                        tanggal: '24 Januari 2023',
                        jam: '14.01',
                        isi: 'Terima Kasih',

                    }
                ],
        }
    ]
}

const renderItem = ({ item }, parallaxProps) => {
    return (
        <View style={styles.item}>
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

const { width: screenWidth } = Dimensions.get('window');

export const DetailAcara = () => {
    const [tabItemIndex, setTabItemIndex] = useState();
    const [slide, setSlide] = useState(0)
    const [komen, setKomen] = useState('')
    const carouselRef = useRef(null);
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null);
    const initialSnapPoints = useMemo(() => ["95%"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present()
    }

    const dispatch = useDispatch()

    const { agenda, acara } = useSelector(state => state.grupKalender)

    const detail = acara.detail
    const gambar = agenda.detail.gambar

    const [toggleComment, setToggleComment] = useState({
        toggle: false,
        // id: data[0].Komentar[0].id
    })
    const clickBalas = (id, temp) => {
        setToggleComment({
            toggle: temp,
            id: id
        })
    }

    console.log(detail)

    return (
        <SafeAreaView>
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <ScrollView>
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
                                <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Detail Acara</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{ backgroundColor: COLORS.white, width: '90%', borderRadius: 8, marginLeft: 20 }}>

                                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.Judul }}>{detail.name}</Text>
                                </View>

                                <View style={{
                                    marginHorizontal: 20,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    gap: 10
                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Dibuat Pada :</Text>
                                    <Text>{moment(detail.created_at, 'DD MMMM YYYY HH:mm:ss').format('YYYY MMMM DD')}</Text>
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Lokasi</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detail.location}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Waktu Mulai</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{moment(detail.start_date).format('YYYY MMMM DD')}</Text>
                                        </View>
                                    </View>

                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Waktu Selesai</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{moment(detail.end_date).format('YYYY MMMM DD')}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>PIC</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            {detail.pic?.map((item, index) => {
                                                return (
                                                    <View key={index} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                        <Image source={{ uri: item.avatar_url }} style={{
                                                            marginLeft: -8,
                                                            borderWidth: 2,
                                                            borderRadius: 50,
                                                            borderColor: COLORS.white,
                                                            width: 30,
                                                            height: 30
                                                        }} />
                                                        <Text>{item.nama}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Anggota</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            {detail.members?.map((item, index) => {
                                                return (
                                                    <View key={index}>
                                                        <Image source={{ uri: item.avatar_url }} style={{
                                                            marginLeft: -8,
                                                            borderWidth: 2,
                                                            borderRadius: 50,
                                                            borderColor: COLORS.white,
                                                            width: 30,
                                                            height: 30
                                                        }} />
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Ketentuan Busana</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detail.dresscode == null ? '-' : detail.dresscode}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Pengingat</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detail.reminder}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginVertical: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Catatan</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detail.catatan == null ? '-' : detail.catatan}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{
                                backgroundColor: COLORS.primary,
                                width: '90%',
                                marginHorizontal: 20,
                                marginVertical: 20,
                                padding: 15,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: COLORS.white }}>Hapus</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{
                                borderColor: COLORS.primary,
                                width: '90%',
                                marginHorizontal: 20,
                                padding: 15,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1
                            }}
                        >
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,// Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 40,
        marginTop: 20
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8
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
    },
    container: {
        marginTop: 20,
        flex: 1,
    },
})
