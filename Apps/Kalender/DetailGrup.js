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
import { AVATAR, COLORS, DATETIME, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
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



const { width: screenWidth } = Dimensions.get('window');

export const DetailGrup = () => {
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

    const { agenda, acara, detailGrup } = useSelector(state => state.grupKalender)

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

    console.log(detailGrup)

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
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.Judul }}>{detailGrup.name}</Text>
                                </View>

                                <View style={{
                                    marginHorizontal: 20,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    gap: 10
                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Dibuat oleh :</Text>
                                    <Text>{detailGrup.creator?.nama}</Text>
                                </View>

                                <View style={{
                                    marginHorizontal: 20,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    gap: 10
                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Pada :</Text>
                                    <Text>{moment(detailGrup.created_at, 'HH:mm:ss').format(DATETIME.LONG_DATE)}</Text>
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>PIC</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            {detailGrup.pic?.map((item, index) => {
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
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Ketentuan Busana</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detailGrup.extra_attributes.ketentuan_busana == null ? '-' : detailGrup.extra_attributes.ketentuan_busana}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Perlengkapan</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detailGrup.extra_attributes.perlengkapan == null ? '-' : detailGrup.extra_attributes.perlengkapan}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Atribut Lainnya</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detailGrup.extra_attributes.atribut == null ? '-' : detailGrup.extra_attributes.atribut}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Grup Editor</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            {detailGrup.editors?.map((item, index) => {
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
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Anggota</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            {detailGrup.members?.map((item, index) => {
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
