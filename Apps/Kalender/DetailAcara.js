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


const data =
{
    gambar: [
        { image: require('../../assets/superApp/Cover.png') },
        { image: require('../../assets/superApp/Cover.png') },
        { image: require('../../assets/superApp/Cover.png') },
        { image: require('../../assets/superApp/Cover.png') },
        { image: require('../../assets/superApp/Cover.png') },
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
    console.log(item.gambar)
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
    const [gambar, setGambar] = useState([])
    const [slide, setSlide] = useState()
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

    useEffect(() => {
        // setGambar(data)
        dispatch(setAgendaDetail(data))
    }, []);

    const { agenda } = useSelector(state => state.grupKalender)

    const detail = agenda.detail

    const [toggleComment, setToggleComment] = useState({
        toggle: false,
        // id: data[0].Komentar[0].id
    })
    const clickBalas = (id, temp) => {
        setToggleComment({
            toggle: temp,
            id: id
        })
        console.log(id)
    }

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
                                <Carousel
                                    ref={carouselRef}
                                    sliderWidth={screenWidth}
                                    sliderHeight={screenWidth}
                                    itemWidth={screenWidth - 60}
                                    data={detail.gambar}
                                    renderItem={renderItem}
                                    hasParallaxImages={true}
                                    onSnapToItem={setSlide}
                                />
                                <Pagination
                                    dotsLength={detail.gambar?.length}
                                    inactiveDotColor={'black'}
                                    dotStyle={styles.paginationDot}
                                    inactiveDotOpacity={0.4}
                                    inactiveDotScale={0.6}
                                    activeDotIndex={slide}
                                    carouselRef={carouselRef}
                                    tappableDots={!!carouselRef}
                                />
                                <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.Judul }}>{detail.judul}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 20, alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ backgroundColor: '#FFD6D6', borderRadius: 30 }}>
                                        <Text style={{ marginHorizontal: 10, marginVertical: 5, color: COLORS.infoDanger }}>{detail.nama}</Text>
                                    </View>
                                    <View>
                                        <Text>{detail.tanggal}</Text>
                                    </View>
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Member</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            {detail.member?.map((item) => {
                                                return (
                                                    <Image source={item.avatar} style={{
                                                        marginLeft: -8,
                                                        borderWidth: 2,
                                                        borderRadius: 50,
                                                        borderColor: COLORS.white,
                                                    }} />
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Lokasi</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detail.lokasi}</Text>
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
                                            <Text>{detail.busana}</Text>
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
                                            <Text>{detail.pengingat}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'justify' }}>{detail.deskripsi}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View style={{ marginHorizontal: 20, marginVertical: 20, flexDirection: 'row', gap: 20 }}>
                                    <TouchableOpacity onPress={() => { setTabItemIndex(1) }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                            <Ionicons name='thumbs-up-outline' size={20} color={tabItemIndex === 1 ? COLORS.primary : null} />
                                            <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : null }}>{detail.disukai}</Text>
                                            <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : null }}>Disukai</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={bottomSheetAttach}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                            <Ionicons name='chatbox-ellipses-outline' size={20} />
                                            <Text>Komentar</Text>
                                        </View>
                                    </TouchableOpacity>

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
                                        <BottomSheetView onLayout={handleContentLayout} style={{}}>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 20 }}>
                                                    <Ionicons name='thumbs-up-outline' size={20} color={COLORS.primary} />
                                                    <Text style={{ color: COLORS.primary }}>{detail.disukai}</Text>
                                                    <Text style={{ color: COLORS.primary }}>Disukai</Text>
                                                    <TouchableOpacity onPress={() => navigation.navigate('ListSuka', { detail: detail })}>
                                                        <Ionicons name='chevron-forward-outline' size={20} color={COLORS.primary} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ marginLeft: 20, marginVertical: 20 }}>
                                                    <Text style={{ color: COLORS.ExtraDivinder }}>Komentar({detail.jmlKomentar})</Text>
                                                </View>
                                                <ScrollView style={{ flex: 1 }}>
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        //shadow ios
                                                        shadowOffset: { width: -2, height: 4 },
                                                        shadowColor: '#171717',
                                                        shadowOpacity: 0.2,
                                                    }}>
                                                        {detail.Komentar?.map((listData) => (
                                                            <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '90%', marginVertical: 5, elevation: 5 }}>
                                                                <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
                                                                    <View>
                                                                        <Image source={listData.avatarKomen} />
                                                                    </View>
                                                                    <View style={{ marginLeft: 10 }}>
                                                                        <Text style={{
                                                                            fontSize: FONTSIZE.H2,
                                                                            fontWeight: FONTWEIGHT.bold,
                                                                            lineHeight: 20,
                                                                            wordWrap: 'break-word'
                                                                        }}>
                                                                            {listData.nama}
                                                                        </Text>
                                                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                                                            <Text style={{
                                                                                color: COLORS.lighter,
                                                                                fontSize: FONTSIZE.H5,
                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                lineHeight: 18,
                                                                                wordWrap: 'break-word',
                                                                                marginBottom: 10
                                                                            }}>
                                                                                {listData.tanggal}
                                                                            </Text>
                                                                            <View style={{ height: '70%', width: 1, backgroundColor: '#DBDADE' }} />
                                                                            <Text style={{
                                                                                color: COLORS.lighter,
                                                                                fontSize: FONTSIZE.H5,
                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                lineHeight: 18,
                                                                                wordWrap: 'break-word'
                                                                            }}>
                                                                                {listData.jam}
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={{
                                                                            color: COLORS.lighter,
                                                                            fontSize: FONTSIZE.H5,
                                                                            fontWeight: FONTWEIGHT.normal,
                                                                            lineHeight: 18,
                                                                            wordWrap: 'break-word',
                                                                        }}>
                                                                            {listData.isi}
                                                                        </Text>
                                                                        {listData.jmlhBalas === '' ? (
                                                                            null
                                                                        ) : (
                                                                            <View>
                                                                                {
                                                                                    (!toggleComment.toggle && toggleComment.id === listData.id) || toggleComment.id !== listData.id && listData.jmlhBalas > 0 ? (
                                                                                        <TouchableOpacity
                                                                                            key={listData.id}
                                                                                            onPress={() => clickBalas(listData.id, true)}>
                                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
                                                                                                <View style={{ height: 1, width: 20, backgroundColor: '#DBDADE' }} />
                                                                                                <Text style={{
                                                                                                    color: COLORS.lighter,
                                                                                                    fontSize: FONTSIZE.H5,
                                                                                                    fontWeight: FONTWEIGHT.normal,
                                                                                                    lineHeight: 18,
                                                                                                    wordWrap: 'break-word',
                                                                                                }}>
                                                                                                    Tampilkan {listData.jmlhBalas} Balasan
                                                                                                </Text>
                                                                                            </View>
                                                                                        </TouchableOpacity>
                                                                                    ) : (
                                                                                        null
                                                                                    )
                                                                                }

                                                                                {listData.id === toggleComment.id && toggleComment.toggle ? (
                                                                                    <View>
                                                                                        {listData.balas?.map((listKomen, index) =>
                                                                                            <>
                                                                                                <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
                                                                                                    <View>
                                                                                                        <Image source={listKomen.avatarBalas} />
                                                                                                    </View>
                                                                                                    <View style={{ marginLeft: 10 }}>
                                                                                                        <Text style={{
                                                                                                            fontSize: FONTSIZE.H2,
                                                                                                            fontWeight: FONTWEIGHT.bold,
                                                                                                            lineHeight: 20,
                                                                                                            wordWrap: 'break-word'
                                                                                                        }}>
                                                                                                            {listKomen.nama}
                                                                                                        </Text>
                                                                                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                                                                                            <Text style={{
                                                                                                                color: COLORS.lighter,
                                                                                                                fontSize: FONTSIZE.H5,
                                                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                                                lineHeight: 18,
                                                                                                                wordWrap: 'break-word',
                                                                                                                marginBottom: 10
                                                                                                            }}>
                                                                                                                {listKomen.tanggal}
                                                                                                            </Text>
                                                                                                            <View style={{ height: '70%', width: 1, backgroundColor: '#DBDADE' }} />
                                                                                                            <Text style={{
                                                                                                                color: COLORS.lighter,
                                                                                                                fontSize: FONTSIZE.H5,
                                                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                                                lineHeight: 18,
                                                                                                                wordWrap: 'break-word'
                                                                                                            }}>
                                                                                                                {listKomen.jam}
                                                                                                            </Text>
                                                                                                        </View>
                                                                                                        <Text style={{
                                                                                                            color: '#999999',
                                                                                                            fontSize: FONTSIZE.H5,
                                                                                                            fontWeight: FONTWEIGHT.normal,
                                                                                                            lineHeight: 18,
                                                                                                            wordWrap: 'break-word',
                                                                                                        }}>
                                                                                                            {listKomen.isi}
                                                                                                        </Text>
                                                                                                        {
                                                                                                            listData.balas.length - 1 === index ? (
                                                                                                                <TouchableOpacity
                                                                                                                    key={listKomen.id}
                                                                                                                    onPress={() => clickBalas(listData.id, false)}>
                                                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
                                                                                                                        <View style={{ height: 1, width: 20, backgroundColor: '#DBDADE' }} />
                                                                                                                        <Text style={{
                                                                                                                            color: COLORS.lighter,
                                                                                                                            fontSize: FONTSIZE.H5,
                                                                                                                            fontWeight: FONTWEIGHT.normal,
                                                                                                                            lineHeight: 18,
                                                                                                                            wordWrap: 'break-word',
                                                                                                                        }}>
                                                                                                                            Tutup {listData.jmlhBalas} Balasan
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                            ) : null
                                                                                                        }
                                                                                                    </View>
                                                                                                    {/* {console.log(items.Komentar[0].balas[0].idBalas)} */}
                                                                                                </View>
                                                                                            </>
                                                                                        )}
                                                                                        {/* {console.log(items.Komentar[0].balas[0].idBalas)} */}
                                                                                    </View>
                                                                                ) : (
                                                                                    null
                                                                                )}
                                                                            </View>

                                                                        )}
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        )
                                                        )}
                                                    </View>
                                                </ScrollView>
                                                <View style={{ justifyContent: 'flex-end' }}>
                                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                                    <View style={{
                                                        borderWidth: 1,
                                                        width: '90%',
                                                        marginLeft: 17,
                                                        borderRadius: 16,
                                                        borderColor: COLORS.ExtraDivinder,
                                                        flexDirection: 'row',
                                                        backgroundColor: COLORS.ExtraDivinder,
                                                        marginTop: 10
                                                    }}
                                                    >
                                                        <BottomSheetTextInput
                                                            numberOfLines={1}
                                                            maxLength={40}
                                                            placeholder='Ketik Komentar Disini'
                                                            style={{ padding: 10 }}
                                                            onChangeText={setKomen}
                                                            value={komen}
                                                        />
                                                        <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                                            <TouchableOpacity >
                                                                <Ionicons name='send-sharp' size={20} color={COLORS.primary} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </BottomSheetView>
                                    </BottomSheetModal>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Ionicons name='eye-outline' size={20} />
                                        <Text>{detail.dilihat}</Text>
                                        <Text>Dilihat</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
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
