import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BottomTabsDetailTask, BottomTabsPengetahuan } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useDispatch } from 'react-redux'
import { setTaskDetail } from '../../store/Task'
import { AVATAR, COLORS } from '../../config/SuperAppps'
import { setPenilaian } from '../../store/Pengetahuan'


const datapenilaian = [
    {
        belumDitinjau: '15',
        telahDitinjau: '15',
        listPenilaian: [
            {
                image: require('../../assets/superApp/linimasa2.png'),
                judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                tanggal: '22 Juli 2023',
                point: 'Waiting',
                detail: [
                    {
                        periode: 'JULI 2023 - SEPTEMBER 2023',
                        terbuat: '16 Agustus 2023',
                        cover: require('../../assets/superApp/linimasa2.png'),
                        judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                        pj: 'ANTAM NOVAMBAR',
                        jenis: 'Video',
                        tempat: 'Surakarta',
                        anggota: 'KKP',
                        kapan: '15 Agustus 2023',
                        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        deskripsi: 'Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia. Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        lampiran: '-'
                    }
                ]
            },
            {
                image: require('../../assets/superApp/linimasa2.png'),
                judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                tanggal: '22 Juli 2023',
                point: 'Waiting',
                detail: [
                    {
                        periode: 'JULI 2023 - SEPTEMBER 2023',
                        terbuat: '16 Agustus 2023',
                        cover: require('../../assets/superApp/linimasa2.png'),
                        judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                        pj: 'ANTAM NOVAMBAR',
                        jenis: 'Video',
                        tempat: 'Surakarta',
                        anggota: 'KKP',
                        kapan: '15 Agustus 2023',
                        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        deskripsi: 'Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia. Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        lampiran: '-'
                    }
                ]
            },
            {
                image: require('../../assets/superApp/linimasa2.png'),
                judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                tanggal: '22 Juli 2023',
                point: '0.5',
                detail: [
                    {
                        periode: 'JULI 2023 - SEPTEMBER 2023',
                        terbuat: '16 Agustus 2023',
                        cover: require('../../assets/superApp/linimasa2.png'),
                        judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                        pj: 'ANTAM NOVAMBAR',
                        jenis: 'Video',
                        tempat: 'Surakarta',
                        anggota: 'KKP',
                        kapan: '15 Agustus 2023',
                        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        deskripsi: 'Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia. Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        lampiran: '-'
                    }
                ]
            },
            {
                image: require('../../assets/superApp/linimasa2.png'),
                judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                tanggal: '22 Juli 2023',
                point: '0.5',
                detail: [
                    {
                        periode: 'JULI 2023 - SEPTEMBER 2023',
                        terbuat: '16 Agustus 2023',
                        cover: require('../../assets/superApp/linimasa2.png'),
                        judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                        pj: 'ANTAM NOVAMBAR',
                        jenis: 'Video',
                        tempat: 'Surakarta',
                        anggota: 'KKP',
                        kapan: '15 Agustus 2023',
                        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        deskripsi: 'Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia. Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        lampiran: '-'
                    }
                ]
            },
            {
                image: require('../../assets/superApp/linimasa2.png'),
                judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                tanggal: '22 Juli 2023',
                point: '0.5',
                detail: [
                    {
                        periode: 'JULI 2023 - SEPTEMBER 2023',
                        terbuat: '16 Agustus 2023',
                        cover: require('../../assets/superApp/linimasa2.png'),
                        judul: 'KKP Fasilitasi Pendampingan Usaha 1.628 Usaha Mikro-Kecil',
                        pj: 'ANTAM NOVAMBAR',
                        jenis: 'Video',
                        tempat: 'Surakarta',
                        anggota: 'KKP',
                        kapan: '15 Agustus 2023',
                        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        deskripsi: 'Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia. Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
                        lampiran: '-'
                    }
                ]
            }
        ]
    }
]

export default function MainPengetahuan() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPenilaian(datapenilaian))
    }, [dispatch]);

    return (
        <BottomSheetModalProvider>
            <BottomTabsPengetahuan />
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