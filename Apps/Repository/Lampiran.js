import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
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
        ]
    }
]


const DataLampiran = ({ items }) => {
    console.log(items)
    return (
        <View style={{ marginTop: 20, justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            {items.lampiran.map((listData) => (
                <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '90%', marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 20 }}>
                        <View>
                            <Ionicons name='document-outline' size={24} color={COLORS.lighter} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ width: '100%', fontSize: FONTSIZE.H4, fontFamily: 'Inter', fontWeight: FONTWEIGHT.normal, lineHeight: 14, wordWrap: 'break-word' }}>{listData.file}</Text>
                            <Text style={{ width: '100%', color: COLORS.lighter, fontSize: 10, fontFamily: 'Inter', fontWeight: FONTWEIGHT.normal, lineHeight: 18, wordWrap: 'break-word' }}>{listData.size}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <Ionicons name='download-outline' size={24} color={COLORS.lighter} />
                        </View>
                    </View>
                </View>
            )
            )}
        </View>
    )
}

export const Lampiran = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>{data[0].judul}</Text>
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <DataLampiran
                        items={item} />
                }
                keyExtractor={items => items.id}
            />
        </SafeAreaView>
    )
}
