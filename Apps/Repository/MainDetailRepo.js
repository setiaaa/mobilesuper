import React from 'react'
import { Text } from 'react-native'
import { BottomTabsDetailRepo } from '../Korespondensi/AppNavigator'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setDokumenDetail } from '../../store/Repository';

const data =
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
        {
            file: 'Business Agility with Scrum.pdf',
            size: '8 mb'
        },
    ],
    jmlKomen: '3',
    komentar: [
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


export const MainDetailRepo = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDokumenDetail(data))
    }, []);
    return (
        <BottomTabsDetailRepo />
    )
}
