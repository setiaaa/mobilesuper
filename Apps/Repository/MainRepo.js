import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BottomTabsRepo } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setDibagikanLists, setDokumentlists } from '../../store/Repository';

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

const dibagikan = [
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

export default function MainRepo() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDokumentlists(data))
        dispatch(setDibagikanLists(dibagikan))
    }, []);

    return (
        <BottomSheetModalProvider>
            <BottomTabsRepo />
        </BottomSheetModalProvider>
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