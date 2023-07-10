import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { useState } from 'react';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';


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
        ],
        lampiran: [
            {
                file: 'Business Agility with Scrum.pdf',
                size: '8 mb'
            },
            {
                file: 'Business Agility with Scrum.pdf',
                size: '8 mb'
            },
            {
                file: 'Business Agility with Scrum.pdf',
                size: '8 mb'
            },
        ],
        jmlKomen: '3',
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

const DaftarKomentar = ({ items }) => {
    const [toggleComment, setToggleComment] = useState({
        toggle: false,
        id: data[0].Komentar[0].id
    })
    const clickBalas = (id, temp) => {
        setToggleComment({
            toggle: temp,
            id: id
        })
        console.log(id)
    }
    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', }}>
            {items.Komentar.map((listData) => (
                <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '90%', marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>

                        <View>
                            <Image source={listData.avatarKomen} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{
                                fontSize: FONTSIZE.H2,
                                fontFamily: 'Inter',
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
                                    fontFamily: 'Inter',
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
                                    fontFamily: 'Inter',
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
                                fontFamily: 'Inter',
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
                                                        fontFamily: 'Inter',
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
                                                                fontFamily: 'Inter',
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
                                                                    fontFamily: 'Inter',
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
                                                                    fontFamily: 'Inter',
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
                                                                fontFamily: 'Inter',
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
                                                                                fontFamily: 'Inter',
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
    )
}

export const Komentar = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
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
                    <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{data[0].judul}</Text>
                </View>
            </View>
            <View style={{ marginVertical: 20, marginLeft: 20 }}>
                <Text>Komentar ({data[0].jmlKomen})</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <DaftarKomentar
                        items={item} />
                }
                keyExtractor={items => items.id}
            />
        </SafeAreaView>
    )
}
