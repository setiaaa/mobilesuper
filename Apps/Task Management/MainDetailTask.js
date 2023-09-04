import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BottomTabsDetailTask } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useDispatch } from 'react-redux'
import { setTaskDetail } from '../../store/Task'
import { AVATAR, COLORS } from '../../config/SuperAppps'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'


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
        ],
        lampiranDokumen: [
            {
                image: require('../../assets/superApp/pdf.png'),
                file: 'Business Agility with Scrum',
                size: '8 MB'
            },
            {
                image: require('../../assets/superApp/word.png'),
                file: 'Business Agility with Scrum',
                size: '8 MB'
            },
            {
                image: require('../../assets/superApp/ppt.png'),
                file: 'Business Agility with Scrum',
                size: '8 MB'
            },
            {
                image: require('../../assets/superApp/excel.png'),
                file: 'Business Agility with Scrum',
                size: '8 MB'
            },
        ],
        lampiranFile: [
            {
                image: require('../../assets/superApp/FileIkan.png'),
                file: 'tuna.png',
            },
            {
                image: require('../../assets/superApp/FileIkan.png'),
                file: 'tuna.png',
            },
            {
                image: require('../../assets/superApp/FileIkan.png'),
                file: 'tuna.png',
            },
            {
                image: require('../../assets/superApp/FileIkan.png'),
                file: 'tuna.png',
            },
            {
                image: require('../../assets/superApp/FileIkan.png'),
                file: 'tuna.png',
            },
            {
                image: require('../../assets/superApp/FileIkan.png'),
                file: 'tuna.png',
            },
        ]
    }
]

export default function MainDetailTask() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTaskDetail(item))
        console.log('dispach detail')
    }, [dispatch]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Host>
                <BottomSheetModalProvider>
                    <BottomTabsDetailTask />
                </BottomSheetModalProvider>
            </Host>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 70,
        left: 150
    }
})