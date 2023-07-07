import React, { useRef } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
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

const item = {
    judul: 'Business Agility with Scrum',
    subjudul: 'Business Agility Scrum 2023 with All Employee',
    tanggal: '16 Mei 2023',
    nama: 'Rizky Novriansyah',
    unit: 'Unit Kelompok Fungsional',
    tempat: 'Golden Tulip Kota Malang',
    deskripsi: 'Agile adalah metode atau kerangka kerja yang memiliki prinsip “bertahap dan berulang”. Dengan begitu, proses pengembangannya dapat berjalan dengan cepat, selesai tepat waktu, dan tentunya dengan hasil yang berkualitas tinggi.',
    image: require('../../assets/superApp/AvatarDetail.png'),
    subimage: [
        { image: require('../../assets/superApp/AvatarDetail.png') },
        { image: require('../../assets/superApp/AvatarDetail.png') },
        { image: require('../../assets/superApp/AvatarDetail.png') },
    ],
    dibagikan: [
        {
            avatarDibagikan: require('../../assets/superApp/AvatarDetail.png'),
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            nama: 'Rizky Novriansyahh',
        },
        {
            avatarDibagikan: require('../../assets/superApp/AvatarDetail.png'),
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            nama: 'Rizky Novriansyahh',
        },
        {
            avatarDibagikan: require('../../assets/superApp/AvatarDetail.png'),
            jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            nama: 'Rizky Novriansyahh'
        },
    ]
}

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

    return (
        <BottomSheetModalProvider>

            <View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#800000', height: 80, paddingBottom: 20 }}>
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
                        <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{item.judul}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.subjudul}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    marginHorizontal: 20
                }}>
                    <Image source={item.image} />
                    <Text style={{ fontSize: 13, fontWeight: 400, color: '#1868AB' }}>{item.nama}</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400 }}>|  {item.unit}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 40,
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginTop: 10
                }}>
                    <Text style={{ fontSize: 13, fontWeight: 400, color: '#9F9EA3' }}>Tanggal Acara</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400 }}>:  {item.tanggal}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 42,
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginTop: 10
                }}>
                    <Text style={{ fontSize: 13, fontWeight: 400, color: '#9F9EA3' }}>Tempat Acara</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400 }}>:  {item.tempat}</Text>
                </View>
                <View style={{ marginVertical: 30, width: '90%', marginHorizontal: 20 }}>
                    <Divider bold />
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ textAlign: 'justify', fontSize: 13, fontWeight: 400, color: '#6B7280' }}>{item.deskripsi}</Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 30, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, fontWeight: 600, color: '#6B7280' }}>Dibagikan Kepada</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                        <TouchableOpacity onPress={bottomSheetAttach}>
                            <Ionicons name='chevron-forward-outline' size={24} color={'#7E7E7E'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', gap: 20, }}>
                    <Image source={item.image} />
                    {/* <Divider bold style={{ transform: [{ rotate: '90deg' }], width: 5 }} /> */}
                    <View style={{ height: '100%', width: 2, backgroundColor: '#DBDADE' }} />
                    <View style={{ flexDirection: 'row', position: 'relative' }}>
                        {item.subimage.map((data) => {
                            return (
                                <Image source={data.image} style={{ marginLeft: -7 }} />
                            )
                        })}
                    </View>
                </View>

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
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Image source={item.image} />
                                <View style={{}}>
                                    <Text style={{ color: '#6B7280' }}>Penulis</Text>
                                    <Text style={{ color: '#999999' }}>{item.nama}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 15, fontWeight: 600 }}>Dibagikan Kepada</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={item.avatarDibagikan} />
                                    <View style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30 }}>
                                        {item.dibagikan.map((data) => (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                <Image source={data.avatarDibagikan} />
                                                <View>
                                                    <Text style={{ color: '#6B7280' }}>{data.jabatan}</Text>
                                                    <Text style={{ color: '#999999' }}>{data.nama}</Text>
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
            </View>
        </BottomSheetModalProvider>
    )
}
