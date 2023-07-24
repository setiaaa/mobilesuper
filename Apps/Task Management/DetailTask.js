import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import React, { useMemo, useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import { CardSuka } from '../../components/CardSuka'

const item = [
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        deskripsi: 'Agile adalah metode atau kerangka kerja yang memiliki prinsip “bertahap dan berulang”. Dengan begitu, proses pengembangannya dapat berjalan dengan cepat, selesai tepat waktu, dan tentunya dengan hasil yang berkualitas tinggi.',
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ],
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger,
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
]


export const DetailTask = () => {
    const navigation = useNavigation()
    const bottomSheetModalMemberRef = useRef(null);
    const bottomSheetModalKomentarRef = useRef(null);
    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetMember = () => {
        bottomSheetModalMemberRef.current?.present()
    }

    const bottomSheetKomentar = () => {
        bottomSheetModalKomentarRef.current?.present()
    }

    const [komen, setKomen] = useState('')
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
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Detail Task</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: COLORS.white, marginHorizontal: 20, marginVertical: 20, borderRadius: 8 }}>
                        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                            <Text style={{ fontSize: FONTSIZE.Judul, color: COLORS.lighter }}>{item[0].kegiatan}</Text>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>{item[0].deskripsi}</Text>
                            </View>

                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>Due Date</Text>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter, textAlign: 'center', flex: 1 }}>: {item[0].tanggal}</Text>
                            </View>

                            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>Priority</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginRight: 15, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>: </Text>
                                    <View style={{ backgroundColor: COLORS.infoDangerLight, borderRadius: 30 }}>
                                        <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.primary, marginHorizontal: 8, marginVertical: 4 }}>{item[0].prioritas}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>Member</Text>
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center', marginLeft: 45 }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>: </Text>
                                    <View style={{ flexDirection: 'row', position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        {item[0].subAvatar.map((data) => {
                                            return (
                                                <Image source={data.avatar} style={{
                                                    marginLeft: -8,
                                                    borderWidth: 2,
                                                    borderRadius: 50,
                                                    borderColor: COLORS.white,
                                                }} />
                                            )
                                        })}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={bottomSheetMember}>
                                    <View>
                                        <Ionicons name='chevron-forward-outline' size={24} color={COLORS.grey} />
                                    </View>
                                </TouchableOpacity>
                                <BottomSheetModal
                                    ref={bottomSheetModalMemberRef}
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
                                    <BottomSheetView onLayout={handleContentLayout}>
                                        <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Member</Text>
                                        </View>
                                        <View style={{ marginBottom: 50 }}>
                                            <FlatList
                                                data={item[0].member}
                                                renderItem={({ item }) => <CardSuka
                                                    avatar={item.avatar}
                                                    nama={item.nama}
                                                    jabatan={item.jabatan}
                                                />
                                                }
                                            />
                                        </View>
                                    </BottomSheetView>
                                </BottomSheetModal>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={bottomSheetKomentar}>
                        <View style={{ marginLeft: 20, backgroundColor: COLORS.primary, width: 146, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                            <Text style={{ color: COLORS.white }}>Komentar ({item[0].jmlKomentar})</Text>
                        </View>
                    </TouchableOpacity>
                    <BottomSheetModal
                        ref={bottomSheetModalKomentarRef}
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
                                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                                    <Text style={{ color: COLORS.lighter }}>Komentar</Text>
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    flex: 1,
                                    alignItems: 'center',
                                    //shadow
                                    shadowOffset: { width: -2, height: 4 },
                                    shadowColor: '#171717',
                                    shadowOpacity: 0.2,
                                }}>
                                    {item[0].Komentar.map((listData) => (
                                        <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '90%', marginVertical: 5 }}>
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
                                                                    {listData.balas.map((listKomen, index) =>
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
                                {/* <View style={{ height: 380, justifyContent: 'flex-end' }}>
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
                                            numberOfLines={4}
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
                                </View> */}
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                </ScrollView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
