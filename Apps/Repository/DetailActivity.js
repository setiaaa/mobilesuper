import React, { useRef } from 'react'
import { Platform, View } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Divider } from 'react-native-paper';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react'
import { BottomTabsDetailRepo } from '../Korespondensi/AppNavigator';
import { useState } from 'react';
import { useEffect } from 'react';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Portal } from 'react-native-portalize';

// const item = {
//     judul: 'Business Agility with Scrum',
//     subjudul: 'Business Agility Scrum 2023 with All Employee',
//     tanggal: '16 Mei 2023',
//     nama: 'Rizky Novriansyah',
//     unit: 'Unit Kelompok Fungsional',
//     tempat: 'Golden Tulip Kota Malang',
//     deskripsi: 'Agile adalah metode atau kerangka kerja yang memiliki prinsip “bertahap dan berulang”. Dengan begitu, proses pengembangannya dapat berjalan dengan cepat, selesai tepat waktu, dan tentunya dengan hasil yang berkualitas tinggi.',
//     image: require('../../assets/superApp/AvatarDetail.png'),
//     subimage: [
//         { image: require('../../assets/superApp/AvatarDetail.png') },
//         { image: require('../../assets/superApp/AvatarDetail.png') },
//         { image: require('../../assets/superApp/AvatarDetail.png') },
//     ],
//     dibagikan: [
//         {
//             avatarDibagikan: require('../../assets/superApp/AvatarDetail.png'),
//             jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
//             nama: 'Rizky Novriansyahh',
//         },
//         {
//             avatarDibagikan: require('../../assets/superApp/AvatarDetail.png'),
//             jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
//             nama: 'Rizky Novriansyahh',
//         },
//         {
//             avatarDibagikan: require('../../assets/superApp/AvatarDetail.png'),
//             jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
//             nama: 'Rizky Novriansyahh'
//         },
//     ]
// }


export const DetailActivity = () => {
    // const { item } = route.params
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present()
    }
    const { dokumen } = useSelector(state => state.repository)
    const detail = dokumen.detail

    console.log(detail)

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 20,
                            width: 28,
                            height: 28,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 20
                        }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={'#800000'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{detail.judul}</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>{detail.subjudul}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        marginHorizontal: 20
                    }}>
                        <Image source={detail.image} />
                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal, color: '#1868AB' }}>{detail.nama}</Text>
                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal }}>|  {detail.unit}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        gap: 40,
                        alignItems: 'center',
                        marginHorizontal: 20,
                        marginTop: 10
                    }}>
                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal, color: COLORS.lighter }}>Tanggal Acara</Text>
                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal, }}>:  {detail.tanggal}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        gap: 42,
                        alignItems: 'center',
                        marginHorizontal: 20,
                        marginTop: 10
                    }}>
                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal, color: COLORS.lighter }}>Tempat Acara</Text>
                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal }}>:  {detail.tempat}</Text>
                    </View>
                    <View style={{ marginVertical: 30, width: '90%', marginHorizontal: 20 }}>
                        <Divider bold />
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ textAlign: 'justify', fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal, color: COLORS.lighter }}>{detail.deskripsi}</Text>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Dibagikan Kepada</Text>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <TouchableOpacity onPress={bottomSheetAttach}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', gap: 20, }}>
                        <Image source={detail.image} />
                        {/* <Divider bold style={{ transform: [{ rotate: '90deg' }], width: 5 }} /> */}
                        {/* divider custom */}
                        <View style={{ height: '100%', width: 2, backgroundColor: COLORS.lighter }} />
                        <View style={{ flexDirection: 'row', position: 'relative' }}>
                            {detail.subimage?.map((data) => {
                                return (
                                    <View key={data.id}>
                                        <Image source={data.image} style={{ marginLeft: -7 }} />
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <Portal>
                        <BottomSheetModalProvider>
                            <BottomSheetModal
                                ref={bottomSheetModalRef}
                                snapPoints={animatedSnapPoints}
                                handleHeight={animatedHandleHeight}
                                contentHeight={animatedContentHeight}
                                index={0}
                                style={{ borderRadius: 50 }}
                                keyboardBehavior={
                                    Platform?.OS == "android" ? "fillParent" : "interactive"
                                }
                                keyboardBlurBehavior="restore"
                                android_keyboardInputMode="adjust"
                                backdropComponent={({ style }) => (
                                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                                )}
                            >
                                <BottomSheetView onLayout={handleContentLayout} >
                                    <View style={{ marginHorizontal: 20 }}>
                                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                            <Image source={detail.image} />
                                            <View style={{}}>
                                                <Text style={{ color: COLORS.lighter }}>Penulis</Text>
                                                <Text style={{ color: COLORS.lighter }}>{detail.nama}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 30 }}>
                                            <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Dibagikan Kepada</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={detail.avatarDibagikan} />
                                                <View style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30 }}>
                                                    {detail.dibagikan?.map((data) => (
                                                        <View key={data.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                            <Image source={data.avatarDibagikan} />
                                                            <View>
                                                                <Text style={{ color: COLORS.lighter }}>{data.jabatan}</Text>
                                                                <Text style={{ color: COLORS.lighter }}>{data.nama}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </BottomSheetView>
                            </BottomSheetModal>
                        </BottomSheetModalProvider>
                    </Portal>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
