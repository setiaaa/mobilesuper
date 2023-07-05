import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react'

const data = [
    {
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
    },
    {
        judul: 'Gathering Investor',
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
];


const DataList = ({ item, bottomSheetAttach }) => {
    return (
        <BottomSheetModalProvider>
            <View style={{ flexDirection: 'row', marginVertical: 20, }}>
                <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                    <View style={styles.cardNo}>
                        <Ionicons name='document-outline' size={30} color={'#800000'} />
                    </View>
                </TouchableOpacity>
                <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                            <Text style={{ fontSize: 13, fontWeight: 400, marginBottom: 10, color: '#111827' }}>{item.judul}</Text>
                            <Text style={{ fontSize: 11, fontWeight: 400, marginBottom: 10, color: '#6B7280' }}>{item.tanggal}</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                            <Ionicons name='ellipsis-vertical-outline' size={24} color={'#999999'} />
                        </View>
                    </View>
                </View>
            </View>
        </BottomSheetModalProvider>
    )
}

const DataGrid = ({ item, bottomSheetAttach }) => {

    return (
        <View style={{ marginVertical: 20, marginHorizontal: 25 }}>
            <View style={styles.cardNo}>
                <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                    <Ionicons name='document-outline' size={30} color={'#800000'} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: 400,
                                marginBottom: 10,
                                color: '#111827',
                                width: 100,
                                textAlign: 'center'
                            }}
                            numberOfLines={2}
                        >
                            {item.judul}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', }}>
                        <Ionicons name='ellipsis-vertical-outline' size={24} color={'#999999'} />
                    </View>
                </View>
            </View>
        </View>
    )
}


export const Dokumen = () => {
    const [variant, setVariant] = useState('list')
    const [dataM, setDataM] = useState([])

    const handleVariant = (cekVariant) => {
        setVariant(cekVariant)
    }
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = (item) => {
        bottomSheetModalRef.current?.present()
        setDataM(item)
    }

    return (
        <BottomSheetModalProvider>
            <ScrollView>
                <View style={{ marginBottom: 20 }}>
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
                                <Ionicons name='close-outline' size={24} color={'#800000'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>Repositori</Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', marginLeft: 20, marginVertical: 20 }}>
                        <Search placeholder={'Cari'} />
                    </View>
                    <View style={styles.card}>
                        <View style={{ marginRight: 40, marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => handleVariant('list')}>
                                <View style={styles.circleList}>
                                    <Ionicons name='list-outline' size={24} color={variant === 'list' ? '#800000' : 'grey'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleVariant('grid')}>
                                <View style={styles.circleList}>
                                    <Ionicons name='apps-outline' size={24} color={variant === 'grid' ? '#800000' : 'grey'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Divider bold />
                        {variant === 'list' ? (
                            <FlatList
                                key={'_'}
                                data={data}
                                renderItem={({ item }) => <DataList
                                    bottomSheetAttach={bottomSheetAttach}
                                    // judul={item.judul}
                                    // tanggal={item.tanggal}
                                    item={item}
                                />
                                }
                                keyExtractor={item => "_" + item.id}
                                style={{ height: 440 }}
                            />

                        ) : (
                            <FlatList
                                key={'#'}
                                data={data}
                                renderItem={({ item }) => <DataGrid
                                    bottomSheetAttach={bottomSheetAttach}
                                    // judul={item.judul}
                                    // tanggal={item.tanggal}
                                    item={item}
                                />
                                }
                                numColumns={2}
                                keyExtractor={item => "#" + item.id}
                                style={{ height: 440 }}
                            />
                        )}
                        <View style={{ marginBottom: 40 }}>
                            <Divider bold />
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
                                <View style={{ marginVertical: 20 }}>
                                    <View style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <Ionicons name='document-outline' size={32} color={'#800000'} />
                                        <Text style={{ fontSize: 13, fontWeight: 400 }}>{dataM.judul}</Text>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Divider bold />
                                    </View>
                                    <TouchableOpacity>
                                        <View style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}>
                                            <Ionicons name='download-outline' size={32} color={'#6B7280'} />
                                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Download</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('MainDetailRepo')}>
                                        <View style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}>
                                            <Ionicons name='information-circle-outline' size={32} color={'#6B7280'} />
                                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Details & activity</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>
                </View>
            </ScrollView>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        flexDirection: "column",
        width: '90%',
        marginLeft: 20,
        borderRadius: 16,
    },
    profile: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        left: 16,
    },
    cardApps: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    cardNo: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginBottom: 10
    },
    circleList: {
        width: 35,
        height: 35,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})